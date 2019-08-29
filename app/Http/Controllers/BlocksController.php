<?php

namespace App\Http\Controllers;

use App\Bot;
use App\ClientInputType;
use App\Message;
use App\Output;
use App\OutputButton;
use App\OutputText;
use Illuminate\Http\Request;
use App\Block;
use Illuminate\Support\Facades\Validator;
use Faker\Generator as Faker;

class BlocksController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    protected $rules = [
        'name' => 'min:2|max:32',
    ];

    /**
     * Display a listing of the resource.
     *
     * @param $botId
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function index($botId)
    {

        $bot = Bot::findOrFail($botId);

        $this->authorize('view', $bot);

        return response()->json($bot->blocks()->with('outputs')->get());

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|string
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function store(Request $request, Faker $faker)
    {

        $botId = $request->get('bot_id');

        $newBlockData = request()->all();
        $newBlockData['name'] = $faker->name;

        $bot = Bot::findOrFail($botId);
        $this->authorize('update', $bot);

        $validator = Validator::make($newBlockData, $this->rules);
        if ($validator->fails()) {
            return response()->json(array('errors' => $validator->getMessageBag()->toArray()));
        }

        $blockDataFull = array_merge($newBlockData, [
            'active' => 1,
            'component' => 'BlockBase',
        ]);

        $block = new Block($blockDataFull);
        $block->save();

        $output = new Output();
        $block->outputs()->save($output);

        $block->client_input_type()->associate(ClientInputType::find(2));
        $block->save();

        $message = Message::create([
            'delay' => 1.1,
            'text' => '+1 Вы просто напишите слова, а я буду говорить :D',
            'sort_order_id' => 1,
        ]);
        $message2 = Message::create([
            'delay' => 1.2,
            'text' => '+2 Вы просто напишите слова, а я буду говорить :D',
            'sort_order_id' => 2,
        ]);
        $block->messages()->save($message);
        $block->messages()->save($message2);

        $block->load('outputs');

        return response()->json($block);

    }

    /**
     * @param $botId
     * @param $blockId
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update($botId, $blockId, Request $request)
    {

//        return $blockId; // is ok
//        return $botId; // is ok
//        return $request->all(); // is ok


        $block = Block::findOrFail($blockId);
        $newBlockData = request()->all();

        $validator = Validator::make($newBlockData, $this->rules);
        if ($validator->fails()) {
            return response()->json(array('errors' => $validator->getMessageBag()->toArray()));
        }

        $block = Block::findOrFail($blockId);

        $this->authorize('update', $block, $botId);

        $block->update($newBlockData);
        return response()->json($newBlockData);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function destroy($id) : string
    {

        $block = Block::find($id);

        $this->authorize('delete', $block);

        $block->delete();

        return response()->json($block);

    }

    public function getBlockData($id) : string
    {

        $block = Block::with('client_input_type:id,name,component')->with('messages')->findOrFail($id);

        return $block->toJson();

    }

    public function saveExtendedBlockData(Request $request) : void
    {

        $blockId = $blockData = $request->get('id');
        $block = Block::findOrFail($blockId);
        $blockData = $request->only(['name', 'client_input_type_id']);

        if( $block->client_input_type_id !== $blockData['client_input_type_id'] ) {
            // remove exists outputs
            foreach ($block->outputs()->get() as $output) {
                $output->delete();
            }
        }

        $this->authorize('update', $block);
        $block->update($blockData);

        // save related messages
        $messagesData = $request->get('messages');
        $messagesDataForUpdate = [];
        foreach ($messagesData as $value) {
            $messagesDataForUpdate[] = array_diff_key($value, array_flip(['created_at', 'updated_at']));
        }
        foreach ($messagesDataForUpdate as $value) {
            $messageId = $value['id'];
            unset($value['id']);

            Message::where('id', $messageId)->update($value);
        }

        // save outputs
        // only for buttons
        if( $request->get('client_input_type_id') === 1) {

            $rawButtons = $request->get('buttons');
            if( count($rawButtons) > 0 ) {

                $outputs = [];
                foreach ($rawButtons as $key => $rawButton) {
                    // create outputs with outputButtons for current block
                    $output = Output::create([
                        'sort_order_id' => $key,
                    ]);

                    // todo: Validate (custom) text of button
                    $outputButton = OutputButton::create([
                        'text' => $rawButton['text'],
                    ]);

                    $output->outputable()->associate($outputButton);
                    $outputs[] = $output;
                }

                $block->outputs()->saveMany($outputs);

            }

        }
        // only for texts
        elseif( $request->get('client_input_type_id') === 2) {
            // create output with outputText for current block
            $output = Output::create([
                'sort_order_id' => 0,
            ]);

            // todo: Validate (custom) text of button
            $outputText = OutputText::create();
            $output->outputable()->associate($outputText);
            $block->outputs()->save($output);
        }

    }

}

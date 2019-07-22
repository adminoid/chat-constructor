<?php

namespace App\Http\Controllers;

use App\Bot;
use App\Output;
use Illuminate\Http\Request;
use App\Block;
use Illuminate\Support\Facades\Validator;

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
    public function store(Request $request)
    {

        $botId = $request->get('bot_id');

        $newBlockData = request()->all();

        $validator = Validator::make($newBlockData, $this->rules);
        if ($validator->fails()) {
            return response()->json(array('errors' => $validator->getMessageBag()->toArray()));
        }

        $bot = Bot::findOrFail($botId);
        $this->authorize('update', $bot);

        $blockDataFull = array_merge($request->all(), [
            'active' => 1,
            'component' => 'BlockBase',
        ]);

        $block = new Block($blockDataFull);
        $block->save();

        $output = new Output();
        $block->outputs()->save($output);

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
    public function destroy($id)
    {

        $block = Block::find($id);

        $this->authorize('delete', $block);

        $block->delete();

        return response()->json($block);

    }

    public function getBlockData($id)
    {

        $block = Block::with('client_input_type:id,name,component')->findOrFail($id);

        return $block->toJson();

    }

}

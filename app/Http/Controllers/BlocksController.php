<?php

namespace App\Http\Controllers;

use App\Bot;
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
     * @param $botId
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function store(Request $request, $botId)
    {

        $validator = Validator::make(request()->all(), $this->rules);
        if ($validator->fails()) {
            return response()->json(array('errors' => $validator->getMessageBag()->toArray()));
        }

        $bot = Bot::findOrFail($botId);

        $this->authorize('update', $bot);

        $blockData = $request->only('name');
        $block = new Block($blockData);
        $bot->blocks()->save($block);

        return response()->json($blockData);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param $blockId
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
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
}

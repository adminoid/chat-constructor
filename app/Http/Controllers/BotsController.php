<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Bot;
use Illuminate\Support\Facades\Validator;

class BotsController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    protected $rules = [
        'name' => 'required|min:2|max:32',
    ];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(auth()->user()->bots()->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return bool|\Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {

        $validator = Validator::make(request()->all(), $this->rules);
        if ($validator->fails()) {
            return response()->json(array('errors' => $validator->getMessageBag()->toArray()));
        }

        $botData = $request->all();
        if( $user = auth()->user() ) {
            $bot = new Bot($botData);
            $user->bots()->save($bot);

            return response()->json($bot);
        }

        return false;

    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update(Request $request, $id)
    {

        $validator = Validator::make(request()->all(), $this->rules);
        if ($validator->fails()) {
            return response()->json(array('errors' => $validator->getMessageBag()->toArray()));
        }

        $botData = $request->only('id', 'name', 'updated_at', 'user_id' );

        $bot = Bot::findOrFail($id);

        $this->authorize('update', $bot);

        $bot->update($botData);

        return response()->json($botData);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $bot = Bot::findOrFail($id);
        $user = \auth()->user();
        if ( $user && $user->id !== $bot->user_id ) {
            abort(401, 'You are not owner of this bot');
        }

        $bot->delete();

        return response()->json($id);

    }

}

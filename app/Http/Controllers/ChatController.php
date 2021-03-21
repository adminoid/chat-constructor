<?php

namespace App\Http\Controllers;

use App\Block;
use App\Bot;
use Illuminate\Http\Request;

class ChatController extends Controller
{

    public function initChat($botId)
    {

        $flagshipBlockId = Bot::findOrFail($botId)->flagship;

//        $flagshipMessages = Block::findOrFail($flagshipBlockId)->messages()->get()->toJson();
        $flagshipMessages = Block::find($flagshipBlockId)->messages()->get()->toJson();

//        dd($flagshipMessages);

        $initChatData = [
            'bot_id' => $botId,
            'messages' => $flagshipMessages,
        ];

//        broadcast(new \App\Events\InitChatEvent($initChatData, auth()->user()));

//        $when = now()->addSecond(1);

        broadcast(new \App\Events\InitChatEvent($initChatData, auth()->user())->delay($now));

        return view('chat.index');

    }

}

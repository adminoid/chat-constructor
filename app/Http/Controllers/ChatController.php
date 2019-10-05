<?php

namespace App\Http\Controllers;

use App\Bot;
use Illuminate\Http\Request;

class ChatController extends Controller
{

    public function initChat($botId)
    {

        $flagshipBlockId = Bot::findOrFail($botId)->flagship;

        $message = [
            'bot_id' => $botId,
            'flagship' => $flagshipBlockId,
        ];

//        event(new \App\Events\TestChatEvent($message));
       broadcast(new \App\Events\TestChatEvent($message));


        return view('chat.index');
    }

}

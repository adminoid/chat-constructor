<?php

namespace App\Http\Controllers;

use App\Message;
use Illuminate\Http\Request;
use App\Block;
use Carbon\Carbon;

class MessagesController extends Controller
{
    public function createMessage($blockId) {

        $maxSortOrderId = Message::where('block_id', $blockId)->max('sort_order_id');
        $nextSortOrderId = $maxSortOrderId + 1;

        Message::insert([
            'block_id' => $blockId,
            'sort_order_id' => $nextSortOrderId,
            'delay' => 1.0,
            'text' => 'Вы просто напишите слова, а я буду говорить :D',
            'created_at' =>  Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        return Message::where('block_id', $blockId)->get()->toJson();

    }
}

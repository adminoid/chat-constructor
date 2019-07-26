<?php

namespace App\Http\Controllers;

use App\Block;
use Illuminate\Http\Request;
use App\ClientInputType;

class ClientInputTypesController extends Controller
{

    public function getClientInputTypes() : string
    {
        return ClientInputType::all('id', 'name', 'component')->toJson();
    }

    public function saveClientInputType(Request $request) : void
    {

        $blockId = $request->get('block_id');
        $inputTypeId = $request->get('id');

        $block = Block::findOrFail($blockId);
        $block->client_input_type_id = $inputTypeId;
        $block->save();

    }

}

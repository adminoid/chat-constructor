<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Block;

class OutputsController extends Controller
{

    public function getOutputs($blockId) : array
    {

        $block = Block::findOrFail($blockId);
        $compiledOutputs = [];
        if( $block->client_input_type_id === 1 ) {
            foreach ($block->outputs()->with('outputable:text')->get() as $output) {
                $outputable = $output->outputable()->first();
                $compiledOutputs[] = array_merge($outputable->toArray(), [
                    'id' => $output->id,
                    'sort_order_id' => $output->sort_order_id,
                ]);
            }
        }

//        $sortedCompiledOutputs = collect($compiledOutputs)->sortBy('sort_order_id')->toJson();

        return $compiledOutputs;

    }

}

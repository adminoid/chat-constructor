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
            foreach ($block->outputs()->with('outputable:id,text')->get() as $output) {
                $compiledOutputs[] = array_merge($output->outputable->toArray(), ['sort_order_id' => $output->sort_order_id]);
            }
        }

        return $compiledOutputs;

    }

}

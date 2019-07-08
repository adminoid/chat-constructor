<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Output;

class ConnectorController extends Controller
{

    /**
     * @param Request $request
     * @return mixed
     */
    public function saveTarget(Request $request)
    {

        $outputId = $request->get('connector-id');
        $targetId = $request->get('target-id');

        $output = Output::findOrFail($outputId);

        $output->target_block_id = $targetId;
        $output->save();

        return $output->toJson();

    }

}

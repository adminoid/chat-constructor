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

}

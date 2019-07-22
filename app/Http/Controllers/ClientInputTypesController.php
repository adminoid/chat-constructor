<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ClientInputType;

class ClientInputTypesController extends Controller
{

    public function getClientInputTypes() : string
    {
        return ClientInputType::all('name', 'component')->toJson();
    }

}

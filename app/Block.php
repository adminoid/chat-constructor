<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Block extends Model
{

    public function bot()
    {
        return $this->belongsTo('App\Bot');
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{

    public function block()
    {
        return $this->belongsTo(Block::class);
    }

}

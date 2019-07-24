<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{

    protected $fillable = ['*'];

    public function block()
    {
        return $this->belongsTo(Block::class);
    }

}

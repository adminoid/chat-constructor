<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{

    protected $fillable = ['name', 'delay', 'text', 'sort_order_id'];

    public function block()
    {
        return $this->belongsTo(Block::class);
    }

}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bot extends Model
{

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function blocks()
    {
        return $this->hasMany(Block::class);
    }

}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bot extends Model
{

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function blocks() : HasMany
    {
        return $this->hasMany(Block::class);
    }

    public function clients() : HasMany
    {
        return $this->hasMany(Client::class);
    }

}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{

    public function bot() : BelongsTo
    {
        return $this->belongsTo(Bot::class);
    }

    public function conversations() : HasMany
    {
        return $this->hasMany(Conversation::class);
    }

}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Client extends Model
{

    public function bot() : BelongsTo
    {
        return $this->belongsTo(Bot::class);
    }
}

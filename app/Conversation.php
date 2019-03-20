<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Conversation extends Model
{

    public function client() : BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function client_input_type() : BelongsTo
    {
        return $this->belongsTo(ClientInputType::class);
    }

}

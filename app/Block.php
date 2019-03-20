<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\Relations\HasMany;
use \Illuminate\Database\Eloquent\Relations\BelongsTo;

class Block extends Model
{

    public function bot() : BelongsTo
    {
        return $this->belongsTo(Bot::class);
    }

    public function messages() : HasMany
    {
        return $this->hasMany(Message::class);
    }

    public function client_input_type() : BelongsTo
    {
        return $this->belongsTo(ClientInputType::class);
    }

    public function outputs() : HasMany
    {
        return $this->hasMany(Output::class);
    }

    public function outputSources() : HasMany
    {
        return $this->hasMany(Output::class, 'target_block_id', 'id');
    }

}

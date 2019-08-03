<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ClientInputType extends Model
{

    public function blocks() : HasMany
    {
        return $this->hasMany(Block::class);
    }

}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bot extends Model
{

    protected $fillable = ['name'];

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

    public function checkFlagman() : bool
    {
        return $this->blocks()->get()->some('flagman');
    }

    public function makeFlagman() : void
    {
        if (!$this->checkFlagman()) {
            $firstBlock = $this->blocks()->firstOrFail();
            $firstBlock->flagman = true;
            $firstBlock->save();
        }

    }

}

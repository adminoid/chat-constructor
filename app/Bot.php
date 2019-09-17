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

    public function checkFlagship() : bool
    {
        $blocks = $this->blocks()->get();
        $test = $blocks->some('flagship', 1);

        return $blocks->some('flagship', 1);
    }

    public function makeFlagship() : void
    {

        $hasFlagship = $this->checkFlagship();

        if (!$this->checkFlagship()) {
            $firstBlock = $this->blocks()->firstOrFail();
            $firstBlock->flagship = true;
            $firstBlock->save();
        }

    }

}

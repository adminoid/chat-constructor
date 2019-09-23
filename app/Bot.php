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

//    public function checkFlagship() : bool
//    {
//        $blocks = $this->blocks()->get();
//        return $blocks->some('flagship', 1);
//    }

    public function makeFlagship() : void
    {
        if (!$this->flagship) {
            $firstBlock = $this->blocks()->firstOrFail();
            $this->flagship = $firstBlock->id;
            $this->save();
        }
    }

    public function setFlagship(int $blockId) : void
    {
        $this->flagship = $blockId;
        $this->save();
    }

}

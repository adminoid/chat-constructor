<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{

    protected $fillable = ['ip'];

    public function bot() : BelongsTo
    {
        return $this->belongsTo(Bot::class);
    }

    public function conversations() : HasMany
    {
        return $this->hasMany(Conversation::class);
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\Relations\HasMany;
use \Illuminate\Database\Eloquent\Relations\BelongsTo;

class Block extends Model
{

    protected $fillable = ['id', 'name', 'client_input_type_id', 'bot_id', 'created_at', 'updated_at', 'active', 'component', 'intact', 'x', 'y'];

//    protected $hidden = [];

//    protected $appends = array('itemData' => []);
//    public function getAvailabilityAttribute()
//    {return $this->calculateAvailability();}

//    protected $guarded = ['created_at'];

//    protected $fillable = ['*'];

    public function bot() : BelongsTo
    {
        return $this->belongsTo(Bot::class);
    }

    public function messages() : HasMany
    {
        return $this->hasMany(Message::class)
            ->orderBy('messages.sort_order_id');
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
        return $this->hasMany(Output::class, 'block_id_target', 'id');
    }

}

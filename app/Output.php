<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Output extends Model
{

    public function block()
    {
        return $this->belongsTo(Block::class);
    }

    public function blockTarget()
    {
        return $this->belongsTo(Block::class,'target_block_id');
    }

    public function outputable()
    {
        return $this->morphTo();
    }

    public static function boot() {
        parent::boot();
        static::deleting(function($output) {
            $output->outputable()->delete();
        });
    }

}

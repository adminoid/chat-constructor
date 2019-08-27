<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\morphTo;

class Output extends Model
{

    protected $fillable = ['id', 'block_id', 'target_block_id', 'sort_order_id'];

    public static function boot() : void
    {
        parent::boot();
        static::deleting(static function($output) {
            $output->outputable()->delete();
        });
    }

    public function block() : BelongsTo
    {
        return $this->belongsTo(Block::class);
    }

    public function blockTarget() : BelongsTo
    {
        return $this->belongsTo(Block::class,'target_block_id');
    }

    public function outputable() : morphTo
    {
        return $this->morphTo();
    }

}

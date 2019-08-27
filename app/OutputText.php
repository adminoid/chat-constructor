<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OutputText extends Model
{
    protected $fillable = ['output_text_filter_id'];

    public function output()
    {
        return $this->morphOne(Output::class, 'outputable');
    }

    public function output_text_filter() : BelongsTo
    {
        return belongsTo(OutputTextFilter::class);
    }
}

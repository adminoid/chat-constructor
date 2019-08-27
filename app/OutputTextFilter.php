<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OutputTextFilter extends Model
{
    protected $fillable = ['name'];

    public function output_text() : HasMany
    {
        return $this->hasMany(OutputText::class);
    }
}

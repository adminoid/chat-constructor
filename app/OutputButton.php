<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OutputButton extends Model
{

    protected $fillable = ['text', 'external_link'];

    public function output()
    {
        return $this->morphOne(Output::class, 'outputable');
    }

}

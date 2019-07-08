<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OutputButton extends Model
{

    public function output()
    {
        return $this->morphOne(Output::class, 'outputable');
    }

}

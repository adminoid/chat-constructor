<?php

use Faker\Generator as Faker;

$factory->define(App\Block::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
    ];
});

<?php

use Faker\Generator as Faker;

$factory->define(App\Block::class, static function (Faker $faker) {
    return [
        'name' => $faker->name,
        'x' => $faker->numberBetween(100,300),
        'y' => $faker->numberBetween(100,300),
    ];
});

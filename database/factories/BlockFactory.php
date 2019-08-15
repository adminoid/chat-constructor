<?php

use Faker\Generator as Faker;

$factory->define(App\Block::class, static function (Faker $faker) {
    return [
        'name' => $faker->name,
        'x' => $faker->numberBetween(5,150),
        'y' => $faker->numberBetween(5,150),
    ];
});

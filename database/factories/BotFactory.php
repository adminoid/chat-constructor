<?php

use Faker\Generator as Faker;

$factory->define(App\Bot::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
    ];
});

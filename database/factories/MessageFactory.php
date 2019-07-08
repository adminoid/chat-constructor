<?php

use Faker\Generator as Faker;

$factory->define(App\Message::class, function (Faker $faker) {
    return [
        'delay' => $faker->randomFloat(2, 1, 5),
        'text' => $faker->text(),
    ];
});

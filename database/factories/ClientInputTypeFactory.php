<?php

use Faker\Generator as Faker;

$factory->define(App\ClientInputType::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
    ];
});

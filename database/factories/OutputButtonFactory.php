<?php

use Faker\Generator as Faker;

$factory->define(App\OutputButton::class, function (Faker $faker) {
    return [
        'text' => $faker->realText(15),
        'external_link' => $faker->url(),
    ];
});

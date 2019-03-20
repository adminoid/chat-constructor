<?php

use Faker\Generator as Faker;

$factory->define(App\Client::class, function (Faker $faker) {
    return [
        'ip' => $faker->ipv4(),
        'user_agent' => $faker->userAgent(),
        'email' => $faker->email(),
        'phone' => $faker->phoneNumber(),
    ];
});

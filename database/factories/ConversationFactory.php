<?php

use Faker\Generator as Faker;

$factory->define(App\Conversation::class, function (Faker $faker) {
    return [
        'message_value' => $faker->text(100),
        'message_direction' => $faker->boolean(),
    ];
});

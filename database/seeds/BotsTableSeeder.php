<?php

use Illuminate\Database\Seeder;

class BotsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $user = factory(App\User::class)->create();

        factory(App\Bot::class)->create([
            'user_id' => $user,
        ]);

    }
}

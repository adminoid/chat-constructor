<?php

use Illuminate\Database\Seeder;

class BlocksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $user = factory(App\User::class)->create();

        $bot = factory(App\Bot::class)->create([
            'user_id' => $user,
        ]);

        $block = factory(App\Block::class)->create([
            'bot_id' => $bot,
        ]);

    }
}

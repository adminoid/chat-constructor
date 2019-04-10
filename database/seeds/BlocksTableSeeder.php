<?php

use App\Block;
use Illuminate\Database\Seeder;
use App\Bot;

class BlocksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $bot = Bot::first();

        $bot->each(static function ($locBot) {
            $locBot->blocks()->saveMany(
                factory(Block::class, 5)->create()
            );
        });

    }
}

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
        $num = random_int(1, 5);
        $bot->each(static function ($locBot) use ($num){
            $locBot->blocks()->saveMany(
                factory(Block::class, $num)->create()
            );
        });

    }


}

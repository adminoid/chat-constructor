<?php

use App\Block;
use App\ClientInputType;
use Illuminate\Database\Seeder;
use App\Bot;

class BlocksTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @throws Exception
     */
    public function run()
    {

//        dd(ClientInputType::find(2));

        $bot = Bot::first();
        $num = random_int(2, 5);
        $bot->each(static function ($locBot) use ($num){
            $locBot->blocks()->saveMany(
                factory(Block::class, $num)->create()->each( function ($block) {
                    $block->client_input_type()->associate(ClientInputType::find(2));
                } )
            );
        });

    }


}

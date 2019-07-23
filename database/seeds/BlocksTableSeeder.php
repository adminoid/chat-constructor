<?php

use App\Block;
use App\ClientInputType;
use Illuminate\Database\Seeder;
use App\Bot;
use App\Message;

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
                    $message = Message::create([
                        'delay' => 1.0,
                        'text' => 'Вы просто напишите слова, а я буду говорить :D',
                        'sort_order_id' => 1,
                    ]);
                    $message2 = Message::create([
                        'delay' => 1.0,
                        'text' => 'Вы просто напишите слова, а я буду говорить :D',
                        'sort_order_id' => 2,
                    ]);
                    $block->messages()->save($message);
                    $block->messages()->save($message2);
                } )
            );
        });

    }


}

<?php

use App\Block;
use App\ClientInputType;
use Illuminate\Database\Seeder;
use App\Bot;
use App\Message;
use function MongoDB\BSON\toJSON;

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
//        $num = random_int(2, 5);
        $num = 3;
        $bot->each(static function ($locBot) use ($num){
            $locBot->blocks()->saveMany(
                factory(Block::class, $num)->create()->each( static function ($block) {
                    $block->client_input_type()->associate(ClientInputType::find(2));
                    $message = Message::create([
                        'delay' => 1.0,
                        'text' => trans('customer.message_default'),
                        'sort_order_id' => 1,
                    ]);
                    $message2 = Message::create([
                        'delay' => 1.0,
                        'text' => trans('customer.message_default'),
                        'sort_order_id' => 2,
                    ]);
                    $block->messages()->save($message);
                    $block->messages()->save($message2);
                    // todo: check if current bot has a flagman
                } )
            );

            $createdBlocks = $locBot->blocks()->get();
            $hasFlagman = $createdBlocks->some('flagman');
            if (!$hasFlagman) {
                $firstBlock = $createdBlocks->first();
                $firstBlock->flagman = true;
                $firstBlock->save();
            }


        });

    }


}

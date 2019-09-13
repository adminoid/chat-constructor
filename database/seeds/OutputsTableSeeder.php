<?php

use App\OutputText;
use Illuminate\Database\Seeder;
use App\Block;
use App\Output;

class OutputsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $blocks = Block::all();
        $blocks->each(static function ($locBlock){
            $output = factory(Output::class)->create(['sort_order_id' => 0]);
            $output->outputable()->associate(OutputText::create());
            $locBlock->outputs()->save($output);
        });
    }
}

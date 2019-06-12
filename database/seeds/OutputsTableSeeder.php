<?php

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
            $num = random_int(1, 3);
            $locBlock->outputs()->saveMany(
                factory(Output::class, $num)->create()
            );
        });
    }
}

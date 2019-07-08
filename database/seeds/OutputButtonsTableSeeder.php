<?php

use Illuminate\Database\Seeder;

class OutputButtonsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\OutputButton::class)->create();
    }
}

<?php

use Illuminate\Database\Seeder;

class ClientInputTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\ClientInputType::class)->create();
    }
}

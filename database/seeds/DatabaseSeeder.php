<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(BotsTableSeeder::class);
        $this->call(ClientInputTypesTableSeeder::class);
        $this->call(BlocksTableSeeder::class);
        $this->call(OutputsTableSeeder::class);
//        $this->call(OutputButtonsTableSeeder::class);
//        $this->call(ClientsTableSeeder::class);
//        $this->call(ConversationsTableSeeder::class);
    }
}

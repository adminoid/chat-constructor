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
         $this->call(BlocksTableSeeder::class);
         $this->call(MessagesTableSeeder::class);
         $this->call(ClientInputTypesTableSeeder::class);
    }
}

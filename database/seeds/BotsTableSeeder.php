<?php

use App\Bot;
use Illuminate\Database\Seeder;
use App\User;

class BotsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $user = User::where('email', 'mr@adminoid.com')->first();

        $user->each(static function ($u) {
            $u->bots()->saveMany(factory(Bot::class, 3)->create());
        });

    }
}

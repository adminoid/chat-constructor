<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Bot;
use App\User;

class BotsControllerTest extends TestCase
{

    use RefreshDatabase;

    public function testBotsUnAuth()
    {
        $response = $this->get('/private/bots');
        $response->assertStatus(302);
    }

    public function testBotsAuth()
    {

        $user = factory(User::class)->create();
        $response = $this->actingAs($user)
            ->get('/private/bots');
        $response->assertStatus(200);

    }

    public function testListsOfBots()
    {

        define('TOTAL', 3);

        $user = factory(User::class)->create();

        $user->each(static function ($u) {
            $u->bots()->saveMany(factory(Bot::class, TOTAL)->create());
        });

        $response = $this->actingAs($user)
            ->ajaxGet('/private/bots');

        $response->assertJsonCount(TOTAL, 'bots');
        $response->assertJsonFragment([
            'user_id' => $user->id
        ]);

    }

}

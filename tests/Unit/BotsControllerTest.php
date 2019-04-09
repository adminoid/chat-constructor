<?php

namespace Tests\Unit;

use Illuminate\Support\Facades\Auth;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Bot;
use App\User;

class BotsControllerTest extends TestCase
{

//    use RefreshDatabase;

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

    /**
     * Test for BotsController::index method
     */
    public function testBotsList()
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

    public function testBotStoreNewBotUnAuth()
    {
        $response = $this->ajaxPost('/private/bots');
        $response->assertStatus(302);
    }

    /**
     * Test for BotsController::store method
     */
    public function testBotStoreNewBot()
    {

        define('BOT_NAME', 'John Walker');

        $botData = [
            'name' => BOT_NAME
        ];

        $user = factory(User::class)->create();
        $response = $this->actingAs($user)
            ->ajaxPost('/private/bots', $botData);

        $response->assertJsonFragment([
            'name' => BOT_NAME
        ]);

        $lastBot = Bot::orderBy('created_at', 'desc')->first();

        $this->assertEquals(BOT_NAME, $lastBot->name);

    }

}

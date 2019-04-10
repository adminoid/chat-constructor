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

        $response->assertJsonCount(TOTAL);
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

    public function testBotUpdateUnAuthAndUnValid()
    {

        $user = factory(User::class)->create();
        $bot = new Bot(['name' => 'Bottie']);
        $user->bots()->save($bot);

        $this->assertEquals('Bottie', $bot->name);

        $botId = $bot->id;

        $response = $this->json('PUT', '/private/bots/' . $botId, ['name' => 'Sally']);

        $response->assertStatus(401);

        $response = $this->actingAs($user)
            ->json('PUT', '/private/bots/' . $botId, ['name' => 'S']);

        $response->assertJson([
            'errors' => true
        ]);

    }

    public function testBotUpdatePut()
    {

        $user = factory(User::class)->create();
        $bot = new Bot(['name' => 'Bottie']);
        $user->bots()->save($bot);

        $this->assertEquals('Bottie', $bot->name);

        $botId = $bot->id;

        $response = $this->actingAs($user)
            ->json('PUT', '/private/bots/' . $botId, ['name' => 'Sally']);

        $bot1 = Bot::find($botId);

        $this->assertEquals('Sally', $bot1->name);

        $response->assertJsonFragment([
            'name' => 'Sally'
        ]);

    }

    public function testBotUpdatePatch()
    {

        $user = factory(User::class)->create();
        $bot = new Bot(['name' => 'Bottie']);
        $user->bots()->save($bot);

        $this->assertEquals('Bottie', $bot->name);

        $botId = $bot->id;

        $response = $this->actingAs($user)
            ->json('PATCH', '/private/bots/' . $botId, ['name' => 'Sally']);

        $response->assertStatus(200);

        $bot1 = Bot::find($botId);
        $this->assertEquals('Sally', $bot1->name);
        $response->assertJsonFragment([
            'name' => 'Sally'
        ]);

    }

    public function testBotUpdateNotOwner()
    {

        $user = factory(User::class)->create();
        $user2 = factory(User::class)->create();
        $bot = new Bot(['name' => 'Bottie']);
        $user->bots()->save($bot);

        $this->assertEquals('Bottie', $bot->name);

        $botId = $bot->id;

        $response = $this->actingAs($user2)
            ->json('PUT', '/private/bots/' . $botId, ['name' => 'Sally']);

        $response->assertStatus(403);

    }

    public function testBotDeleteUnAuth()
    {

        $user = factory(User::class)->create();
        $bot = new Bot(['name' => 'Deleton']);
        $user->bots()->save($bot);

        $this->assertEquals('Deleton', $bot->name);

        $response = $this->json('DELETE', '/private/bots/' . $bot->id);

        $response->assertStatus(401);

    }

    public function testBotDeleteNotOwner()
    {

        $user = factory(User::class)->create();
        $bot = new Bot(['name' => 'Deleton']);
        $user->bots()->save($bot);

        $this->assertEquals('Deleton', $bot->name);

        $user2 = factory(User::class)->create();
        $response = $this->actingAs($user2)
            ->json('DELETE', '/private/bots/' . $bot->id);

        $response->assertStatus(401);

    }

    public function testBotDeleteOwner()
    {

        $user = factory(User::class)->create();
        $bot = new Bot(['name' => 'Deleton']);
        $user->bots()->save($bot);
        $botId = $bot->id;

        $this->assertEquals('Deleton', $bot->name);

        $response = $this->actingAs($user)
            ->json('DELETE', '/private/bots/' . $botId );

        $response->assertJsonFragment([
            'name' => 'Deleton'
        ]);

        $foundBot = Bot::find($botId);

        $this->assertEquals(null, $foundBot);

    }

}

<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\App;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Bot;

class UserBotRelationshipsTest extends TestCase
{

    use RefreshDatabase;

    /**
     * testing user -> bot relation
     *
     * @return void
     */
    public function testUserBotRelationship()
    {

        $user = factory('App\User')->create();
        $user->bots()->saveMany(factory('App\Bot', 7)->make());

        $this->assertEquals($user->bots()->count(), 7);

    }

    public function testBotUserRelationship()
    {
        $user = factory('App\User')->create();
        $user->bots()->save(factory('App\Bot')->make());
        $bot = $user->bots()->first();
        $this->assertTrue($bot->user()->exists());

    }

    public function testCascadeDeletingBotsWithUser()
    {

        $user = factory('App\User')->create();
        $user->bots()->save(factory('App\Bot')->make());
        $botId = $user->bots()->first()->id;

        $this->assertGreaterThan(0, $botId);

        $user->delete();
        $twiceBot = Bot::find($botId);

        $this->assertNull($twiceBot);

    }
}

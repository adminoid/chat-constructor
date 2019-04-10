<?php

namespace Tests\Unit;

use App\Block;
use App\Bot;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BlocksControllerTest extends TestCase
{

    use RefreshDatabase;

    public function testIndexBotIdBlockListNotAuth()
    {

        $user = factory(User::class)->create();
        $bot = factory(Bot::class)->create();
        $user->bots()->save($bot);
        $botId = $bot->id;
        factory(Block::class, 3)->create()->each(function ($b) use(&$bot){
            $bot->blocks()->save($b);
        });

        $response = $this->get('/private/bots/' . $botId );

        $response->assertStatus(302);

    }

    public function testIndexBotIdBlockList()
    {

        $user = factory(User::class)->create();
        $bot = factory(Bot::class)->create();
        $user->bots()->save($bot);
        $botId = $bot->id;
        $blocks = factory(Block::class, 3)->create()->each(function ($b) use(&$bot){
            $bot->blocks()->save($b);
        });

        $response = $this->actingAs($user)
            ->get('/private/bots/' . $botId );

        $response->assertJsonCount(3);

    }

    public function testIndexBotIdBlockListNotOwner()
    {

        $user = factory(User::class)->create();
        $user2 = factory(User::class)->create();
        $bot = factory(Bot::class)->create();
        $user->bots()->save($bot);
        $botId = $bot->id;
        $blocks = factory(Block::class, 3)->create()->each(function ($b) use(&$bot){
            $bot->blocks()->save($b);
        });

        $response = $this->actingAs($user2)
            ->get('/private/bots/' . $botId);

        $response->assertStatus(403);

    }

    public function testStoreNewlyCreatedBlockUnAuthAndNotOwner()
    {

        $user = factory(User::class)->create();
        $user2 = factory(User::class)->create();
        $bot = factory(Bot::class)->create();

        $user->bots()->save($bot);
        $botId = $bot->id;
        factory(Block::class, 3)->create()->each(function ($b) use(&$bot){
            $bot->blocks()->save($b);
        });

        $response = $this->postJson('/private/bots/' . $botId, [
            'name' => 'New Block Name'
        ]);

        $response->assertStatus(401);

        $response = $this->actingAs($user2)
            ->postJson('/private/bots/' . $botId, [
                'name' => 'New Block Name'
            ]);

        $response->assertStatus(403);

    }

    public function testStoreNewlyCreatedBlock()
    {

        $user = factory(User::class)->create();
        $bot = factory(Bot::class)->create();

        $user->bots()->save($bot);
        $botId = $bot->id;
        factory(Block::class, 3)->create()->each(function ($b) use(&$bot){
            $bot->blocks()->save($b);
        });

        $response = $this->actingAs($user)
            ->postJson('/private/bots/' . $botId, [
                'name' => 'Walker'
            ]);

        $response->assertJsonFragment([
            'name' => 'Walker'
        ]);

    }



}

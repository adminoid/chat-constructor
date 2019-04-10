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

        $response = $this->get('/private/bots/' . $botId . '/blocks');

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
            ->get('/private/bots/' . $botId . '/blocks' );

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
            ->get('/private/bots/' . $botId . '/blocks');

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

        $response = $this->postJson('/private/bots/' . $botId . '/blocks', [
            'name' => 'New Block Name'
        ]);

        $response->assertStatus(401);

        $response = $this->actingAs($user2)
            ->postJson('/private/bots/' . $botId . '/blocks', [
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
            ->postJson('/private/bots/' . $botId . '/blocks', [
                'name' => 'Walker'
            ]);

        $response->assertJsonFragment([
            'name' => 'Walker'
        ]);

    }

    public function testBlockUpdatePut()
    {

        $user = factory(User::class)->create();
        $bot = new Bot(['name' => 'Bottie']);
        $blocks = factory(Block::class, 3)->create();
        $user->bots()->save($bot);
        $botId = $bot->id;
        $bot->blocks()->saveMany($blocks);
        $demoBlock = $blocks->first();
        $demoBlockName = $demoBlock->name;
        $demoBlockId = $demoBlock->id;

        $uri = '/private/bots/' . $botId . '/blocks/' . $demoBlockId;
        $response = $this->json('PUT', $uri, [
                'name' => 'Sally'
            ]);

        $response->assertStatus(401);

        $response = $this->actingAs($user)
            ->json('PUT', $uri, [
                'name' => 'Sally'
            ]);

        $response->assertStatus(200);

        $foundBlock = Block::find($demoBlockId);

        $this->assertEquals('Sally', $foundBlock->name);

        $response->assertJsonFragment([
            'name' => 'Sally'
        ]);

    }

    public function testBlockUpdatePatch()
    {

        $user = factory(User::class)->create();
        $bot = new Bot(['name' => 'Bottie']);
        $blocks = factory(Block::class, 3)->create();
        $user->bots()->save($bot);
        $botId = $bot->id;
        $bot->blocks()->saveMany($blocks);
        $demoBlock = $blocks->first();
        $demoBlockName = $demoBlock->name;
        $demoBlockId = $demoBlock->id;

        $uri = '/private/bots/' . $botId . '/blocks/' . $demoBlockId;
        $response = $this->json('PATCH', $uri, [
            'name' => 'Sally'
        ]);

        $response->assertStatus(401);

        $response = $this->actingAs($user)
            ->json('PUT', $uri, [
                'name' => 'Sally'
            ]);

        $response->assertStatus(200);

        $foundBlock = Block::find($demoBlockId);

        $this->assertEquals('Sally', $foundBlock->name);

        $response->assertJsonFragment([
            'name' => 'Sally'
        ]);

    }

    public function testBlockDeleteUnAuth()
    {

        $user = factory(User::class)->create();
        $bot = new Bot(['name' => 'Deleton']);
        $user->bots()->save($bot);

        $this->assertEquals('Deleton', $bot->name);

        $blocks = factory(Block::class, 3)->create();

        $bot->blocks()->saveMany($blocks);

        $demoBlock = $blocks->first();

        $response = $this->json('DELETE', '/private/bots/' . $bot->id . '/blocks/' . $demoBlock->id);

        $response->assertStatus(401);

    }

    public function testBlockDeleteNotOwner()
    {

        $user = factory(User::class)->create();
        $bot = new Bot(['name' => 'Deleton']);
        $user->bots()->save($bot);

        $this->assertEquals('Deleton', $bot->name);

        $block = factory(Block::class)->create();
        $blockId = $block->id;

        $bot->blocks()->save($block);

        $user2 = factory(User::class)->create();

        $response = $this->actingAs($user2)
            ->json('DELETE', '/private/bots/' . $bot->id . '/blocks/' . $blockId);

        $response->assertStatus(403);

    }

    public function testBlockDeleteOwner()
    {

        $user = factory(User::class)->create();
        $bot = new Bot(['name' => 'Deleton']);
        $user->bots()->save($bot);

        $this->assertEquals('Deleton', $bot->name);

        $block = factory(Block::class)->create();
        $blockId = $block->id;
        $blockName = $block->name;

        $bot->blocks()->save($block);

        $response = $this->actingAs($user)
            ->json('DELETE', '/private/bots/' . $bot->id . '/blocks/' . $blockId);

        $response->assertJsonFragment([
            'name' => $blockName
        ]);

        $foundBlock = Block::find($blockId);

        $this->assertEquals(null, $foundBlock);

    }

}

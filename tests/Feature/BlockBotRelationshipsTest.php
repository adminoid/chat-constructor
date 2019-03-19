<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Bot;
use App\Block;

class BlockBotRelationshipsTest extends TestCase
{

    use RefreshDatabase;

    /**
     * A test for block <-> bot relationship
     *
     * @return void
     */
    public function testBlockBotRelationship() : void
    {

        $block = factory(Block::class)->create();
        $bot = factory(Bot::class)->create();
        $block->bot()->associate($bot);

        $this->assertEquals($block->bot()->count(), 1);

    }

    public function testBotBlockRlationship() : void
    {

        $bot = factory(Bot::class)->create();
        $blocks = factory(Block::class, 3)->create();
        $bot->blocks()->saveMany($blocks);

        $this->assertEquals($bot->blocks()->count(), 3);

    }

    public function testCascadeDeletingBlocksWithBot() : void
    {

        $bot = factory('App\Bot')->create();
        $blocks = factory('App\Block', 7)->create();
        $bot->blocks()->saveMany($blocks);

        $this->assertEquals($bot->blocks()->count(), 7);

        $block = $bot->blocks()->first();

        $oneRelatedBlockId = $block->id;

        $bot->delete();

        $relatedBlock = Block::find($oneRelatedBlockId);

        $this->assertNull($relatedBlock);

    }

}

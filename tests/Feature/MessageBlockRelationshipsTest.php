<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\App;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Message;
use App\Block;

class MessageBlockRelationshipsTest extends TestCase
{

    use RefreshDatabase;

    public function testMessageBlockRelationships() : void
    {

        $message = factory(Message::class)->create();
        $block = factory(Block::class)->create();
        $message->block()->associate($block);

        $this->assertEquals($message->block()->count(), 1);

    }

    public function testBlockMessageRelationships() : void
    {

        $block = factory(Block::class)->create();
        $messages = factory(Message::class, 7)->create();

        $block->messages()->saveMany($messages);

        $this->assertEquals($block->messages()->count(), 7);

    }

    public function testCascadeDeletingBlocksWithMessages() : void
    {

        $messages = factory(Message::class, 7)->create();
        $block = factory(Block::class)->create();

        $block->messages()->saveMany($messages);

        $this->assertEquals($block->messages()->count(), 7);

        $message = $block->messages()->first();

        $oneRelatedMessageId = $message->id;

        $block->delete();

        $relatedMessage = Message::find($oneRelatedMessageId);

        $this->assertNull($relatedMessage);

    }

}

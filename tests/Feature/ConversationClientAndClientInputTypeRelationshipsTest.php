<?php

namespace Tests\Feature;

use App\Client;
use App\ClientInputType;
use App\Conversation;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ConversationClientAndClientInputTypeRelationshipsTest extends TestCase
{

    use RefreshDatabase;

    public function testConversationClientRelationship() : void
    {

        $conversation = factory(Conversation::class)->create();
        $client = factory(Client::class)->create();

        $conversation->client()->associate($client);

        $this->assertEquals($conversation->client()->count(), 1);

    }

    public function testClientConversationRelationship() : void
    {

        $client = factory(Client::class)->create();
        $conversations = factory(Conversation::class, 3)->create();

        $client->conversations()->saveMany($conversations);

        $this->assertEquals($client->conversations()->count(), 3);

    }

    public function testConversationInputTypeRelationship() : void
    {

        $conversation = factory(Conversation::class)->create();
        $inputType = factory(ClientInputType::class)->create();

        $conversation->client_input_type()->associate($inputType);

        $this->assertEquals($conversation->client_input_type()->count(), 1);

    }

    public function testCascadeDeletingClientWithConversations() : void
    {

        $client = factory(Client::class)->create();
        $conversations = factory(Conversation::class, 3)->create();

        $client->conversations()->saveMany($conversations);

        $this->assertEquals($client->conversations()->count(), 3);

        $conversation = $client->conversations()->first();

        $oneRelatedConversationId = $conversation->id;

        $client->delete();

        $this->assertNull(Conversation::find($oneRelatedConversationId));

    }

}

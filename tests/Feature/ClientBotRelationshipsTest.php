<?php

namespace Tests\Feature;

use App\Bot;
use App\Client;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ClientBotRelationshipsTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testClientBotRelationship() : void
    {

        $client = factory(Client::class)->create();
        $bot = factory(Bot::class)->create();

        $client->bot()->associate($bot);

        $this->assertEquals($client->bot()->count(), 1);

    }

    public function testBotClientRelationship() : void
    {

        $bot = factory(Bot::class)->create();
        $clients = factory(Client::class, 7)->create();

        $bot->clients()->saveMany($clients);

        $this->assertEquals($bot->clients()->count(), 7);

    }

    public function testCascadeDeletingClientsWithBot() : void
    {

        $clients = factory(Client::class, 3)->create();
        $bot = factory(Bot::class)->create();
        $bot->clients()->saveMany($clients);
        $this->assertEquals($bot->clients()->count(), 3);
        $client = $bot->clients()->first();
        $oneRelatedClientId = $client->id;
        $bot->delete();
        $this->assertNull(Client::find($oneRelatedClientId));

    }

}

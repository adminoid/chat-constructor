<?php

namespace Tests\Feature;

use App\Block;
use App\ClientInputType;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ClientInputTypeBlockRelationshipsTest extends TestCase
{

//    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testBlockClientInputTypeRelationship() : void
    {

        $block = factory(Block::class)->create();

        $inputType = factory(ClientInputType::class)->create();

        $block->client_input_type()->associate($inputType);

        $this->assertEquals($block->client_input_type()->count(), 1);

    }
}

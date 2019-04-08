<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;

class CabinetTest extends TestCase
{
    public function testIndexUnAuth()
    {

        $response = $this->get('/cabinet');
        $response->assertStatus(302);

    }

    public function testBotsUnAuth()
    {
        $response = $this->get('/private/bots');
        $response->assertStatus(302);
    }

    public function testIndexAuth()
    {

        $user = factory(User::class)->create();
        $response = $this->actingAs($user)
            ->get('/cabinet');

        $response->assertViewIs('customer.index');

    }

    public function testBotsAuth()
    {

        $user = factory(User::class)->create();
        $response = $this->actingAs($user)
            ->get('/private/bots');
        $response->assertStatus(200);

    }
}

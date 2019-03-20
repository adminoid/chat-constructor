<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\OutputButton;
use App\Output;

class OutputButtonOutputRelationshipsTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testOutputButtonOutputRelationship() : void
    {

        $outputButton = factory(OutputButton::class)->create();
        $output = factory(Output::class)->create();

        $outputButton->output()->save($output);

        $this->assertEquals($outputButton->output()->count(), 1);

    }

    public function testOutputOutputButtonRelationship() : void
    {

        $output = factory(Output::class)->create();
        $outputButton = factory(OutputButton::class)->create();
        $output->outputable()->associate($outputButton);

        $this->assertEquals($output->outputable()->count(), 1);

    }

    public function testDeletingOutputableWithOutput() : void
    {

        $output = factory(Output::class)->create();
        $outputButton = factory(OutputButton::class)->create();
        $outputButtonId = $outputButton->id;
        $output->outputable()->associate($outputButton);

        $this->assertEquals($output->outputable()->count(), 1);

        $output->delete();

        $this->assertNull(OutputButton::find($outputButtonId));

    }

}

<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Output;
use App\Block;

class OutputBlockRelationshipsTest extends TestCase
{

    use RefreshDatabase;

    public function testOutputBlockRelationships() : void
    {
        $output = factory(Output::class)->create();
        $block = factory(Block::class)->create();

        $output->block()->associate($block);

        $this->assertEquals($output->block()->count(), 1);
    }

    public function testBlockOutputRelationships() : void
    {

        $block = factory(Block::class)->create();
        $outputs = factory(Output::class, 7)->create();

        $block->outputs()->saveMany($outputs);

        $this->assertEquals($block->outputs()->count(), 7);

    }

    public function testCascadeDeletingBlockWithOutputs() : void
    {

        $outputs = factory(Output::class, 7)->create();
        $block = factory(Block::class)->create();

        $block->outputs()->saveMany($outputs);

        $this->assertEquals($block->outputs()->count(), 7);

        $output = $block->outputs()->first();

        $oneRelatedOutputId = $output->id;

        $block->delete();

        $relatedOutput = Output::find($oneRelatedOutputId);

        $this->assertNull($relatedOutput);

    }

    public function testOutputBlockTargetRelationship() : void
    {

        $output = factory(Output::class)->create();
        $targetBlock = factory(Block::class)->create();

        $output->blockTarget()->associate($targetBlock);

        $this->assertEquals($output->blockTarget()->count(), 1);

    }

    public function testBlockTargetOutputSourcesRelationship() : void
    {

        $outputSource = factory(Output::class)->create();
        $blockTarget = factory(Block::class)->create();

        $blockTarget->outputSources()->save($outputSource);

        $this->assertEquals($blockTarget->outputSources()->count(), 1);

    }

}

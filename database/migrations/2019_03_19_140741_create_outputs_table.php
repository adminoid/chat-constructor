<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOutputsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('outputs', static function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('block_id')->nullable();
            $table->unsignedBigInteger('target_block_id')->nullable();
            $table->unsignedBigInteger('outputable_id')->nullable();
            $table->string('outputable_type')->nullable();
            $table->unsignedInteger('sort_order_id')->nullable();
            $table->timestamps();

            $table->foreign('block_id')
                ->references('id')->on('blocks')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() : void
    {
        Schema::dropIfExists('outputs');
    }
}

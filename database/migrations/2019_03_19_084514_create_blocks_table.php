<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBlocksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blocks', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('coords')->default('[20,30]');
            $table->unsignedInteger('client_input_type_id')->nullable();
            $table->unsignedBigInteger('bot_id')->nullable();
            $table->timestamps();
            $table->boolean('active')->default(true);
            $table->string('component')->default('BlockBase');
            $table->boolean('intact')->default(true);
            $table->foreign('bot_id')
                ->references('id')->on('bots')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blocks');
    }
}

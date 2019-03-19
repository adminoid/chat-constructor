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
            // todo remove nullable after create client_input_types table
            $table->integer('client_input_type_id')->unsigned()->nullable();
            $table->unsignedBigInteger('bot_id')->nullable();
            $table->timestamps();


        });

        Schema::table('blocks', function($table) {
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

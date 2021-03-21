<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('bot_id')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->string('ip')->nullable();
            $table->string('user_agent')->nullable();
            // email stores in users table
            $table->string('phone')->nullable();
            $table->timestamps();

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
        Schema::dropIfExists('clients');
    }
}

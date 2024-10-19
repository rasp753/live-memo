<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('memo')->nullable();
            $table->boolean('flag')->default(false);
            $table->dateTime('deadline')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('done_at')->nullable();
        });

        Schema::table('todos', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('event_id')->constrained('events');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todos');
    }
};

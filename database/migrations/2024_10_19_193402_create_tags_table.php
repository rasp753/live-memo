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
        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->softDeletes();
        });

        Schema::create('event_tags', function (Blueprint $table) {
            $table->id();
        });

        Schema::table('event_tags', function (Blueprint $table) {
            $table->foreignId('event_id')->constrained('events');
            $table->foreignId('tag_id')->constrained('tags');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tags');
    }
};

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Todos extends Model
{
    use HasFactory;

    /**
     * Relations
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    use HasFactory;

    /**
     * Relations
     */
    public function events(): BelongsToMany
    {
        return $this->belongsToMany(Event::class, 'event_tags');
    }
}

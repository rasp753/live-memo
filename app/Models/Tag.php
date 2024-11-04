<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model
{
    use HasFactory;

    public $timestamps = false;

    /**
     * Relations
     */
    public function events(): BelongsToMany
    {
        return $this->belongsToMany(Event::class, 'event_tags', 'tag_id', 'event_id');
    }

    protected $fillable = [
        'name',
    ];
}

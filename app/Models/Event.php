<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use HasFactory;
    use SoftDeletes;

    /**
     * Relations
     */
    public function todos(): HasMany
    {
        return $this->hasMany(Todos::class);
    }
    public function dates(): HasMany
    {
        return $this->hasMany(Date::class);
    }
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'event_tags');
    }

    protected $fillable = [
        'name',
        'date',
        'type',
        'venue',
        'website_url',
        'memo',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'datetime',
        ];
    }
}

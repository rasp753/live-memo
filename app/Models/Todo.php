<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Todo extends Model
{
    use HasFactory;

    public $timestamps = false;

    /**
     * Relations
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    protected $fillable = [
        'id',
        'user_id',
        'event_id',
        'name',
        'done',
        'deadline',
        'flag',
        'memo',
    ];

    protected function casts(): array
    {
        return [
            'deadline' => 'datetime',
        ];
    }
}

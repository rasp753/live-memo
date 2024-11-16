<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Todo extends Model
{
    use HasFactory;

    // タイムスタンプを使用しない
    public $timestamps = false;

    /**
     * Relations
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    /**
     * Fillable
     */
    protected $fillable = [
        'user_id',
        'event_id',
        'name',
        'done',
        'deadline',
        'flag',
        'memo',
    ];

    /**
     * Casts
     */
    protected function casts(): array
    {
        return [
            'deadline' => 'datetime',
            'done' => 'boolean',
            'flag' => 'boolean',
        ];
    }
}

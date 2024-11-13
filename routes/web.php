<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('home');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route for home
    Route::get('/home', [EventController::class, 'home'])->name('home');

    // Route for events
    Route::get('/events/create', [EventController::class, 'create'])->name('events.create');
    Route::get('/events', [EventController::class, 'index'])->name('events.index');
    Route::post('/events', [EventController::class, 'store'])->name('events.store');
    Route::get('/events/{event}/edit', [EventController::class, 'edit'])->name('events.edit');
    Route::delete('/events/{event}', [EventController::class, 'delete'])->name('events.delete');
    Route::get('/events/{event}', [EventController::class, 'show'])->name('events.show');
    Route::put('/events/{event}', [EventController::class, 'update'])->name('events.update');

    // Route for todos
    Route::post('/events/{event}/todos', [TodoController::class, 'store'])->name('todos.store');
    Route::put('/events/{event}/todos/{todo}', [TodoController::class, 'edit'])->name('todos.edit');
    Route::delete('/events/{event}/todos/{todo}', [TodoController::class, 'delete'])->name('todos.delete');
});

require __DIR__ . '/auth.php';

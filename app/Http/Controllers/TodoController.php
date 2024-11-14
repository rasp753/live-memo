<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function store(Request $request, Event $event, Todo $todo)
    {
        $event_id = $event->id;
        $user_id = $request->user()->id;
        $input = $request->todo;
        $input['event_id'] = $event_id;
        $input['user_id'] = $user_id;
        $todo->fill($input)->save();

        if ($request->has('from')) {
            if ($request->from === 'events.show') {
                return redirect()->route('events.show', ['event' => $event_id]);
            } elseif ($request->from === 'home') {
                return redirect()->route('home');
            } elseif ($request->from === 'todos.index') {
                return redirect()->route('todos.index');
            }
        }

        return redirect()->route('events.show', ['event' => $event_id]);
    }

    public function edit(Request $request, Event $event, Todo $todo)
    {
        $input = $request->todo;
        $todo->fill($input)->save();

        if ($request->has('from')) {
            if ($request->from === 'events.show') {
                return redirect()->route('events.show', ['event' => $event->id]);
            } elseif ($request->from === 'home') {
                return redirect()->route('home');
            } elseif ($request->from === 'todos.index') {
                return redirect()->route('todos.index');
            }
        }

        return redirect()->route('events.show', ['event' => $event->id]);
    }

    public function delete(Request $request, Event $event, Todo $todo)
    {
        $todo->delete();

        if ($request->has('from')) {
            if ($request->from === 'events.show') {
                return redirect()->route('events.show', ['event' => $event->id]);
            } elseif ($request->from === 'home') {
                return redirect()->route('home');
            } elseif ($request->from === 'todos.index') {
                return redirect()->route('todos.index');
            }
        }

        return redirect()->route('events.show', ['event' => $event->id]);
    }

    public function index(Request $request, Todo $todo)
    {
        return Inertia::render('Todo/Index', [
            'todos' => $todo->where('user_id', $request->user()->id)->where('done', false)->orderBy('deadline', 'desc')->with('event')->get(),
        ]);
    }
}

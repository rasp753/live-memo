<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Todo;
use Illuminate\Http\Request;

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

        return redirect()->route('events.show', ['event' => $event_id]);
    }

    public function edit(Request $request, Event $event, Todo $todo)
    {
        $input = $request->todo;
        $todo->fill($input)->save();

        return redirect()->route('events.show', ['event' => $event->id]);
    }

    public function delete(Request $request, Event $event, Todo $todo)
    {
        $todo->delete();

        return redirect()->route('events.show', ['event' => $event->id]);
    }
}
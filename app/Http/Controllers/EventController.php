<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index(Event $event)
    {
        return Inertia::render('Event/Index', [
            'events' => $event->get()
        ]);
    }

    public function show(Event $event)
    {
        return Inertia::render('Event/Show', [
            'event' => $event
        ]);
    }

    public function create()
    {
        return Inertia::render('Event/Create');
    }

    public function store(EventRequest $request, Event $event)
    {
        $input = $request->all();
        $date = new Carbon($request->date);
        $input['date'] = $date->toDateTimeString();
        $input['created_by'] = $request->user()->id;
        $input['updated_by'] = $request->user()->id;
        $event->fill($input)->save();
        return redirect()->route('events.show', ['event' => $event->id]);
    }

    public function edit(Event $event)
    {
        return Inertia::render('Event/Edit', [
            'event' => $event
        ]);
    }

    public function update(EventRequest $request, Event $event)
    {
        $input = $request->all();
        $date = new Carbon($request->date);
        $input['date'] = $date->toDateTimeString();
        $input['updated_by'] = $request->user()->id;
        $event->fill($input)->save();
        return redirect()->route('events.show', ['event' => $event->id]);
    }

    public function delete(Request $request, Event $event)
    {
        $input['deleted_by'] = $request->user()->id;
        $event->fill($input)->delete();
        return redirect()->route('events.index');
    }
}

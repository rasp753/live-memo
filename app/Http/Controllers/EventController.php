<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Models\Event;
use App\Models\Tag;
use App\Models\Todo;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function index(Request $request, Event $event): Response
    {
        return Inertia::render('Event/Index', [
            'events' => $event->where('created_by', $request->user()->id)->with('tags')->get(),
        ]);
    }

    public function show(Event $event): Response
    {
        return Inertia::render('Event/Show', [
            'event' => $event->load('tags')->load('todos'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Event/Create');
    }

    public function store(EventRequest $request, Event $event): RedirectResponse
    {
        $input = $request->all();
        $date = new Carbon($request->date);
        $input['date'] = $date->toDateTimeString();
        $input['created_by'] = $request->user()->id;
        $input['updated_by'] = $request->user()->id;
        $event->fill($input)->save();

        $this->setTagToEvent($event, $request->tags);

        return redirect()->route('events.show', ['event' => $event->id]);
    }

    public function edit(Event $event): Response
    {
        return Inertia::render('Event/Edit', [
            'event' => $event->load('tags'),
        ]);
    }

    public function update(EventRequest $request, Event $event)
    {
        $input = $request->all();
        $date = new Carbon($request->date);
        $input['date'] = $date->toDateTimeString();
        $input['updated_by'] = $request->user()->id;
        $event->fill($input)->save();

        $this->setTagToEvent($event, $request->tags);

        return redirect()->route('events.show', ['event' => $event->id]);
    }

    public function delete(Request $request, Event $event)
    {
        $input['deleted_by'] = $request->user()->id;
        $input['deleted_at'] = Carbon::now();
        $event->fill($input)->save();

        return redirect()->route('events.index');
    }

    public function setTagToEvent(Event $event, array $tagTexts): void
    {
        $event->tags()->detach();

        $tags = collect($tagTexts)->map(function ($tagText) {
            return Tag::firstOrCreate(['name' => $tagText]);
        });

        $event->tags()->attach($tags->pluck('id')->toArray());
    }

    public function home(Request $request, Event $event, Todo $todo): Response
    {
        // 本日以降で直近のイベントと１ヶ月以内に期限が来るTodoを抽出して送信
        return Inertia::render('Home', [
            'event' => $event->where('created_by', $request->user()->id)->whereDate('date', '>=', Carbon::yesterday()->toDateTimeString())->orderBy('date', 'asc')->with('tags')->first(),
            'todos' => $todo->where('user_id', $request->user()->id)->whereDate('deadline', '>=', Carbon::yesterday()->subdays(30)->toDateTimeString())->whereDate('deadline', '<=', Carbon::yesterday()->toDateTimeString())->orderBy('deadline', 'desc')->with('event')->get(),
        ]);
    }
}

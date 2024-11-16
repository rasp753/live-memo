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
    // イベント一覧表示
    public function index(Request $request, Event $event): Response
    {
        return Inertia::render('Event/Index', [
            'events' => $event->where('created_by', $request->user()->id)->orderBy('date', 'desc')->with('tags')->get(),
        ]);
    }

    // イベント詳細表示
    public function show(Event $event): Response
    {
        return Inertia::render('Event/Show', [
            'event' => $event->load('tags')->load('todos'),
        ]);
    }

    // イベント作成画面表示
    public function create(): Response
    {
        return Inertia::render('Event/Create');
    }

    // イベント新規作成処理
    public function store(EventRequest $request, Event $event): RedirectResponse
    {
        $input = $request->all();
        $date = new Carbon($request->date);
        $input['date'] = $date->toDateTimeString(); // DB用に整形
        $input['created_by'] = $request->user()->id;
        $input['updated_by'] = $request->user()->id;
        $event->fill($input)->save();

        // タグ登録
        $this->setTagToEvent($event, $request->tags);

        return redirect()->route('events.show', ['event' => $event->id]);
    }

    // イベント編集画面表示
    public function edit(Event $event): Response
    {
        return Inertia::render('Event/Edit', [
            'event' => $event->load('tags'),
        ]);
    }

    // イベント更新処理
    public function update(EventRequest $request, Event $event)
    {
        $input = $request->all();
        $date = new Carbon($request->date);
        $input['date'] = $date->toDateTimeString(); // DB用に整形
        $input['updated_by'] = $request->user()->id;
        $event->fill($input)->save();

        $this->setTagToEvent($event, $request->tags);

        return redirect()->route('events.show', ['event' => $event->id]);
    }

    // イベント削除処理
    public function delete(Request $request, Event $event)
    {
        $input['deleted_by'] = $request->user()->id;
        $input['deleted_at'] = Carbon::now();
        $event->fill($input)->save();

        return redirect()->route('events.index');
    }

    // イベントにタグを紐付ける
    public function setTagToEvent(Event $event, array $tagTexts): void
    {
        $event->tags()->detach();

        $tags = collect($tagTexts)->map(function ($tagText) {
            return Tag::firstOrCreate(['name' => $tagText]);
        });

        $event->tags()->attach($tags->pluck('id')->toArray());
    }

    // ホーム画面表示
    public function home(Request $request, Event $event, Todo $todo): Response
    {
        // 本日以降で直近のイベントと１ヶ月以内に期限が来るTodoを抽出して送信
        return Inertia::render('Home', [
            'event' => $event->where('created_by', $request->user()->id)->whereDate('date', '>=', Carbon::today()->toDateTimeString())->orderBy('date', 'asc')->with('tags')->first(),
            'todos' => $todo->where('user_id', $request->user()->id)->whereDate('deadline', '<=', Carbon::today()->adddays(30)->toDateTimeString())->where('done', false)->orderBy('deadline', 'desc')->with('event')->get(),
        ]);
    }

    // イベント検索処理
    public function search(Request $request, Event $event): Response
    {
        $events = $event->where('created_by', $request->user()->id);

        // スペース・カンマ区切りでAND検索
        $keywords = preg_split('/[\s,]+/', $request->keyword);
        foreach ($keywords as $keyword) {
            if (str_starts_with($keyword, '#')) {
                $tag = Tag::where('name', substr($keyword, 1))->first();
                if ($tag) {
                    $events = $events->whereHas('tags', function ($query) use ($tag) {
                        $query->where('tags.id', $tag->id);
                    });
                }
            } elseif (str_starts_with($keyword, '@')) {
                $events = $events->where('venue', 'like', '%' . substr($keyword, 1) . '%');
            } elseif (str_starts_with($keyword, 'type:')) {
                $events = $events->where('type', substr($keyword, 5));
            } else {
                $events = $events->where('name', 'like', '%' . $keyword . '%');
            }
        }

        // 開催日降順で返す
        $events = $events->orderBy('date', 'desc')->with('tags')->get();
        return Inertia::render('Event/Index', [
            'events' => $events,
            'keyword' => $request->keyword, // 検索キーワードを保持用
        ]);
    }
}

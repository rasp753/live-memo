import Authenticated from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { Link, router } from '@inertiajs/react';
import { differenceInCalendarDays } from 'date-fns';
import { Fragment, useState } from 'react';

import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Calendar } from '@/Components/ui/calendar';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Checkbox } from '@/Components/ui/checkbox';
import { Input } from '@/Components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/Components/ui/popover';
import { Separator } from '@/Components/ui/separator';
import {
    CalendarIcon,
    Cross1Icon,
    ExternalLinkIcon,
} from '@radix-ui/react-icons';
import { Flag } from 'lucide-react';

import { Event } from '@/types/Event';

const Show = (props: { auth: { user: User }; event: Event }) => {
    const { event } = props;

    const onEventDeleteButtonClicked = () => {
        router.delete(`/events/${event.id}`);
    };

    const [todos, setTodos] = useState(event.todos);

    const [newTodoName, setNewTodoName] = useState('');
    return (
        <Authenticated>
            <div className="mx-auto my-4 max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
                <div className="flex h-10 items-center">
                    <div className="text-2xl">
                        <h1>イベント詳細</h1>
                    </div>
                </div>
                <div className="space-y-2">
                    <Card key={event.id}>
                        <div className="flex items-center">
                            <CardHeader className="mr-auto">
                                <CardTitle>{event.name}</CardTitle>
                                <CardDescription>
                                    {new Date(event.date).toLocaleDateString()}
                                </CardDescription>
                                <div className="flex flex-wrap gap-1">
                                    <Badge variant="default">
                                        {event.type}
                                    </Badge>
                                    {event.tags.map((tag, index) => (
                                        <Badge key={index} variant="outline">
                                            {typeof tag === 'string'
                                                ? tag
                                                : tag.name}
                                        </Badge>
                                    ))}
                                </div>
                            </CardHeader>
                            <div className="m-8 flex-col text-nowrap text-center">
                                {differenceInCalendarDays(
                                    new Date(event.date),
                                    new Date(),
                                ) < 0 ? (
                                    <>
                                        <p className="text-xl">終了後</p>
                                        <p className="text-2xl">
                                            {differenceInCalendarDays(
                                                new Date(),
                                                new Date(event.date),
                                            )}
                                            日
                                        </p>
                                    </>
                                ) : differenceInCalendarDays(
                                      new Date(event.date),
                                      new Date(),
                                  ) === 0 ? (
                                    <>
                                        <p className="text-2xl">本日</p>
                                        <p className="text-2xl">開催</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-xl">あと</p>
                                        <p className="text-2xl">
                                            {differenceInCalendarDays(
                                                new Date(event.date),
                                                new Date(),
                                            )}
                                            日
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        <CardContent>
                            <div className="space-y-4">
                                {event.venue && (
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">
                                            会場
                                        </h3>
                                        <p>{event.venue}</p>
                                    </div>
                                )}
                                {event.website_url && (
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">
                                            WebサイトURL
                                        </h3>
                                        <a
                                            href={event.website_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1"
                                        >
                                            {event.website_url}
                                            <ExternalLinkIcon className="inline" />
                                        </a>
                                    </div>
                                )}
                                {event.memo && (
                                    <div>
                                        <h3 className="text-sm text-muted-foreground">
                                            メモ
                                        </h3>
                                        <p>{event.memo}</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Todo</CardTitle>
                            <CardDescription>
                                忘れちゃいけないことを管理しよう（チケット申し込みや持ち物など）
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Separator />
                            {todos.map((todo) => (
                                <Fragment key={todo.id}>
                                    <div className="flex items-center">
                                        <Checkbox
                                            className="m-2 size-5"
                                            checked={todo.done}
                                            onCheckedChange={() => {
                                                router.put(
                                                    `/events/${event.id}/todos/${todo.id}`,
                                                    {
                                                        todo: {
                                                            ...todo,
                                                            done: !todo.done,
                                                        },
                                                    },
                                                    {
                                                        onSuccess: (page) => {
                                                            setTodos(
                                                                page.props.event
                                                                    .todos,
                                                            );
                                                        },
                                                        preserveScroll: true,
                                                    },
                                                );
                                            }}
                                        />
                                        <div className="mr-auto">
                                            <div className="flex items-center gap-1">
                                                <h3>{todo.name}</h3>
                                                {todo.flag ? (
                                                    <Flag
                                                        size={20}
                                                        className="text-destructive"
                                                        onClick={() => {
                                                            router.put(
                                                                `/events/${event.id}/todos/${todo.id}`,
                                                                {
                                                                    todo: {
                                                                        ...todo,
                                                                        flag: !todo.flag,
                                                                    },
                                                                },
                                                                {
                                                                    onSuccess: (
                                                                        page,
                                                                    ) => {
                                                                        setTodos(
                                                                            page
                                                                                .props
                                                                                .event
                                                                                .todos,
                                                                        );
                                                                    },
                                                                    preserveScroll:
                                                                        true,
                                                                },
                                                            );
                                                        }}
                                                    />
                                                ) : (
                                                    <Flag
                                                        size={20}
                                                        className="text-muted-foreground/30 hover:text-destructive/70"
                                                        onClick={() => {
                                                            router.put(
                                                                `/events/${event.id}/todos/${todo.id}`,
                                                                {
                                                                    todo: {
                                                                        ...todo,
                                                                        flag: !todo.flag,
                                                                    },
                                                                },
                                                                {
                                                                    onSuccess: (
                                                                        page,
                                                                    ) => {
                                                                        setTodos(
                                                                            page
                                                                                .props
                                                                                .event
                                                                                .todos,
                                                                        );
                                                                    },
                                                                    preserveScroll:
                                                                        true,
                                                                },
                                                            );
                                                        }}
                                                    />
                                                )}

                                                {!todo.deadline && (
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <CalendarIcon className="size-5 text-muted-foreground/30 hover:text-foreground" />
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0">
                                                            <Calendar
                                                                mode="single"
                                                                selected={
                                                                    todo.deadline
                                                                }
                                                                onSelect={(
                                                                    date,
                                                                ) => {
                                                                    router.put(
                                                                        `/events/${event.id}/todos/${todo.id}`,
                                                                        {
                                                                            todo: {
                                                                                ...todo,
                                                                                deadline:
                                                                                    date,
                                                                            },
                                                                        },
                                                                        {
                                                                            onSuccess:
                                                                                (
                                                                                    page,
                                                                                ) => {
                                                                                    setTodos(
                                                                                        page
                                                                                            .props
                                                                                            .event
                                                                                            .todos,
                                                                                    );
                                                                                },
                                                                            preserveScroll:
                                                                                true,
                                                                        },
                                                                    );
                                                                }}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                )}
                                            </div>
                                            {todo.deadline && (
                                                <div>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <p className="text-muted-foreground">
                                                                {new Date(
                                                                    todo.deadline,
                                                                ).toLocaleDateString()}
                                                            </p>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0">
                                                            <Calendar
                                                                mode="single"
                                                                selected={
                                                                    new Date(
                                                                        todo.deadline,
                                                                    )
                                                                }
                                                                onSelect={(
                                                                    date,
                                                                ) => {
                                                                    router.put(
                                                                        `/events/${event.id}/todos/${todo.id}`,
                                                                        {
                                                                            todo: {
                                                                                ...todo,
                                                                                deadline:
                                                                                    date,
                                                                            },
                                                                        },
                                                                        {
                                                                            onSuccess:
                                                                                (
                                                                                    page,
                                                                                ) => {
                                                                                    setTodos(
                                                                                        page
                                                                                            .props
                                                                                            .event
                                                                                            .todos,
                                                                                    );
                                                                                },
                                                                            preserveScroll:
                                                                                true,
                                                                        },
                                                                    );
                                                                }}
                                                                initialFocus
                                                            />
                                                            <Button
                                                                variant="outline"
                                                                className="mx-3 my-2 w-56"
                                                                onClick={() => {
                                                                    router.put(
                                                                        `/events/${event.id}/todos/${todo.id}`,
                                                                        {
                                                                            todo: {
                                                                                ...todo,
                                                                                deadline:
                                                                                    null,
                                                                            },
                                                                        },
                                                                        {
                                                                            onSuccess:
                                                                                (
                                                                                    page,
                                                                                ) => {
                                                                                    setTodos(
                                                                                        page
                                                                                            .props
                                                                                            .event
                                                                                            .todos,
                                                                                    );
                                                                                },
                                                                            preserveScroll:
                                                                                true,
                                                                        },
                                                                    );
                                                                }}
                                                            >
                                                                削除
                                                            </Button>
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                            )}
                                        </div>

                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="mr-2 size-8"
                                                >
                                                    <Cross1Icon />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-2">
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => {
                                                        router.delete(
                                                            `/events/${event.id}/todos/${todo.id}`,
                                                            {
                                                                onSuccess: (
                                                                    page,
                                                                ) => {
                                                                    setTodos(
                                                                        page
                                                                            .props
                                                                            .event
                                                                            .todos,
                                                                    );
                                                                },
                                                                preserveScroll:
                                                                    true,
                                                            },
                                                        );
                                                    }}
                                                >
                                                    削除
                                                </Button>
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    <Separator />
                                </Fragment>
                            ))}

                            <div className="flex gap-2">
                                <Input
                                    placeholder="Todoを追加..."
                                    className="max-w-80"
                                    value={newTodoName}
                                    onChange={(e) =>
                                        setNewTodoName(e.target.value)
                                    }
                                />
                                <Button
                                    variant="default"
                                    onClick={() => {
                                        if (newTodoName) {
                                            router.post(
                                                `/events/${event.id}/todos`,
                                                {
                                                    todo: {
                                                        id: null,
                                                        name: newTodoName,
                                                        done: false,
                                                        deadline: null,
                                                        flag: false,
                                                    },
                                                },
                                                {
                                                    onSuccess: (page) => {
                                                        setTodos(
                                                            page.props.event
                                                                .todos,
                                                        );
                                                        setNewTodoName('');
                                                    },
                                                    preserveScroll: true,
                                                },
                                            );
                                        }
                                    }}
                                >
                                    追加
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex space-x-2">
                    <Button variant="outline" asChild className="mr-auto">
                        <Link href="/events">戻る</Link>
                    </Button>
                    <Button variant="default" asChild>
                        <Link href={`/events/${event.id}/edit`}>編集</Link>
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onEventDeleteButtonClicked}
                    >
                        削除
                    </Button>
                </div>
            </div>
        </Authenticated>
    );
};

export default Show;

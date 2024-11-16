import Authenticated from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Fragment, useState } from 'react';

import { Button } from '@/Components/ui/button';
import { Calendar } from '@/Components/ui/calendar';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import { Checkbox } from '@/Components/ui/checkbox';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/Components/ui/popover';
import { Separator } from '@/Components/ui/separator';
import { CalendarIcon, Cross1Icon } from '@radix-ui/react-icons';
import { Flag } from 'lucide-react';

import { Switch } from '@/Components/ui/switch';
import { Todo } from '@/types/Todo';

const Index = (props: { auth: { user: User }; todos: Todo[] }) => {
    // 表示するTodoのリスト
    const [todos, setTodos] = useState(props.todos);

    // フラグ付きのみ表示するかどうか
    const [isOnlyFlagged, setIsOnlyFlagged] = useState(false);
    // フィルタされたTodoのリスト
    const [filteredTodos, setFilteredTodos] = useState(todos);

    return (
        <Authenticated>
            <div className="mx-auto my-4 max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
                <div className="flex h-10 items-center">
                    <div className="mr-auto text-2xl">
                        <h1>Todo一覧</h1>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        追加は各イベントの詳細ページから
                    </p>
                </div>
                <div className="space-y-4">
                    <div>
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <p>フラグ付きのみ表示する</p>
                                    <Switch
                                        checked={isOnlyFlagged}
                                        onCheckedChange={(checked) => {
                                            setIsOnlyFlagged(checked);
                                            if (checked) {
                                                setFilteredTodos(
                                                    todos.filter(
                                                        (todo) =>
                                                            todo.flag === true,
                                                    ),
                                                );
                                            } else {
                                                setFilteredTodos(todos);
                                            }
                                        }}
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Separator />
                                {filteredTodos.map((todo) => (
                                    <Fragment key={todo.id}>
                                        <div className="flex items-center">
                                            <Checkbox
                                                className="m-2 size-5"
                                                checked={todo.done}
                                                onCheckedChange={() => {
                                                    router.put(
                                                        `/events/${todo.event_id}/todos/${todo.id}`,
                                                        {
                                                            todo: {
                                                                ...todo,
                                                                done: !todo.done,
                                                            },
                                                            from: route().current(),
                                                        },
                                                        {
                                                            onSuccess: (
                                                                page,
                                                            ) => {
                                                                setTodos(
                                                                    page.props
                                                                        .todos as Todo[],
                                                                );
                                                                if (
                                                                    isOnlyFlagged
                                                                ) {
                                                                    setFilteredTodos(
                                                                        (
                                                                            page
                                                                                .props
                                                                                .todos as Todo[]
                                                                        ).filter(
                                                                            (
                                                                                todo,
                                                                            ) =>
                                                                                todo.flag ===
                                                                                true,
                                                                        ),
                                                                    );
                                                                } else {
                                                                    setFilteredTodos(
                                                                        page
                                                                            .props
                                                                            .todos as Todo[],
                                                                    );
                                                                }
                                                            },
                                                            preserveScroll:
                                                                true,
                                                        },
                                                    );
                                                }}
                                            />
                                            <div className="mr-auto">
                                                <div>
                                                    <Link
                                                        href={`/events/${todo.event_id}`}
                                                    >
                                                        <p className="text-sm text-muted-foreground">
                                                            {todo.event.name}
                                                        </p>
                                                    </Link>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <h3>{todo.name}</h3>
                                                    {todo.flag ? (
                                                        <Flag
                                                            size={20}
                                                            className="text-destructive"
                                                            onClick={() => {
                                                                router.put(
                                                                    `/events/${todo.event_id}}/todos/${todo.id}`,
                                                                    {
                                                                        todo: {
                                                                            ...todo,
                                                                            flag: !todo.flag,
                                                                        },
                                                                        from: route().current(),
                                                                    },
                                                                    {
                                                                        onSuccess:
                                                                            (
                                                                                page,
                                                                            ) => {
                                                                                setTodos(
                                                                                    page
                                                                                        .props
                                                                                        .todos as Todo[],
                                                                                );
                                                                                if (
                                                                                    isOnlyFlagged
                                                                                ) {
                                                                                    setFilteredTodos(
                                                                                        (
                                                                                            page
                                                                                                .props
                                                                                                .todos as Todo[]
                                                                                        ).filter(
                                                                                            (
                                                                                                todo,
                                                                                            ) =>
                                                                                                todo.flag ===
                                                                                                true,
                                                                                        ),
                                                                                    );
                                                                                } else {
                                                                                    setFilteredTodos(
                                                                                        page
                                                                                            .props
                                                                                            .todos as Todo[],
                                                                                    );
                                                                                }
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
                                                                    `/events/${todo.event_id}}/todos/${todo.id}`,
                                                                    {
                                                                        todo: {
                                                                            ...todo,
                                                                            flag: !todo.flag,
                                                                        },
                                                                        from: route().current(),
                                                                    },
                                                                    {
                                                                        onSuccess:
                                                                            (
                                                                                page,
                                                                            ) => {
                                                                                setTodos(
                                                                                    page
                                                                                        .props
                                                                                        .todos as Todo[],
                                                                                );
                                                                                if (
                                                                                    isOnlyFlagged
                                                                                ) {
                                                                                    setFilteredTodos(
                                                                                        (
                                                                                            page
                                                                                                .props
                                                                                                .todos as Todo[]
                                                                                        ).filter(
                                                                                            (
                                                                                                todo,
                                                                                            ) =>
                                                                                                todo.flag ===
                                                                                                true,
                                                                                        ),
                                                                                    );
                                                                                } else {
                                                                                    setFilteredTodos(
                                                                                        page
                                                                                            .props
                                                                                            .todos as Todo[],
                                                                                    );
                                                                                }
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
                                                            <PopoverTrigger
                                                                asChild
                                                            >
                                                                <CalendarIcon className="size-5 text-muted-foreground/30 hover:text-foreground" />
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={
                                                                        todo.deadline as unknown as Date
                                                                    }
                                                                    onSelect={(
                                                                        date,
                                                                    ) => {
                                                                        router.put(
                                                                            `/events/${todo.event_id}}/todos/${todo.id}`,
                                                                            {
                                                                                todo: {
                                                                                    ...todo,
                                                                                    deadline:
                                                                                        date,
                                                                                },
                                                                                from: route().current(),
                                                                            },
                                                                            {
                                                                                onSuccess:
                                                                                    (
                                                                                        page,
                                                                                    ) => {
                                                                                        setTodos(
                                                                                            page
                                                                                                .props
                                                                                                .todos as Todo[],
                                                                                        );
                                                                                        if (
                                                                                            isOnlyFlagged
                                                                                        ) {
                                                                                            setFilteredTodos(
                                                                                                (
                                                                                                    page
                                                                                                        .props
                                                                                                        .todos as Todo[]
                                                                                                ).filter(
                                                                                                    (
                                                                                                        todo,
                                                                                                    ) =>
                                                                                                        todo.flag ===
                                                                                                        true,
                                                                                                ),
                                                                                            );
                                                                                        } else {
                                                                                            setFilteredTodos(
                                                                                                page
                                                                                                    .props
                                                                                                    .todos as Todo[],
                                                                                            );
                                                                                        }
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
                                                            <PopoverTrigger
                                                                asChild
                                                            >
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
                                                                            `/events/${todo.event_id}}/todos/${todo.id}`,
                                                                            {
                                                                                todo: {
                                                                                    ...todo,
                                                                                    deadline:
                                                                                        date,
                                                                                },
                                                                                from: route().current(),
                                                                            },
                                                                            {
                                                                                onSuccess:
                                                                                    (
                                                                                        page,
                                                                                    ) => {
                                                                                        setTodos(
                                                                                            page
                                                                                                .props
                                                                                                .todos as Todo[],
                                                                                        );
                                                                                        if (
                                                                                            isOnlyFlagged
                                                                                        ) {
                                                                                            setFilteredTodos(
                                                                                                (
                                                                                                    page
                                                                                                        .props
                                                                                                        .todos as Todo[]
                                                                                                ).filter(
                                                                                                    (
                                                                                                        todo,
                                                                                                    ) =>
                                                                                                        todo.flag ===
                                                                                                        true,
                                                                                                ),
                                                                                            );
                                                                                        } else {
                                                                                            setFilteredTodos(
                                                                                                page
                                                                                                    .props
                                                                                                    .todos as Todo[],
                                                                                            );
                                                                                        }
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
                                                                            `/events/${todo.event_id}}/todos/${todo.id}`,
                                                                            {
                                                                                todo: {
                                                                                    ...todo,
                                                                                    deadline:
                                                                                        null,
                                                                                },
                                                                                from: route().current(),
                                                                            },
                                                                            {
                                                                                onSuccess:
                                                                                    (
                                                                                        page,
                                                                                    ) => {
                                                                                        setTodos(
                                                                                            page
                                                                                                .props
                                                                                                .todos as Todo[],
                                                                                        );
                                                                                        if (
                                                                                            isOnlyFlagged
                                                                                        ) {
                                                                                            setFilteredTodos(
                                                                                                (
                                                                                                    page
                                                                                                        .props
                                                                                                        .todos as Todo[]
                                                                                                ).filter(
                                                                                                    (
                                                                                                        todo,
                                                                                                    ) =>
                                                                                                        todo.flag ===
                                                                                                        true,
                                                                                                ),
                                                                                            );
                                                                                        } else {
                                                                                            setFilteredTodos(
                                                                                                page
                                                                                                    .props
                                                                                                    .todos as Todo[],
                                                                                            );
                                                                                        }
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
                                                            router.visit(
                                                                `/events/${todo.event_id}}/todos/${todo.id}`,
                                                                {
                                                                    method: 'delete',
                                                                    data: {
                                                                        from: route().current(),
                                                                    },
                                                                    onSuccess: (
                                                                        page,
                                                                    ) => {
                                                                        setTodos(
                                                                            page
                                                                                .props
                                                                                .todos as Todo[],
                                                                        );
                                                                        if (
                                                                            isOnlyFlagged
                                                                        ) {
                                                                            setFilteredTodos(
                                                                                (
                                                                                    page
                                                                                        .props
                                                                                        .todos as Todo[]
                                                                                ).filter(
                                                                                    (
                                                                                        todo,
                                                                                    ) =>
                                                                                        todo.flag ===
                                                                                        true,
                                                                                ),
                                                                            );
                                                                        } else {
                                                                            setFilteredTodos(
                                                                                page
                                                                                    .props
                                                                                    .todos as Todo[],
                                                                            );
                                                                        }
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
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;

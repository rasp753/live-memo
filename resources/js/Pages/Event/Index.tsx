import Authenticated from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { Link, router } from '@inertiajs/react';
import { differenceInCalendarDays } from 'date-fns';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';

import { Input } from '@/Components/ui/input';
import { Event } from '@/types/Event';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

const Index = (props: {
    auth: { user: User };
    events: Event[];
    keyword: string;
}) => {
    const [events, setEvents] = useState<Event[]>(props.events);
    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');
    const [isShowingUpcomingEvents, setIsShowingUpcomingEvents] =
        useState(true);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>(
        isShowingUpcomingEvents
            ? events
                  .filter((event) => {
                      return (
                          differenceInCalendarDays(
                              new Date(event.date),
                              new Date(),
                          ) >= 0
                      );
                  })
                  .toReversed()
            : events.filter((event) => {
                  return (
                      differenceInCalendarDays(
                          new Date(event.date),
                          new Date(),
                      ) < 0
                  );
              }),
    );

    console.log(props);

    const searchEvents = useDebouncedCallback((keyword: string) => {
        router.get(
            '/events/search',
            { keyword: keyword },
            {
                onSuccess: (page) => {
                    setEvents(page.props.events);
                },
                preserveState: true,
            },
        );
    }, 500);

    return (
        <Authenticated>
            <div className="mx-auto my-4 max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
                <div className="flex h-10 items-center">
                    <div className="mr-auto text-2xl">
                        <h1>イベント一覧</h1>
                    </div>
                    <Button asChild>
                        <Link href="/events/create">新規イベント</Link>
                    </Button>
                </div>
                <div>
                    <div className="flex items-center">
                        <MagnifyingGlassIcon className="size-8" />
                        <Input
                            placeholder="検索..."
                            value={keyword}
                            onChange={(e) => {
                                setKeyword(e.target.value);
                                searchEvents(e.target.value);
                            }}
                        />
                    </div>
                    <p className="ml-10 text-sm text-muted-foreground">
                        半角スペース区切りでAND検索, #タグ名でタグ検索,
                        @会場名で会場名検索, type:種類で種類検索(live,
                        exhibition, cafe, goods)
                    </p>
                </div>
                <div className="ml-8 flex gap-8">
                    {isShowingUpcomingEvents ? (
                        <>
                            <p>開催前・当日</p>
                            <p
                                className="text-muted-foreground"
                                onClick={() => {
                                    setIsShowingUpcomingEvents(false);
                                    setFilteredEvents(
                                        events.filter((event) => {
                                            return (
                                                differenceInCalendarDays(
                                                    new Date(event.date),
                                                    new Date(),
                                                ) < 0
                                            );
                                        }),
                                    );
                                }}
                            >
                                開催後
                            </p>
                        </>
                    ) : (
                        <>
                            <p
                                className="text-muted-foreground"
                                onClick={() => {
                                    setIsShowingUpcomingEvents(true);
                                    setFilteredEvents(
                                        events
                                            .filter((event) => {
                                                return (
                                                    differenceInCalendarDays(
                                                        new Date(event.date),
                                                        new Date(),
                                                    ) >= 0
                                                );
                                            })
                                            .toReversed(),
                                    );
                                }}
                            >
                                開催前・当日
                            </p>
                            <p>開催後</p>
                        </>
                    )}
                </div>
                <div className="space-y-2">
                    {filteredEvents.map((event) => (
                        <div key={event.id}>
                            <Link href={`/events/${event.id}`}>
                                <Card>
                                    <div className="flex items-center">
                                        <CardHeader className="mr-auto">
                                            <CardTitle>{event.name}</CardTitle>
                                            <CardDescription>
                                                {new Date(
                                                    event.date,
                                                ).toLocaleDateString()}
                                            </CardDescription>
                                            <div className="flex flex-wrap gap-2">
                                                <Badge
                                                    variant="default"
                                                    onClick={() => {
                                                        setKeyword(event.type);
                                                        return false;
                                                    }}
                                                >
                                                    {event.type}
                                                </Badge>
                                                {event.tags.map(
                                                    (tag, index) => (
                                                        <Badge
                                                            key={index}
                                                            variant="outline"
                                                        >
                                                            {typeof tag ===
                                                            'string'
                                                                ? tag
                                                                : tag.name}
                                                        </Badge>
                                                    ),
                                                )}
                                            </div>
                                        </CardHeader>
                                        <div className="m-8 w-16 flex-col text-nowrap text-center">
                                            {differenceInCalendarDays(
                                                new Date(event.date),
                                                new Date(),
                                            ) < 0 ? (
                                                <>
                                                    <p className="text-xl">
                                                        終了後
                                                    </p>
                                                    <p className="text-2xl">
                                                        {differenceInCalendarDays(
                                                            new Date(),
                                                            new Date(
                                                                event.date,
                                                            ),
                                                        )}
                                                        日
                                                    </p>
                                                </>
                                            ) : differenceInCalendarDays(
                                                  new Date(event.date),
                                                  new Date(),
                                              ) === 0 ? (
                                                <>
                                                    <p className="text-2xl">
                                                        本日
                                                    </p>
                                                    <p className="text-2xl">
                                                        開催
                                                    </p>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-xl">
                                                        あと
                                                    </p>
                                                    <p className="text-2xl">
                                                        {differenceInCalendarDays(
                                                            new Date(
                                                                event.date,
                                                            ),
                                                            new Date(),
                                                        )}
                                                        日
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;

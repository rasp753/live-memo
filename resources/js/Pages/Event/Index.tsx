import Authenticated from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { differenceInCalendarDays } from 'date-fns';

import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';

import { Event } from '@/types/Event';

const Index = (props: { auth: { user: User }; events: Event[] }) => {
    const { events } = props;

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
                <div className="space-y-2">
                    {events.map((event) => (
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
                                                <Badge variant="default">
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

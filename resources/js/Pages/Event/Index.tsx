import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';

import Authenticated from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { Link } from '@inertiajs/react';

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
                                    <CardHeader>
                                        <CardTitle>{event.name}</CardTitle>
                                        <CardDescription>
                                            {new Date(
                                                event.date,
                                            ).toLocaleString()}
                                        </CardDescription>
                                        <div className="flex gap-2">
                                            <Badge variant="default">
                                                {event.type}
                                            </Badge>
                                            {event.tags.map((tag, index) => (
                                                <Badge
                                                    key={index}
                                                    variant="outline"
                                                >
                                                    {typeof tag === 'string'
                                                        ? tag
                                                        : tag.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardHeader>
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

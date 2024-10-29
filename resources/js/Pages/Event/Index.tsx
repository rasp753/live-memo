import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import Authenticated from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { Link } from '@inertiajs/react';

import { Event } from '@/types/Event';

const Index = (props: { auth: { user: User }; events: Event[] }) => {
    const { events } = props;
    console.log(events);

    return (
        <Authenticated>
            <div className="m-4 space-y-4">
                <div className="flex justify-end">
                    <h1>イベント一覧</h1>
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
                                        <div>
                                            <Badge variant="outline">
                                                {event.type}
                                            </Badge>
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

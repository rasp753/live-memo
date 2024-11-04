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
import { Link, router } from '@inertiajs/react';

import { Event } from '@/types/Event';

const Show = (props: { auth: { user: User }; event: Event }) => {
    const { event } = props;
    console.log(event);

    const handleDeleteEvent = () => {
        router.delete(`/events/${event.id}`);
    };

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
                        <CardHeader>
                            <CardTitle>{event.name}</CardTitle>
                            <CardDescription>
                                {new Date(event.date).toLocaleString()}
                            </CardDescription>
                            <div className="flex gap-1">
                                <Badge variant="default">{event.type}</Badge>
                                {event.tags.map((tag, index) => (
                                    <Badge key={index} variant="outline">
                                        {typeof tag === 'string'
                                            ? tag
                                            : tag.name}
                                    </Badge>
                                ))}
                            </div>
                        </CardHeader>
                    </Card>
                </div>
                <div className="flex space-x-2">
                    <Button variant="outline" asChild className="mr-auto">
                        <Link href="/events">戻る</Link>
                    </Button>
                    <Button variant="default" asChild>
                        <Link href={`/events/${event.id}/edit`}>編集</Link>
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteEvent}>
                        削除
                    </Button>
                </div>
            </div>
        </Authenticated>
    );
};

export default Show;

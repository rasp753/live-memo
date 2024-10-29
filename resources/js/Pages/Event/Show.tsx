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
            <div className="m-4 space-y-4">
                <div>
                    <h1>イベント詳細</h1>
                </div>
                <div className="space-y-2">
                    <Card key={event.id}>
                        <CardHeader>
                            <CardTitle>{event.name}</CardTitle>
                            <CardDescription>
                                {new Date(event.date).toLocaleString()}
                            </CardDescription>
                            <div>
                                <Badge variant="outline">{event.type}</Badge>
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

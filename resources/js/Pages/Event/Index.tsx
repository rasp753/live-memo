import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import Authenticated from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';

const Index = (props: { auth: { user: User } }) => {
    return (
        <Authenticated>
            <div className="m-4 space-y-4">
                <div className="flex justify-end">
                    <Button>新規イベント</Button>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>マジカルミライ2024</CardTitle>
                            <CardDescription>
                                2024/10/12 ~ 2024/10/14
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <Badge variant="outline">ライブ</Badge>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;

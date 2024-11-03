import Authenticated from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as inertiaUseForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/Components/ui/button';
import { Calendar } from '@/Components/ui/calendar';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/Components/ui/command';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/Components/ui/popover';
import { Textarea } from '@/Components/ui/textarea';
import { cn } from '@/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { EventSchema, eventTypes } from '@/types/Event';

const Create = (props: {
    auth: { user: User };
    errors: Record<string, string>;
}) => {
    const { setData, post } = inertiaUseForm();
    const form = useForm({
        resolver: zodResolver(EventSchema),
        defaultValues: {
            name: '',
            date: new Date(),
            type: '',
            venue: '',
            websiteUrl: '',
            memo: '',
        },
    });

    function onSubmit(values: z.infer<typeof EventSchema>) {
        console.log(values);
        setData(values);
        post('/events');
    }

    return (
        <Authenticated>
            <div className="mx-auto my-4 max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
                <div className="flex h-10 items-center">
                    <div className="text-2xl">
                        <h1>新規イベント作成</h1>
                    </div>
                </div>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>イベント名</FormLabel>
                                        <Input
                                            placeholder="イベント名"
                                            {...field}
                                        />
                                        <FormDescription>
                                            イベント名を入力してください
                                        </FormDescription>
                                        <FormMessage />
                                        <span className="text-red-600">
                                            {props.errors.name}
                                        </span>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>開催日</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={'outline'}
                                                    className={cn(
                                                        'w-[280px] justify-start text-left font-normal',
                                                        !field.value &&
                                                            'text-muted-foreground',
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            'PPP',
                                                        )
                                                    ) : (
                                                        <span>日付を選択</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            日付を入力してください
                                        </FormDescription>
                                        <FormMessage />
                                        <span className="text-red-600">
                                            {props.errors.date}
                                        </span>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>イベントのタイプ</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            'w-[200px] justify-between',
                                                            !field.value &&
                                                                'text-muted-foreground',
                                                        )}
                                                    >
                                                        {field.value
                                                            ? eventTypes.find(
                                                                  (type) =>
                                                                      type.value ===
                                                                      field.value,
                                                              )?.label
                                                            : '種類を選択'}
                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput
                                                        placeholder="種類を検索..."
                                                        className="h-9"
                                                    />
                                                    <CommandList>
                                                        <CommandEmpty>
                                                            種類が見つかりません
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            {eventTypes.map(
                                                                (type) => (
                                                                    <CommandItem
                                                                        value={
                                                                            type.label
                                                                        }
                                                                        key={
                                                                            type.value
                                                                        }
                                                                        onSelect={() => {
                                                                            form.setValue(
                                                                                'type',
                                                                                type.value,
                                                                            );
                                                                        }}
                                                                    >
                                                                        {
                                                                            type.label
                                                                        }
                                                                        <CheckIcon
                                                                            className={cn(
                                                                                'ml-auto h-4 w-4',
                                                                                type.value ===
                                                                                    field.value
                                                                                    ? 'opacity-100'
                                                                                    : 'opacity-0',
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ),
                                                            )}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            イベントの種類を選択してください
                                        </FormDescription>
                                        <FormMessage />
                                        <span className="text-red-600">
                                            {props.errors.type}
                                        </span>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="venue"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>開催場所</FormLabel>
                                        <Input
                                            placeholder="開催場所"
                                            {...field}
                                        />

                                        <FormDescription>
                                            イベントが開催される場所を入力してください
                                        </FormDescription>
                                        <FormMessage />
                                        <span className="text-red-600">
                                            {props.errors.venue}
                                        </span>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="websiteUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>WebサイトURLなど</FormLabel>
                                        <Input
                                            placeholder="WebサイトURL"
                                            {...field}
                                        />

                                        <FormDescription>
                                            WebサイトURLなどを入力してください
                                        </FormDescription>
                                        <FormMessage />
                                        <span className="text-red-600">
                                            {props.errors.website_url}
                                        </span>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="memo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>メモ</FormLabel>
                                        <Textarea
                                            placeholder="メモ"
                                            className="resize-none"
                                            {...field}
                                        />
                                        <FormDescription>
                                            メモを入力してください
                                        </FormDescription>
                                        <FormMessage />
                                        <span className="text-red-600">
                                            {props.errors.memo}
                                        </span>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </Authenticated>
    );
};

export default Create;

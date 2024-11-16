import Authenticated from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Badge } from '@/Components/ui/badge';
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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/Components/ui/popover';
import { Textarea } from '@/Components/ui/textarea';
import { cn } from '@/lib/utils';
import { CaretSortIcon, CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Event, EventSchema, eventTypes } from '@/types/Event';

const Edit = (props: {
    auth: { user: User };
    errors: Record<string, string>;
    event: Event;
}) => {
    // 編集するイベントのデータ
    const { event } = props;

    ///
    /// フォーム関連処理
    ///

    // フォームの初期値とバリデーションスキーマを設定
    const form = useForm({
        resolver: zodResolver(EventSchema),
        defaultValues: {
            name: event.name,
            date: event.date ? new Date(event.date) : new Date(),
            type: event.type,
            venue: event.venue ? event.venue : '',
            website_url: event.website_url ? event.website_url : '',
            memo: event.memo ? event.memo : '',
        },
    });
    // フォームの送信処理
    function onSubmit(values: z.infer<typeof EventSchema>) {
        const data = { ...values, tags };
        router.put(`/events/${event.id}`, data);
    }

    ///
    /// タグ関連処理
    ///

    // タグ入力欄でEnterキーが押されたときの処理
    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        // 変換中以外でEnterキーが押された場合のみ処理を実行
        if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
            event.preventDefault();
            addTag(event);
        }
    }
    // タグを追加する処理
    function addTag(event: React.KeyboardEvent<HTMLInputElement>) {
        const input = event.target as HTMLInputElement;
        const value = input.value.toUpperCase();
        if (!value) return;
        if (tags.includes(value)) {
            setTagInputErrorMessage('タグが重複しています');
            return;
        }
        setTags([...tags, value]);
        input.value = '';
        setTagInputErrorMessage('');
    }
    // タグ一覧State
    const [tags, setTags] = useState<string[]>(
        event.tags.map((tag) => (typeof tag === 'string' ? tag : tag.name)),
    );
    // タグ入力エラーメッセージState
    const [tagInputErrorMessage, setTagInputErrorMessage] = useState('');

    return (
        <Authenticated>
            <div className="mx-auto my-4 max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
                <div className="flex h-10 items-center">
                    <div className="mr-auto text-2xl">
                        <h1>イベント編集</h1>
                    </div>
                </div>
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
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
                                        <FormMessage />
                                        <span className="text-red-600">
                                            {props.errors.name}
                                        </span>
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-2">
                                <Label className="block" htmlFor="tags">
                                    タグ
                                </Label>
                                <div
                                    id="tags"
                                    className="flex flex-wrap items-center gap-2"
                                >
                                    {tags.map((tag, index) => (
                                        <Badge
                                            key={index}
                                            variant="outline"
                                            className=""
                                        >
                                            <Button
                                                variant="ghost"
                                                className="mr-1 h-4 p-0"
                                                onClick={() => {
                                                    console.log(tag);
                                                    setTags(
                                                        tags.filter(
                                                            (t) => t !== tag,
                                                        ),
                                                    );
                                                }}
                                            >
                                                <Cross2Icon className="" />
                                            </Button>
                                            {tag}
                                        </Badge>
                                    ))}
                                    <Input
                                        className="inline-block w-60"
                                        placeholder="タグを追加"
                                        onKeyDown={handleKeyDown}
                                    />
                                    <span className="text-sm text-destructive">
                                        {tagInputErrorMessage}
                                    </span>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    小文字は大文字に変換されます
                                </span>
                            </div>

                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="space-x-4">
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
                                                            <span>
                                                                日付を選択
                                                            </span>
                                                        )}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={
                                                            field.onChange
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
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
                                        <div className="space-x-4">
                                            <FormLabel>
                                                イベントのタイプ
                                            </FormLabel>
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
                                        </div>
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
                                        <FormMessage />
                                        <span className="text-red-600">
                                            {props.errors.venue}
                                        </span>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="website_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>WebサイトURLなど</FormLabel>
                                        <Input
                                            placeholder="WebサイトURL"
                                            {...field}
                                        />
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
                                        <FormMessage />
                                        <span className="text-red-600">
                                            {props.errors.memo}
                                        </span>
                                    </FormItem>
                                )}
                            />
                            <div className="flex">
                                <Button
                                    variant="outline"
                                    className="mr-auto"
                                    asChild
                                >
                                    <Link href={`/events/${event.id}`}>
                                        戻る
                                    </Link>
                                </Button>
                                <Button type="submit">完了</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Authenticated>
    );
};

export default Edit;

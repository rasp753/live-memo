import { z } from 'zod';
import { Todo } from './Todo';

// イベントの型定義
export type Event = {
    id: number;
    name: string;
    date: Date;
    type: string;
    venue: string;
    website_url: string;
    memo: string;
    tags: string[] | { name: string }[];
    todos: Todo[];
};

// イベント入力フォームのスキーマ
export const EventSchema = z.object({
    name: z.string().min(1, { message: 'イベント名を入力してください' }),
    date: z.date().optional(),
    type: z.string().min(1, { message: 'イベントの種類を選択してください' }),
    venue: z.string().optional(),
    website_url: z.string().optional(),
    memo: z.string().optional(),
});

// イベントの種類
export const eventTypes = [
    { label: 'ライブ', value: 'live' },
    { label: '展示', value: 'exhibition' },
    { label: 'コラボカフェ', value: 'cafe' },
    { label: 'グッズストア', value: 'goods' },
];

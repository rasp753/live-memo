export type Todo = {
    id: number;
    user_id: number;
    event_id: number;
    name: string;
    done: boolean;
    deadline: Date | null;
    flag: boolean;
    memo: string | null;
}

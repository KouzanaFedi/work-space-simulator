import { TodoItemChild } from './TodoItemChild';

export interface TodoItem extends TodoItemChild {
    children: TodoItemChild[]
}


import TodoItemChild from './TodoItemChild';

export default interface TodoItem extends TodoItemChild {
    children: TodoItemChild[]
}


export interface ToDoItemModel {
    id: number;
    title: string;
    description: string;
    endDate: string;
    priority: string;
    status: ToDoStatus;
}

export interface CategorizedToDoItems {
    todoItems: ToDoItemModel[];
    doingItems: ToDoItemModel[];
    doneItems: ToDoItemModel[];
}

export type ToDoStatus = 'todo' | 'doing' | 'done';

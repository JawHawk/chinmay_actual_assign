export type ToDoStatus = 'todo' | 'doing' | 'done';

export type ToDoPriority = 'high' | 'medium' | 'low';

export interface ToDoItemModel {
    id: number;
    title: string;
    description: string;
    endDate: string;
    priority: ToDoPriority;
    status: ToDoStatus;
}

export interface CategorizedToDoItems {
    todoItems: ToDoItemModel[];
    doingItems: ToDoItemModel[];
    doneItems: ToDoItemModel[];
}

export interface ToDoItemUpdateModel extends ToDoItemModel {
    newStatus: ToDoStatus;
}

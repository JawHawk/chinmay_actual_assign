export interface ToDoItemModel {
    id: number;
    title: string;
    description: string;
    endDate: string;
    priority: string;
    status: 'todo' | 'doing' | 'done';
}

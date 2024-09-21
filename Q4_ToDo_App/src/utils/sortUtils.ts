import { ToDoItemModel } from '../models/ToDoItemModel';

export const sortByPriority = (items: ToDoItemModel[]): ToDoItemModel[] => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return items.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
};

export const sortByDueDate = (items: ToDoItemModel[]): ToDoItemModel[] => {
    return items.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
};

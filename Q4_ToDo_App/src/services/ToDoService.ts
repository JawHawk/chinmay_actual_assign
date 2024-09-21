import { CategorizedToDoItems, ToDoItemModel } from "../models/ToDoItemModel";
import { getInitialData, saveData } from "../utils/storage";

let items: ToDoItemModel[] = getInitialData();

export const getItems = (): CategorizedToDoItems => {
    return {
        todoItems: items.filter(item => item.status === 'todo'),
        doingItems: items.filter(item => item.status === 'doing'),
        doneItems: items.filter(item => item.status === 'done'),
    };
};

export const addItem = (item: ToDoItemModel): void => {
    items.push(item);
    saveData(items);
};

export const deleteItem = (id: number): void => {
    items = items.filter(item => item.id !== id);
    saveData(items);
};

export const markAsComplete = (id: number): void => {
    const item = items.find(item => item.id === id);
    if (item) {
        item.status = 'done';
        saveData(items);
    }
};

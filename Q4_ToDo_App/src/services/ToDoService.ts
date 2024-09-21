import { CategorizedToDoItems, ToDoItemModel } from "../models/ToDoItemModel";
import { sortByDueDate, sortByPriority } from "../utils/sortUtils";
import { getInitialData, saveData } from "../utils/storage";

let items: CategorizedToDoItems = categorizeItems(getInitialData());

function categorizeItems(data: ToDoItemModel[]): CategorizedToDoItems {
    return {
        todoItems: data.filter(item => item.status === 'todo'),
        doingItems: data.filter(item => item.status === 'doing'),
        doneItems: data.filter(item => item.status === 'done'),
    };
}

function getStatusKey(status: string): keyof CategorizedToDoItems {
    if (status === 'todo') return 'todoItems';
    if (status === 'doing') return 'doingItems';
    if (status === 'done') return 'doneItems';
    throw new Error(`Unknown status: ${status}`);
}

export const getItems = (status?: string, sortBy?: string): CategorizedToDoItems => {
    let todoItems = items.todoItems;
    let doingItems = items.doingItems;
    let doneItems = items.doneItems;

    const applySort = (itemsList: ToDoItemModel[], sortBy: string): ToDoItemModel[] => {
        if (sortBy === "1") {
            return sortByPriority(itemsList);
        } else if (sortBy === "2") {
            return sortByDueDate(itemsList);
        } else {
            return itemsList.sort((a, b) => a.id - b.id); // Sort by id (Date.now())
        }
    };

    if (status) {
        if (status === 'todo') {
            todoItems = applySort(todoItems, sortBy || '0');
        } else if (status === 'doing') {
            doingItems = applySort(doingItems, sortBy || '0');
        } else if (status === 'done') {
            doneItems = applySort(doneItems, sortBy || '0');
        }
    } else {
        todoItems = applySort(todoItems, '0');
        doingItems = applySort(doingItems, '0');
        doneItems = applySort(doneItems, '0');
    }

    return {
        todoItems,
        doingItems,
        doneItems,
    };
};

export const addItem = (item: ToDoItemModel): void => {
    const statusKey = getStatusKey(item.status);
    items[statusKey].push(item);
    saveData([...items.todoItems, ...items.doingItems, ...items.doneItems]);
};

export const deleteItem = (id: number): void => {
    for (const statusKey of Object.keys(items) as (keyof CategorizedToDoItems)[]) {
        items[statusKey] = items[statusKey].filter(item => item.id !== id);
    }
    saveData([...items.todoItems, ...items.doingItems, ...items.doneItems]);
};

export const updateItem = (updatedItem: ToDoItemModel): void => {
    const oldStatusKey = getStatusKey(updatedItem.status);

    const index = items[oldStatusKey].findIndex(item => item.id === updatedItem.id);
    if (index > -1) {
        items[oldStatusKey][index] = { ...updatedItem };
        saveData([...items.todoItems, ...items.doingItems, ...items.doneItems]);
    }
};

export const markAsComplete = (id: number): void => {
    let item: ToDoItemModel | undefined;

    for (const statusKey of Object.keys(items) as (keyof CategorizedToDoItems)[]) {
        item = items[statusKey].find(i => i.id === id);
        if (item) {
            items[statusKey] = items[statusKey].filter(i => i.id !== id);
            break;
        }
    }

    if (item) {
        item.status = 'done';
        items['doneItems'].push(item);
        saveData([...items.todoItems, ...items.doingItems, ...items.doneItems]);
    }
};

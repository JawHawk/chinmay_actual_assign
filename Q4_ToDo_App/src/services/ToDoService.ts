import { CategorizedToDoItems, ToDoItemModel, ToDoItemUpdateModel } from "../models/ToDoItemModel";
import { sortByDueDate, sortByPriority } from "../utils/sortUtils";
import { getInitialData, saveData } from "../utils/storage";
import data from '../../data/todo.json';
import { renderToDoList } from "../components/ToDoList";

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

export const updateItem = (updatedItem: ToDoItemUpdateModel): void => {
    const oldStatusKey = getStatusKey(updatedItem.status);
    const newStatusKey = getStatusKey(updatedItem.newStatus);
    
    // If the status hasn't changed, just update the item
    if (updatedItem.status === updatedItem.newStatus) {
        const index = items[oldStatusKey].findIndex(item => item.id === updatedItem.id);
        if (index > -1) {
            items[oldStatusKey][index] = { ...updatedItem }; // Update the existing item
            saveData([...items.todoItems, ...items.doingItems, ...items.doneItems]);
        }
        return;
    }

    // Remove the item from the old status array
    const oldIndex = items[oldStatusKey].findIndex(item => item.id === updatedItem.id);
    if (oldIndex > -1) {
        const [item] = items[oldStatusKey].splice(oldIndex, 1); 

        let newItem: ToDoItemModel = {...item, ...updatedItem, status: updatedItem.newStatus}
        // Add the item to the new status array
        items[newStatusKey].push(newItem);
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

export const resetItems = (): void => {
    items = categorizeItems(data as ToDoItemModel[]);
    saveData(data as ToDoItemModel[]);
}

export const downloadJSON = (): void => {
    // Combine all items into a single array
    const allItems = [
        ...items.todoItems,
        ...items.doingItems,
        ...items.doneItems
    ];

    // Convert the array to JSON
    const json = JSON.stringify(allItems, null, 2);

    // Create a Blob and a link to download the file
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'todo_items.json'; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up the URL object
}

export const uploadJSON = (event: Event): void => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target?.result as string);
                console.log(json);
                if (Array.isArray(json)) {
                    items = categorizeItems(json);
                    saveData(json); // Save to localStorage
                    renderToDoList();
                } else {
                    alert("Uploaded JSON must be an array of to-do items.");
                }
            } catch (error) {
                alert("Error parsing JSON: " + (error as any).message);
            }
        };

        reader.readAsText(file);
    }
}



import { renderToDoItem } from './ToDoItem';
import { ToDoItemModel } from '../models/ToDoItemModel';
import { getItems } from '../services/ToDoService';

// Main Function that renders each status List with the To Do Items 
export const renderToDoList = (status?: string, sortBy?: string): void => {
    const { todoItems, doingItems, doneItems } = getItems(status, sortBy);

    const todoColumn = document.getElementById('task-todo-column');
    const doingColumn = document.getElementById('task-doing-column');
    const doneColumn = document.getElementById('task-done-column');

    if (!todoColumn || !doingColumn || !doneColumn) {
        console.error("One or more columns are missing in the DOM.");
        return;
    }

    todoColumn.innerHTML = '';
    doingColumn.innerHTML = '';
    doneColumn.innerHTML = '';

    todoItems.forEach(item => renderToDoItem(todoColumn, { item }));
    doingItems.forEach(item => renderToDoItem(doingColumn, { item }));
    doneItems.forEach(item => renderToDoItem(doneColumn, { item }));
};

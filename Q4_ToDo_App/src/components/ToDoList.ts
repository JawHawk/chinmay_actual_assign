import { renderToDoItem } from './ToDoItem';
import { CategorizedToDoItems, ToDoItemModel } from '../models/ToDoItemModel';

export const renderToDoList = (categorizedItems: CategorizedToDoItems): void => {
    const { todoItems, doingItems, doneItems } = categorizedItems;

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

export const addNewItemToColumn = (item: ToDoItemModel): void => {
    const columnIdMap = {
        todo: 'task-todo-column',
        doing: 'task-doing-column',
        done: 'task-done-column'
    };

    const column = document.getElementById(columnIdMap[item.status]);

    if (column) {
        renderToDoItem(column, { item });
    }
};

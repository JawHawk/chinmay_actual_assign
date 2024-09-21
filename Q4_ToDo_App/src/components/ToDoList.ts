import { renderToDoItem } from './ToDoItem';
import { ToDoItemModel } from '../models/ToDoItemModel';

export const renderToDoList = (
    container: HTMLElement,
    items: ToDoItemModel[],
): void => {
    items.forEach(item => {
        renderToDoItem(container, { item });
    });
};

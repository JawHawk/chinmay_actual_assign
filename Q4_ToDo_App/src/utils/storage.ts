import { ToDoItemModel } from '../models/ToDoItemModel';
import data from '../../data/todo.json';

export const getInitialData = (): ToDoItemModel[] => {
    const storedData = localStorage.getItem('todoItems');
    if (storedData) {
        return JSON.parse(storedData);
    }
    return data as ToDoItemModel[];
};

export const saveData = (items: ToDoItemModel[]): void => {
    localStorage.setItem('todoItems', JSON.stringify(items));
};

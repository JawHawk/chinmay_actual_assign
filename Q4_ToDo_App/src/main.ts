import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap'
import { addItem, getItems } from './services/ToDoService';  
import { renderToDoList, addNewItemToColumn } from './components/ToDoList';
import { ToDoItemModel, ToDoStatus } from './models/ToDoItemModel';

const categorizedItems = getItems();

const app = document.getElementById('app');
if (app) {
    renderToDoList(categorizedItems);
}

// Handle form submission
const addItemForm = document.getElementById('addItemForm') as HTMLFormElement;
addItemForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get form values
    const title = (document.getElementById('itemTitle') as HTMLInputElement).value;
    const description = (document.getElementById('itemDescription') as HTMLTextAreaElement).value;
    const dueDate = (document.getElementById('itemDueDate') as HTMLInputElement).value;
    const priority = (document.getElementById('itemPriority') as HTMLSelectElement).value;
    const status = (document.getElementById('itemStatus') as HTMLSelectElement).value as ToDoStatus;

    // Create a new to-do item
    const newItem: ToDoItemModel = {
        id: Date.now(),
        title,
        description,
        endDate: dueDate,
        priority,
        status
    };

    // Add the item to the data model
    addItem(newItem);

    // Append the new item to the corresponding column without re-rendering the whole list
    addNewItemToColumn(newItem);

    // Close modal and reset form
    const addItemModal = document.getElementById('addItemModal');
    if(addItemModal) {
        const modal = bootstrap.Modal.getInstance(addItemModal);
        modal?.hide();
        addItemForm.reset();
    }
});

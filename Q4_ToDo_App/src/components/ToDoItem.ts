import { ToDoItemModel, ToDoPriority, ToDoStatus } from "../models/ToDoItemModel";
import { addItem, deleteItem, updateItem } from "../services/ToDoService";
import * as bootstrap from "bootstrap";
import { renderToDoList } from "./ToDoList";

interface ToDoItemProps {
    item: ToDoItemModel;
}

let isEditing: boolean = false;
let editingItemId: number | null = null;

const addItemForm = document.getElementById('addItemForm') as HTMLFormElement;
const addItemModal = document.getElementById('addItemModal') as HTMLElement;
const modalSubmitButton = document.getElementById('modalSubmitButton') as HTMLButtonElement;

addItemModal.addEventListener('show.bs.modal', (event: Event & { relatedTarget?: HTMLElement }) => {
    const target = event.relatedTarget as HTMLElement;
    if (target.getAttribute("data-operation") === "addItem") {
        openAddItemModal();
    }
});

addItemForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    const title = (document.getElementById('itemTitle') as HTMLInputElement).value;
    const description = (document.getElementById('itemDescription') as HTMLTextAreaElement).value;
    const dueDate = (document.getElementById('itemDueDate') as HTMLInputElement).value;
    const priority = (document.getElementById('itemPriority') as HTMLSelectElement).value as ToDoPriority;
    const status = (document.getElementById('itemStatus') as HTMLSelectElement).value as ToDoStatus;
    
    if (isEditing && editingItemId !== null) {
        const updatedItem: ToDoItemModel = {
            id: editingItemId,
            title,
            description,
            endDate: dueDate,
            priority,
            status
        };
        updateItem(updatedItem);
        isEditing = false;
        editingItemId = null;
    } else {
        const newItem: ToDoItemModel = {
            id: Date.now(),
            title,
            description,
            endDate: dueDate,
            priority,
            status
        };
        addItem(newItem);
    }

    renderToDoList();
    const addItemModalInstance = bootstrap.Modal.getInstance(addItemModal);
    if (addItemModalInstance) {
        addItemModalInstance.hide();
    }
    addItemForm.reset();
    modalSubmitButton.textContent = 'Add Item';
});

const openAddItemModal = (): void => {
    addItemForm.reset();
    isEditing = false;
    editingItemId = null;
    modalSubmitButton.textContent = 'Add Item';
};

export const openEditModal = (item: ToDoItemModel): void => {
    (document.getElementById('itemTitle') as HTMLInputElement).value = item.title;
    (document.getElementById('itemDescription') as HTMLTextAreaElement).value = item.description;
    (document.getElementById('itemDueDate') as HTMLInputElement).value = item.endDate;
    (document.getElementById('itemPriority') as HTMLSelectElement).value = item.priority.toLowerCase();
    (document.getElementById('itemStatus') as HTMLSelectElement).value = item.status;

    isEditing = true;
    editingItemId = item.id;
    modalSubmitButton.textContent = 'Save Changes';
};

function getPriorityColor(priority: string): string {
    switch (priority.toLowerCase()) {
        case 'high':
            return 'danger';
        case 'medium':
            return 'warning';
        case 'low':
            return 'success';
        default:
            return 'secondary';
    }
}

export const renderToDoItem = (container: HTMLElement, { item }: ToDoItemProps): void => {
    const element = document.createElement('div');
    element.classList.add('list-item', 'card', 'text-light');
    element.setAttribute('data-item-id', item.id.toString());

    element.innerHTML = `
    <div class="card list-item text-light">
        <div class="card-body ">
          <div class="d-flex flex-nowrap mb-2 justify-content-between">
            <p class="card-text fw-bold m-0 item-duedate">
              <small>Due: ${item.endDate}</small>
            </p>
            <div class="d-flex flex-nowrap gap-2">
            <p class="badge text-bg-${getPriorityColor(item.priority)} m-0">
              <small>Priority: ${item.priority}</small>
            </p>
            <div class="dropdown">
              <button class="btn btn-transparent p-0 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <svg width="24" height="24" fill="white" class="bi bi-three-dots">
                  <circle cx="12" cy="3" r="2"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                  <circle cx="12" cy="21" r="2"></circle>
                </svg>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" id="delete-item">Delete</a></li>
                <li><a class="dropdown-item" href="#" id="edit-item" data-bs-toggle="modal" data-bs-target="#addItemModal">Edit</a></li>
                ${item.status !== "done" ? `<li><a class="dropdown-item" href="#" id="complete-item">Complete</a></li>` : ""}
              </ul>
            </div>
            </div>
          </div>
          <h5 class="card-title text-break text-truncate">${item.title}</h5>
          <p class="card-text mt-3 text-break text-truncate item-description">${item.description}</p>
        </div>
    </div>
    `;

    const dropdownButton = element.querySelector('.dropdown') as HTMLElement;
    dropdownButton.addEventListener('click', (event: MouseEvent) => {
        event.stopPropagation(); 
    });

    element.querySelector("#edit-item")?.addEventListener('click', () => {
        openEditModal(item);
    });

    element.querySelector("#delete-item")?.addEventListener('click', () => {
        deleteItem(item.id);
        element.remove(); 
        renderToDoList(); 
    });

    element.querySelector("#complete-item")?.addEventListener('click', () => {
        const updatedItem: ToDoItemModel = {
            ...item,
            status: "done" as ToDoStatus 
        };
        updateItem(updatedItem);
        renderToDoList();
    });

    element.addEventListener('click', () => {
        const modalElement = document.getElementById('itemDetailModal') as HTMLElement;
        if (modalElement) {
            (document.getElementById('item-title') as HTMLElement).innerText = `Title: ${item.title}`;
            (document.getElementById('item-description') as HTMLElement).innerText = `Description: ${item.description}`;
            (document.getElementById('item-endDate') as HTMLElement).innerText = `Due: ${item.endDate}`;
            (document.getElementById('item-priority') as HTMLElement).innerText = `Priority: ${item.priority}`;
            (document.getElementById('item-status') as HTMLElement).innerText = `Status: ${item.status}`;

            const bootstrapModal = new bootstrap.Modal(modalElement);
            bootstrapModal.show();
        }
    });

    container.appendChild(element);
};

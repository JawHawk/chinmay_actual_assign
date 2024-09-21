import { ToDoItemModel } from "../models/ToDoItemModel";

interface ToDoItemProps {
    item: ToDoItemModel;
}

export const renderToDoItem = (container: HTMLElement, { item }: ToDoItemProps): void => {
    const element = document.createElement('div');
    element.classList.add('todo-item', 'card', 'mb-3');
    
    element.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.description}</p>
            <p class="card-text"><small class="text-muted">Due: ${item.endDate}</small></p>
            <p class="card-text"><small class="text-muted">Priority: ${item.priority}</small></p>
            <button class="btn btn-success complete-btn">Complete</button>
            <button class="btn btn-danger delete-btn">Delete</button>
        </div>
    `;

    container.appendChild(element);
};

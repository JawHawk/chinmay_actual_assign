import { ToDoItemModel } from "../models/ToDoItemModel";
import { deleteItem } from "../services/ToDoService";

interface ToDoItemProps {
    item: ToDoItemModel;
}

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
            <p class="card-text fw-bold m-0">
              <small >Due: ${item.endDate}</small>
            </p>
            <p class="badge text-bg-${getPriorityColor(item.priority)} m-0">
              <small >Priority: ${item.priority}</small>
            </p>
            <div class="dropdown">
              <button class="btn btn-transparent p-0 border-0 " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <svg width="24" height="24" fill="white" class="bi bi-three-dots">
                  <circle cx="12" cy="3" r="2"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                  <circle cx="12" cy="21" r="2"></circle>
                </svg>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" id="delete-item">Delete</a></li>
              </ul>
            </div>
          </div>
          <h5 class="card-title text-break text-truncate">${item.title}</h5>
          <p class="card-text mt-3 text-break text-truncate">${item.description}</p>
        </div>
    </div>
    `;

    element.querySelector("#delete-item")?.addEventListener('click', () => {
        deleteItem(item.id)
        element.remove(); 
    })
    container.appendChild(element);
};

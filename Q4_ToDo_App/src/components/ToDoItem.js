import { addItem, deleteItem, updateItem } from "../services/ToDoService.js";
import { renderToDoList } from "./ToDoList.js";
import data from "../../data/todo.json" assert { type: "json" };
console.log(data);
// Same Form is used both for add Item and Edit Item.
// isEditing decides if the new Item is added or existing Item is edited.
let isEditing = false;
let editingItem = null;

const addItemForm = document.getElementById("addItemForm");
const addItemModal = document.getElementById("addItemModal");
const modalSubmitButton = document.getElementById("modalSubmitButton");

addItemModal?.addEventListener("show.bs.modal", (event) => {
  const target = event.relatedTarget;
  if (target.getAttribute("data-operation") === "addItem") {
    openAddItemModal();
  }
});

// Handler Form Submit
addItemForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("itemTitle").value;
  const description = document.getElementById("itemDescription").value;
  const dueDate = document.getElementById("itemDueDate").value;
  const priority = document.getElementById("itemPriority").value;
  const status = document.getElementById("itemStatus").value;

  if (isEditing && editingItem !== null) {
    const updatedItem = {
      ...editingItem,
      title,
      description,
      endDate: dueDate,
      priority,
      newStatus: status,
    };
    updateItem(updatedItem);
    isEditing = false;
    editingItem = null;
  } else {
    const newItem = {
      id: Date.now(),
      title,
      description,
      endDate: dueDate,
      priority,
      status,
    };
    addItem(newItem);
  }

  renderToDoList();
  const addItemModalInstance = bootstrap.Modal.getInstance(addItemModal);
  if (addItemModalInstance) {
    addItemModalInstance.hide();
  }
  addItemForm.reset();
  modalSubmitButton.textContent = "Add Item";
});

// Opens Modal after add Item Click
const openAddItemModal = () => {
  addItemForm?.reset();
  isEditing = false;
  editingItem = null;
  modalSubmitButton.textContent = "Add Item";
};

// Opens Modal after Edit Item Click
export const openEditModal = (item) => {
  document.getElementById("itemTitle").value = item.title;
  document.getElementById("itemDescription").value = item.description;
  document.getElementById("itemDueDate").value = item.endDate;
  document.getElementById("itemPriority").value = item.priority.toLowerCase();
  document.getElementById("itemStatus").value = item.status;

  isEditing = true;
  editingItem = { ...item };
  modalSubmitButton.textContent = "Save Changes";
};

function getPriorityColor(priority) {
  switch (priority.toLowerCase()) {
    case "high":
      return "danger";
    case "medium":
      return "warning";
    case "low":
      return "success";
    default:
      return "secondary";
  }
}

// Main Function that appends a To Do Item to the Respective List
export const renderToDoItem = (container, { item }) => {
  const element = document.createElement("div");
  element.classList.add("list-item", "card", "text-light");
  element.setAttribute("data-item-id", item.id.toString());

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
                ${
                  item.status !== "done"
                    ? `<li><a class="dropdown-item" href="#" id="complete-item">Complete</a></li>`
                    : ""
                }
              </ul>
            </div>
            </div>
          </div>
          <h5 class="card-title text-break text-truncate">${item.title}</h5>
          <p class="card-text mt-3 text-break text-truncate item-description">${
            item.description
          }</p>
        </div>
    </div>
    `;

  const dropdownButton = element.querySelector(".dropdown");
  dropdownButton.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  element.querySelector("#edit-item")?.addEventListener("click", () => {
    openEditModal(item);
  });

  element.querySelector("#delete-item")?.addEventListener("click", () => {
    deleteItem(item.id);
    element.remove();
    renderToDoList();
  });

  element.querySelector("#complete-item")?.addEventListener("click", () => {
    const updatedItem = {
      ...item,
      newStatus: "done",
    };
    updateItem(updatedItem);
    renderToDoList();
  });

  element.addEventListener("click", () => {
    const modalElement = document.getElementById("itemDetailModal");
    if (modalElement) {
      document.getElementById("item-title").innerText = `Title: ${item.title}`;
      document.getElementById(
        "item-description"
      ).innerText = `Description: ${item.description}`;
      document.getElementById(
        "item-endDate"
      ).innerText = `Due: ${item.endDate}`;
      document.getElementById(
        "item-priority"
      ).innerText = `Priority: ${item.priority}`;
      document.getElementById(
        "item-status"
      ).innerText = `Status: ${item.status}`;

      const bootstrapModal = new bootstrap.Modal(modalElement);
      bootstrapModal.show();
    }
  });

  container.appendChild(element);
};

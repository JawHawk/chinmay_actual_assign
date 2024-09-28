const data = [
  {
    id: 1,
    title: "Sample Task 1",
    description: "This is a sample task description.",
    endDate: "2024-09-30",
    priority: "medium",
    status: "todo",
  },
  {
    id: 2,
    title: "Research about collaborative Tools",
    description:
      "As shared during the interview of the upcoming goal to add collaboration feature in WHERENESS. Explore more about WebRTC and WebSockets.",
    endDate: "2024-10-05",
    priority: "high",
    status: "doing",
  },
];

let items = categorizeItems(getInitialData());

// Same Form is used both for add Item and Edit Item.
// isEditing decides if the new Item is added or existing Item is edited.
let isEditing = false;
let editingItem = null;

const app = document.getElementById("app");
if (app) {
  // Render the Initial To Do List with default Data
  renderToDoList();
}

// Re render the To Do List when sorting is changed
document.querySelectorAll(".sort-select").forEach((select) => {
  select.addEventListener("change", (e) => {
    const sortBy = e.target.value;
    const status = e.target.getAttribute("data-item-column");

    if (status) {
      renderToDoList(status, sortBy);
    }
  });
});

// Reset To Do Items to default
document.getElementById("resetButton")?.addEventListener("click", () => {
  const confirmReset = confirm("Are you sure you want to reset the list?");
  if (confirmReset) {
    resetItems();
    renderToDoList();
  }
});

// Click handler for download JSON button
document.getElementById("downloadButton")?.addEventListener("click", () => {
  downloadJSON();
});

// Click handler for uploading JSON button
document.getElementById("uploadButton")?.addEventListener("click", () => {
  const uploadInput = document.getElementById("uploadInput");
  uploadInput.click(); // Trigger the file input click
});

// Handle the file upload
document.getElementById("uploadInput")?.addEventListener("change", uploadJSON);

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

// Main Function that renders each status List with the To Do Items
function renderToDoList(status, sortBy) {
  const { todoItems, doingItems, doneItems } = getItems(status, sortBy);

  const todoColumn = document.getElementById("task-todo-column");
  const doingColumn = document.getElementById("task-doing-column");
  const doneColumn = document.getElementById("task-done-column");

  if (!todoColumn || !doingColumn || !doneColumn) {
    console.error("One or more columns are missing in the DOM.");
    return;
  }

  todoColumn.innerHTML = "";
  doingColumn.innerHTML = "";
  doneColumn.innerHTML = "";

  todoItems.forEach((item) => renderToDoItem(todoColumn, { item }));
  doingItems.forEach((item) => renderToDoItem(doingColumn, { item }));
  doneItems.forEach((item) => renderToDoItem(doneColumn, { item }));
}

// Main Function that appends a To Do Item to the Respective List
function renderToDoItem(container, { item }) {
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
}

function openEditModal(item) {
  document.getElementById("itemTitle").value = item.title;
  document.getElementById("itemDescription").value = item.description;
  document.getElementById("itemDueDate").value = item.endDate;
  document.getElementById("itemPriority").value = item.priority.toLowerCase();
  document.getElementById("itemStatus").value = item.status;

  isEditing = true;
  editingItem = { ...item };
  modalSubmitButton.textContent = "Save Changes";
}

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

function sortByPriority(items) {
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  return items.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );
}

function sortByDueDate(items) {
  return items.sort(
    (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
  );
}

function getInitialData() {
  const storedData = localStorage.getItem("todoItems");
  if (storedData) {
    return JSON.parse(storedData);
  }
  return data;
}

function saveData(items) {
  localStorage.setItem("todoItems", JSON.stringify(items));
}

function categorizeItems(data) {
  return {
    todoItems: data.filter((item) => item.status === "todo"),
    doingItems: data.filter((item) => item.status === "doing"),
    doneItems: data.filter((item) => item.status === "done"),
  };
}

function getStatusKey(status) {
  if (status === "todo") return "todoItems";
  if (status === "doing") return "doingItems";
  if (status === "done") return "doneItems";
  throw new Error(`Unknown status: ${status}`);
}

function getItems(status, sortBy) {
  let todoItems = items.todoItems;
  let doingItems = items.doingItems;
  let doneItems = items.doneItems;

  function applySort(itemsList, sortBy) {
    if (sortBy === "1") {
      return sortByPriority(itemsList);
    } else if (sortBy === "2") {
      return sortByDueDate(itemsList);
    } else {
      return itemsList.sort((a, b) => a.id - b.id); // Sort by id (Date.now())
    }
  }

  if (status) {
    if (status === "todo") {
      todoItems = applySort(todoItems, sortBy || "0");
    } else if (status === "doing") {
      doingItems = applySort(doingItems, sortBy || "0");
    } else if (status === "done") {
      doneItems = applySort(doneItems, sortBy || "0");
    }
  } else {
    todoItems = applySort(todoItems, "0");
    doingItems = applySort(doingItems, "0");
    doneItems = applySort(doneItems, "0");
  }

  return {
    todoItems,
    doingItems,
    doneItems,
  };
}

function addItem(item) {
  const statusKey = getStatusKey(item.status);
  items[statusKey].push(item);
  saveData([...items.todoItems, ...items.doingItems, ...items.doneItems]);
}

function deleteItem(id) {
  for (const statusKey of Object.keys(items)) {
    items[statusKey] = items[statusKey].filter((item) => item.id !== id);
  }
  saveData([...items.todoItems, ...items.doingItems, ...items.doneItems]);
}

function updateItem(updatedItem) {
  const oldStatusKey = getStatusKey(updatedItem.status);
  const newStatusKey = getStatusKey(updatedItem.newStatus);

  // If the status hasn't changed, just update the item
  if (updatedItem.status === updatedItem.newStatus) {
    const index = items[oldStatusKey].findIndex(
      (item) => item.id === updatedItem.id
    );
    if (index > -1) {
      items[oldStatusKey][index] = { ...updatedItem }; // Update the existing item
      saveData([...items.todoItems, ...items.doingItems, ...items.doneItems]);
    }
    return;
  }

  // Remove the item from the old status array
  const oldIndex = items[oldStatusKey].findIndex(
    (item) => item.id === updatedItem.id
  );
  if (oldIndex > -1) {
    const [item] = items[oldStatusKey].splice(oldIndex, 1);

    let newItem = { ...item, ...updatedItem, status: updatedItem.newStatus };
    // Add the item to the new status array
    items[newStatusKey].push(newItem);
    saveData([...items.todoItems, ...items.doingItems, ...items.doneItems]);
  }
}

function markAsComplete(id) {
  let item;

  for (const statusKey of Object.keys(items)) {
    item = items[statusKey].find((i) => i.id === id);
    if (item) {
      items[statusKey] = items[statusKey].filter((i) => i.id !== id);
      break;
    }
  }

  if (item) {
    item.status = "done";
    items["doneItems"].push(item);
    saveData([...items.todoItems, ...items.doingItems, ...items.doneItems]);
  }
}

function resetItems() {
  items = categorizeItems(data);
  saveData(data);
}

function downloadJSON() {
  // Combine all items into a single array
  const allItems = [
    ...items.todoItems,
    ...items.doingItems,
    ...items.doneItems,
  ];

  // Convert the array to JSON
  const json = JSON.stringify(allItems, null, 2);

  // Create a Blob and a link to download the file
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "todo_items.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url); // Clean up the URL object
}

function uploadJSON(event) {
  const input = event.target;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        console.log(json);
        if (Array.isArray(json)) {
          items = categorizeItems(json);
          saveData(json); // Save to localStorage
          renderToDoList();
        } else {
          alert("Uploaded JSON must be an array of to-do items.");
        }
      } catch (error) {
        alert("Error parsing JSON: " + error.message);
      }
    };

    reader.readAsText(file);
  }
}

import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap'
import { renderToDoList } from './components/ToDoList';
import { downloadJSON, resetItems, uploadJSON } from './services/ToDoService';

const app = document.getElementById('app');
if (app) {
    // Render the Initial To Do List with default Data
    renderToDoList();
}

// Re render the To Do List when sorting is changed
document.querySelectorAll('.sort-select').forEach(select => { 
    select.addEventListener('change', (e) => {
        const sortBy = (e.target as HTMLSelectElement).value;
        const status = (e.target as HTMLSelectElement).getAttribute("data-item-column");

        if(status) {
            renderToDoList(status, sortBy);
        }
    });
})

// Reset To Do Items to default 
document.getElementById('resetButton')?.addEventListener('click', () => {
    const confirmReset = confirm("Are you sure you want to reset the list?");
    if (confirmReset) {
        resetItems();
        renderToDoList();
    }
});

// Click handler for download JSON button
document.getElementById('downloadButton')?.addEventListener('click', () => {
    downloadJSON();
});

// Click handler for uploading JSON button
document.getElementById('uploadButton')?.addEventListener('click', () => {
    const uploadInput = document.getElementById('uploadInput') as HTMLInputElement;
    uploadInput.click(); // Trigger the file input click
});

// Handle the file upload
document.getElementById('uploadInput')?.addEventListener('change', uploadJSON);



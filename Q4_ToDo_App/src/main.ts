import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { renderToDoList } from './components/ToDoList';

const app = document.getElementById('app');
if (app) {
    renderToDoList();
}

document.querySelectorAll('.sort-select').forEach(select => { 
    select.addEventListener('change', (e) => {
        const sortBy = (e.target as HTMLSelectElement).value;
        const status = (e.target as HTMLSelectElement).getAttribute("data-item-column");

        if(status) {
            renderToDoList(status, sortBy);
        }
    });

})

import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { getInitialData } from './utils/storage';
import { ToDoItemModel } from './models/ToDoItemModel';
import { renderToDoList } from './components/ToDoList';

let items: ToDoItemModel[] = getInitialData();

const app = document.getElementById('app');
if(app) {
  renderToDoList(app, items);
}
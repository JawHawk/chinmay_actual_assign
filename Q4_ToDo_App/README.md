# Q4: To Do List Application

This is a Typescript based To Do List Application with the following features:

## Features

1. **Add, Edit, Delete Tasks**: Users can add new tasks, update existing tasks, or remove tasks.
2. **Task Completion**: Mark tasks as complete and move them to the "Done" list.
3. **Multiple Lists**: Tasks are separated into "To Do", "Doing", and "Done" lists.
4. **Sorting**: Tasks can be sorted by **Priority** and **End/Due Date**.
5. **No External Libraries**: The project is built using only vanilla **JavaScript** and Bootstrap. No JS library is used.

## Documentation to Run the Project

### 1. Requirements

To run the project, ensure you have a modern browser like **Google Chrome**, **Firefox**, or **Edge**. No additional server setup is required since this is a front-end project.

### 2. Running the Project

- **Step 1**: Clone the repository to your local machine: No need for this step if already done.

  ```bash
  git clone <repository-url>
  ```

- **Step 2**: Start Application:

  ### Go to the Project folder `Q4_ToDo_App` and Double Click on `index.html` file to start the application in the browser. ( Preferred way )

  #### OR

  Use `Live Server` VSCode Extension

  Just download the `Live Server` extension and right click on HTML file to choose option `Open with Live Server`.

## Current File Structure

```
.
├── public       # Static assets
├── src
│   ├── style.css
│   ├── main.js                  # Main entry point
├── index.html
├── .gitignore                    # Git ignore file
├── README.md                     # Documentation
```

## Reason to Use Vite as bundling tool

Previously I used only `Bootstrap` and `Vite` to build my Typescript application as asked in the assignment. `Vite` is not considered a Javascript library but is considered a bundling tool in Indian Industry practices. This led to some miscommunication and I apologize for that. I again wrote the entire code from scratch.

Typescript is not supported by browser and needs some transpiler like Vite. I also divided the application in multiple files, and to serve the files as modules on browser, a server is needed ( otherwise it will show CORS error ). This part is also handled by Vite.

Currently I have removed vite and all packages. All the code is transferred to single js file. This will reduce the readability, but will directly work by double clicking the `index.html` file to start the application.

## Previous File Structure

```
.
├── public       # Static assets
├── src
│   ├── style.css
│   ├── main.js                  # Main entry point
│   ├── components
│   │   ├── ToDoItem.js          # Component for single To-Do item
│   │   ├── ToDoList.js          # Component for the entire list
│   ├── services
│   │   └── ToDoService.js       # Service for handling data operations
│   ├── utils
│       ├── storage.js      # Utility functions for handling localStorage/JSON File
│       ├── sortUtils.js
│
├── data
│   └── todo.json                 # Initial data for ToDo list (can be static for reading)
├── index.html
├── .gitignore                    # Git ignore file
├── README.md                     # Documentation
```

## Build Steps

I previously used Vite as a build tool for running the Development server and producing builds. It is beneficial as it provides features like Hot Module Replacement, Build Optimizations, Static File Handling etc.

Here, Webpack can also be used for task automation like minification of CSS/JS files and live reloading.

A Preprocessor like Sass can also be used to improve CSS scalability.

I would also like to add Unit Tests using a testing framework like Jest to ensure the functionality remains intact during development.

These are the build steps I would follow for a more robust application.

## Scope for Improvements

I could have added more features like Drag & Drop to columns similar to Trello, calender to alert pending tasks etc. if time permitted. Due to ongoing Exams, I could only implement the necessary functions.

## Deployed Link

`chinmay-actual-assign.netlify.app/`

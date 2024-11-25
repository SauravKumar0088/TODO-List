// Elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

let tasks = [];
let editTaskId = null;

// Load tasks from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
});

// Add Task when clicking button
addTaskBtn.addEventListener('click', addOrUpdateTask);

// Add Task when pressing Enter key
taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addOrUpdateTask();
    }
});

// Add or Update Task
function addOrUpdateTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        if (editTaskId !== null) {
            tasks[editTaskId] = taskText; // Update existing task
            editTaskId = null;
            addTaskBtn.textContent = 'Add Task'; // Reset button text
        } else {
            tasks.push(taskText); // Add new task
        }
        taskInput.value = ''; // Clear input field
        saveTasks(); // Save tasks to localStorage
        renderTasks();
    }
}

// Render Tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <div class="task-actions">
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Edit Task
function editTask(index) {
    taskInput.value = tasks[index];
    editTaskId = index;
    addTaskBtn.textContent = 'Update Task';
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks(); // Save the updated list to localStorage
    renderTasks();
}

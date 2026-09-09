// Array to store all tasks
let tasks = [];


// Add a new task
function addTask() {

    // Get input value
    let taskInput = document.getElementById("taskInput");

    let taskText = taskInput.value.trim();


    // Check if input is empty
    if (taskText === "") {

        alert("Please enter a task.");

        return;
    }


    // Create a task object
    let task = {

        id: Date.now(),

        text: taskText,

        completed: false
    };


    // Add task to array
    tasks.push(task);


    // Clear input
    taskInput.value = "";


    // Display tasks
    displayTasks();

}


// Display all tasks
function displayTasks(taskArray = tasks) {

    let taskList = document.getElementById("taskList");

    let emptyMessage = document.getElementById("emptyMessage");


    // Clear old tasks
    taskList.innerHTML = "";


    // If there are no tasks
    if (taskArray.length === 0) {

        taskList.innerHTML = `
            <p class="text-center text-gray-500 py-8">
                No tasks available.
            </p>
        `;

        updateStatistics();

        return;
    }


    // Display every task
    taskArray.forEach(function(task) {

        let taskDiv = document.createElement("div");

        taskDiv.className =
            "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 py-4";


        // Task text
        let taskText = document.createElement("p");

        taskText.textContent = task.text;

        taskText.className = "text-gray-800 flex-1";


        // If task is completed
        if (task.completed) {

            taskText.className =
                "text-gray-400 line-through flex-1";

        }


        // Buttons container
        let buttonsDiv = document.createElement("div");

        buttonsDiv.className = "flex gap-2";


        // Complete button
        let completeButton = document.createElement("button");

        completeButton.textContent =
            task.completed ? "Undo" : "Complete";

        completeButton.className =
            "bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm";


        completeButton.onclick = function() {

            toggleTask(task.id);

        };


        // Edit button
        let editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.className =
            "bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm";


        editButton.onclick = function() {

            editTask(task.id);

        };


        // Delete button
        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className =
            "bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm";


        deleteButton.onclick = function() {

            deleteTask(task.id);

        };


        // Add buttons
        buttonsDiv.appendChild(completeButton);

        buttonsDiv.appendChild(editButton);

        buttonsDiv.appendChild(deleteButton);


        // Add task text and buttons
        taskDiv.appendChild(taskText);

        taskDiv.appendChild(buttonsDiv);


        // Add task to task list
        taskList.appendChild(taskDiv);

    });


    // Update counters
    updateStatistics();

}


// Mark task complete / incomplete
function toggleTask(id) {

    tasks.forEach(function(task) {

        if (task.id === id) {

            task.completed = !task.completed;

        }

    });


    displayTasks();

}


// Edit task
function editTask(id) {

    let task = tasks.find(function(task) {

        return task.id === id;

    });


    if (task) {

        let newText = prompt(
            "Edit your task:",
            task.text
        );


        if (newText !== null && newText.trim() !== "") {

            task.text = newText.trim();

            displayTasks();

        }

    }

}


// Delete task
function deleteTask(id) {

    let confirmDelete = confirm(
        "Are you sure you want to delete this task?"
    );


    if (confirmDelete) {

        tasks = tasks.filter(function(task) {

            return task.id !== id;

        });


        displayTasks();

    }

}


// Show all tasks
function showAll() {

    displayTasks(tasks);

}


// Show pending tasks
function showPending() {

    let pendingTasks = tasks.filter(function(task) {

        return task.completed === false;

    });


    displayTasks(pendingTasks);

}


// Show completed tasks
function showCompleted() {

    let completedTasks = tasks.filter(function(task) {

        return task.completed === true;

    });


    displayTasks(completedTasks);

}


// Update task statistics
function updateStatistics() {

    let total = tasks.length;


    let completed = tasks.filter(function(task) {

        return task.completed === true;

    }).length;


    let pending = total - completed;


    document.getElementById("totalTasks").textContent =
        total;


    document.getElementById("completedTasks").textContent =
        completed;


    document.getElementById("pendingTasks").textContent =
        pending;

}


// Allow Enter key to add a task
document.getElementById("taskInput").addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);
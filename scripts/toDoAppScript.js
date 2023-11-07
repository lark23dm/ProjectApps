// Get Element:
const addBtnElement = document.getElementById('btn-add');
const inputElement = document.getElementById('input-box');




// Main App
let listOfTasks = []
taskID = 0;

// Test App
const testToDoElement = document.getElementById('title');

// Add the task to a list if the input is not empty:
addBtnElement.addEventListener('click', () =>{
    if (inputElement.value === ''){
        alert("Enter a Task");
    }else{
        // Get the user's input
        const task = getTask();

        // Clean input field:
        inputElement.value = '';

        // Create Task Object
        const taskObject = buildTaskObject(task);

        // Add object to list and Display results:
        addNoteToList(taskObject);
    }

    // Toggle the class 'checked':
    toggleCheckedClass();

    // Delete a given task:
    deleteTask();
})


//   ***** Functions *****

function getTask() {
    return inputElement.value;
}

function buildTaskObject(task) {
    taskID++;
    return {
        id: taskID,
        name: task,
        classes: 'task'
    };
}

function addNoteToList(taskObject) {
    listOfTasks.push(taskObject);

    renderTasks();
}

// Render all the tasks to screen:
function renderTasks() {
    const listElement = document.getElementById('tasks-List');
    listElement.innerHTML = '';

    listOfTasks.forEach(task =>{
        const newTaskLI = document.createElement('li');
        const newTaskSpan = document.createElement('span');
        const newImg = document.createElement('img');

        newTaskLI.className = task.classes;
        newTaskLI.innerText = task.name;
        newTaskLI.id = task.id;
        newImg.src = '../images/todoAppImgs/delete.png';
        newTaskSpan.append(newImg);
        newTaskLI.append(newTaskSpan);
        listElement.append(newTaskLI);
    })
}

// Toggle Checked class:
function toggleCheckedClass() {
    const taskNodes = document.querySelectorAll('.task');

    taskNodes.forEach((nodeItem) =>{
        nodeItem.addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('checked')
            const id = e.currentTarget.id;
            const classes = e.currentTarget.classList;

            updateClassList(id, classes)
        })
    })
}

function updateClassList(id, classes) {
    let targetObjet = listOfTasks.find(obj => obj.id === parseInt(id));
    targetObjet.classes = classes;
}

// Function to delete a given task:
function deleteTask() {
    const taskNodes = document.querySelectorAll('.task');

    taskNodes.forEach((nodeItem) =>{
        const spanNodeElements = document.querySelectorAll('span')
        spanNodeElements.forEach(spanElement =>{
            spanElement.addEventListener('click', (e) =>{
                const idToDelete = parseInt(e.currentTarget.parentElement.id);
                e.currentTarget.parentElement.remove();

                removeDeletedTask(idToDelete)
            })
        })
    })
}


function removeDeletedTask(id) {
    listOfTasks = listOfTasks.filter(task => task.id !== id);
    console.log(listOfTasks);
}



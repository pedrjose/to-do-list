const inputText = document.querySelector('.input-text');
const inputButton = document.querySelector('.input-button');
const tasksList = document.querySelector('.to-do-list');

// create a <li> html element
function createElementLi() {
    const li = document.createElement('li');
    return li;
}

// clear the text box
function clearInput() {
    inputText.value = '';
    inputText.focus();
}

// add remove button in the li element
function addRemoveButton(li) {
    li.innerText += ' ';
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'x';
    deleteButton.setAttribute('class', 'delete');
    li.appendChild(deleteButton);
    return li;
}

// create a task to the to-do-list
function createTask(inputText) {
    let li = createElementLi();
    li.innerText = inputText
    tasksList.appendChild(li);
    clearInput();
    li = addRemoveButton(li);
}

// get the 'ENTER' button click event
inputText.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        if (!inputText.value) return;
        createTask(inputText.value);
    }
})

// get the click event
inputButton.addEventListener('click', function () {
    if (!inputText.value) return;
    createTask(inputText.value);
})

// remove the task from to-do-list
document.addEventListener('click', function (event) {
    const element = event.target;

    if (element.classList.contains('delete')) {
        element.parentElement.remove();
    }
})

// save the tasks from the to-do-list
document.addEventListener('click', function (event) {
    const element = event.target;

    if (element.classList.contains('save-list')) {
        saveTasks();
    }
})

// load the tasks from the to-do-list
document.addEventListener('click', function (event) {
    const element = event.target;

    if (element.classList.contains('load-list')) {
        loadTasks();
    }
})

// function to save tasklist
function saveTasks() {
    const liList = tasksList.querySelectorAll('li');
    const workList = [];

    for (let task of liList) {
        let taskText = task.innerText;
        taskText = taskText.replace('x', '').trim();
        workList.push(taskText);
    }

    const tasksJSON = JSON.stringify(workList);
    localStorage.setItem('tasks', tasksJSON);
}

// function to load tasklist
function loadTasks() {
    if (!localStorage.getItem('tasks')) {
        alert(`THERE'S NOT SAVED TASKS!`);
    }
    else {
        const tasks = localStorage.getItem('tasks');
        const taskList = JSON.parse(tasks);

        for (let task of taskList) {
            createTask(task);
        }
    }
}

// function for open modal

function openModal() {
  document.getElementById('addTaskModal').style.display = 'flex';
  document.getElementById('edit').style.display = "none";
  document.getElementById('add').style.display = "flex";

}

// function for closing modal

function closeModal() {
  document.getElementById('addTaskModal').style.display = 'none';
}


// function for getting tasks

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}


// function for saving tasks

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

let progress = 0;
var saving_index;

let tasks = getTasks();


// function for rendering tasks

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  // priority map for tasks
  const priorityMap = {
    high: 2,
    normal: 1,
    low: 0
  }

  // comparator function for sorting tasks based on priority

  function compare(task1, task2) {
    priority1 = priorityMap[task1.priority];
    priority2 = priorityMap[task2.priority];
    return priority2 - priority1;
  }

  tasks.sort(compare);

  // traversing tasks array

  tasks.forEach((task, index) => {
    const taskElement = document.createElement('li');

    taskElement.className = `task ${tasks.priority} ${task.completed ? 'completed' : ''}`;


    // for checkbox

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = task.completed;
    checkBox.classList.add('checkbx');
    checkBox.addEventListener('change', (event) => {
      event.stopPropagation();
      toggleTask(index);
    })


    const taskName = document.createElement('label');
    taskName.innerText = task.text;

    const deadline = document.createElement('label');
    deadline.innerText = task.deadline;

    const priority = document.createElement('label');
    priority.innerText = task.priority;

    const labelname = document.createElement('label');
    labelname.innerText = task.label;

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';


    // for editting task
    editButton.addEventListener('click', (event) => {
      event.stopPropagation();
      document.getElementById('add').style.display = "none";
      document.getElementById('edit').style.display = "flex";
      openEditModal(index);
      saving_index = index;
    });


    // for deleting task
    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation();
      deleteTask(index);
    });

    taskElement.appendChild(checkBox);
    taskElement.appendChild(taskName);
    taskElement.appendChild(deadline);
    taskElement.appendChild(priority);
    taskElement.appendChild(labelname);
    taskElement.appendChild(editButton);
    taskElement.appendChild(deleteButton);
    taskList.appendChild(taskElement);
  })

  updateProgress();


}

// function for progress bar

function updateProgress() {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  document.getElementById('progress').style.width = `${progress}%`;
  document.getElementById('progress').innerText = `${progress.toFixed(0)}% done`;

}

// function for toggling tasks

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}

// function for opening edit model

function openEditModal(index) {
  const task = tasks[index];
  document.getElementById('taskText').value = task.text;
  document.getElementById('deadline').value = task.deadline;
  document.getElementById('priority').value = task.priority;
  document.getElementById('label').value = task.label;
  const modal = document.getElementById('addTaskModal');
  modal.style.display = "flex";

}

// function for editing task

function editTask() {
  var index = saving_index;
  tasks[index].text = document.getElementById('taskText').value.trim();
  tasks[index].deadline = document.getElementById('deadline').value;
  tasks[index].priority = document.getElementById('priority').value;
  tasks[index].label = document.getElementById('label').value;
  saveTasks(tasks);
  renderTasks();
  closeModal();
}

// function for closing modal

function closeModal() {
  document.getElementById('addTaskModal').style.display = "none";
  clearModalFields();
}

// function for clearing fields

function clearModalFields() {
  document.getElementById('taskText').value = '';
  document.getElementById('deadline').value = '';
  document.getElementById('priority').value = 'normal';
  document.getElementById('label').value = '';
}


// function for adding task to todo list

function addTask() {
  const taskText = document.getElementById('taskText').value.trim();


  if (taskText !== '') {
    const newTask = {
      text: taskText,
      deadline: document.getElementById('deadline').value,
      priority: document.getElementById('priority').value,
      label: document.getElementById('label').value,
      completed: false,
    };
    tasks.push(newTask);
    saveTasks(tasks);
    renderTasks();
    closeModal();
    clearModalFields();

  }

}

// function for deleting task

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

renderTasks();
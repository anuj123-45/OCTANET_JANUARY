function openModal() {
  document.getElementById('addTaskModal').style.display = 'flex';
  document.getElementById('edit').style.display = "none";
  document.getElementById('add').style.display = "flex";

}



function closeModal() {
  document.getElementById('addTaskModal').style.display = 'none';
}

let tasks = [];
let progress = 0;
var x;

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskElement = document.createElement('li');
    taskElement.className = `task ${tasks.priority} ${task.completed ? 'completed' : ''}`;


    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = task.completed;
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

    editButton.addEventListener('click', (event) => {
      event.stopPropagation();
      document.getElementById('add').style.display = "none";
      document.getElementById('edit').style.display = "flex";
      openEditModal(index);
      x=index;
    });

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


function updateProgress() {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  document.getElementById('progress').style.width = `${progress}%`;
  document.getElementById('progress').innerText = `${progress.toFixed(0)}% done`;

}


function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}


function openEditModal(index){
  const task=tasks[index];
  document.getElementById('taskText').value=task.text;
  document.getElementById('deadline').value=task.deadline;
  document.getElementById('priority').value=task.priority;
  document.getElementById('label').value=task.label;
  const modal=document.getElementById('addTaskModal');
  modal.style.display="flex";

}


function editT(){
  var index=x;
  tasks[index].text=document.getElementById('taskText').value.trim();
  tasks[index].deadline=document.getElementById('deadline').value;
  tasks[index].priority=document.getElementById('priority').value;
  tasks[index].label=document.getElementById('label').value;
  renderTasks();
  closeModal();
}


function closeModal(){
  document.getElementById('addTaskModal').style.display="none";
  clearModalFields();
}

function clearModalFields(){
  document.getElementById('taskText').value = '';
  document.getElementById('deadline').value = '';
  document.getElementById('priority').value = 'normal';
  document.getElementById('label').value = '';
}


function addTask(){
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
        renderTasks();
        closeModal();
        clearModalFields();

      }
        
}



function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Initial dummy tasks for demonstration
tasks.push({ text: 'Task 1', deadline: '2024-01-15', priority: 'low', label: 'Personal', completed: false });
tasks.push({ text: 'Task 2', deadline: '2024-01-20', priority: 'high', label: 'Work', completed: false });
tasks.push({ text: 'Task 3', deadline: '2024-01-25', priority: 'normal', label: 'Study', completed: false });

renderTasks();
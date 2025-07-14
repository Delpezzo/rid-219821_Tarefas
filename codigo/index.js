let tasks = [
    { id:1, description:'Implementar tela de listagem de tarefas', details: 'frontend', data: 'Criado em: 21/08/2024' },
    { id:2, description:'Criar endpoint para cadastro de tarefas', details: 'backend', data: 'Criado em: 21/08/2024' },
    { id:3, description:'Implementar protótipo da listagem de tarefas', details: 'ux', data: 'Criado em: 21/08/2024' }
]

const renderTaskProgressData = (tasks) => {
    let tasksProgress;
    const tasksProgressDOM = document.getElementById('tasks-progress');

    if (tasksProgressDOM) tasksProgress = tasksProgressDOM;
    else {
        const newTasksProgressDOM = document.createElement('div');
        newTasksProgressDOM.id = 'tasks-progress';
        document.getElementById('task-footer').appendChild(newTasksProgressDOM)
        tasksProgress = newTasksProgressDOM
    }

    const doneTasks = tasks.filter(task => task.done).length
    

    tasksProgress.textContent = `${doneTasks} tarefa concluida`
}

const getCurrentData = () =>{
    const now = new Date();
    const dia = String(now.getDate()).padStart(2, '0');
    const mes = String(now.getMonth() + 1).padStart(2, '0');
    const ano = now.getFullYear();
    return `Criado em: ${dia}/${mes}/${ano}`;
};

const riskTask = (button, taskId) => {
    const listItem = button.closest("li");
    const taskText = listItem.querySelector(".description");
    const task = tasks.find(t => t.id === taskId);

    if (!task || task.done) return;

    task.done = true;
    taskText.style.textDecoration = "line-through";
    taskText.style.color = "#999";
    button.remove(); 

    const svgIcon = document.createElement('img')
    svgIcon.src = './images/check.svg';
    svgIcon.alt = 'Concluida';
    svgIcon.classList.add('check-icon');

    listItem.appendChild(svgIcon)

    renderTaskProgressData(tasks); 
};

const createTaskListItem = (task) => {
    const list = document.getElementById('task-list');
    const item = document.createElement('li');

    item.id = `task-${task.id}`;

    const descriptionSpan = document.createElement('span');
    descriptionSpan.className = 'description';
    descriptionSpan.textContent = task.description;

    const infoDiv = document.createElement('div');
    infoDiv.className = 'task-info';

    const labelSpan = document.createElement('span');
    labelSpan.className = 'task-label';
    labelSpan.textContent = task.details;

    const dateSpan = document.createElement('span');
    dateSpan.className = 'task-date';
    dateSpan.textContent = task.data;

    infoDiv.appendChild(labelSpan);
    infoDiv.appendChild(dateSpan);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'task-content';
    contentDiv.appendChild(descriptionSpan);
    contentDiv.appendChild(infoDiv);

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'task-actions';

    const checkBtn = document.createElement('button');
    checkBtn.textContent = 'Concluir';
    checkBtn.ariaLabel = 'Concluir Tarefa';

    if (task.done) {
    descriptionSpan.style.textDecoration = "line-through";
    descriptionSpan.style.color = "#999";

  const svgIcon = document.createElement('img');
  svgIcon.src = './images/check.svg';
  svgIcon.alt = 'Concluída';
  svgIcon.classList.add('check-icon');

  actionsDiv.appendChild(svgIcon);
} else {
  const checkBtn = document.createElement('button');
  checkBtn.textContent = 'Concluir';
  checkBtn.ariaLabel = 'Concluir Tarefa';

  checkBtn.onclick = function () {
    riskTask(this, task.id);
  };

  actionsDiv.appendChild(checkBtn);
}

item.appendChild(contentDiv); // contém o texto e data
item.appendChild(actionsDiv); // contém botão ou ícone
list.appendChild(item);

}

const createTask = (event) => {
    event.preventDefault()

    const taskInput = document.getElementById("task-input");
    const labelInput = document.getElementById("label-input");

    const description = taskInput.value.trim();
    const label = labelInput.value.trim();

    if (!description) return;

    const task = {
      id: Date.now(),
      description: description,
      details: label, 
      data:getCurrentData(),
      done: false,
    };

    tasks.push(task);
    createTaskListItem(task);

    taskInput.value = "";
    labelInput.value = "";


    renderTaskProgressData(tasks);
};

window.onload = function() {
    const form = document.getElementById('create-task-form');
    form.addEventListener('submit', createTask);

    tasks.forEach(task => {
    if (task.id === 3) {
      task.done = true;
    }

    createTaskListItem(task);
  });

  renderTaskProgressData(tasks);
};

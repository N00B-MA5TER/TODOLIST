let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

function addTask(taskText){
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    tasks.push(newTask);
    saveAndRender();
    document.getElementById("task-input").value = "";
}

function deleteTask(taskId){
    tasks = tasks.filter(task => taskId !== task.id);
    saveAndRender();
}

function toggleCompleted(taskId){
    tasks = tasks.map(task => {
        if (task.id === taskId){
            return {...task, completed: !task.completed};
        }
        return task;
    });
    saveAndRender();
}

function saveAndRender(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function renderTasks(){
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed){
            li.style.textDecoration = "line-through";
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleCompleted(task.id));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteTask(task.id));

        li.prepend(checkbox);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

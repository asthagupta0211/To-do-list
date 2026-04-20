let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") return;

    tasks.push({ text: text, completed: false });
    input.value = "";

    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

function clearAll() {
    if (confirm("Delete all tasks?")) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
}

function setFilter(type) {
    filter = type;
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    const search = document.getElementById("searchInput").value.toLowerCase();

    list.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    filteredTasks = filteredTasks.filter(task =>
        task.text.toLowerCase().includes(search)
    );

    let completed = 0;

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;
        if (task.completed) {
            span.classList.add("completed");
            completed++;
        }

        span.onclick = () => toggleComplete(index);

        const actions = document.createElement("div");
        actions.classList.add("actions");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit");
        editBtn.onclick = () => editTask(index);

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = () => deleteTask(index);

        actions.appendChild(editBtn);
        actions.appendChild(delBtn);

        li.appendChild(span);
        li.appendChild(actions);

        list.appendChild(li);
    });

    document.getElementById("counter").textContent =
        `Total: ${tasks.length} | Completed: ${tasks.filter(t => t.completed).length} | Pending: ${tasks.filter(t => !t.completed).length}`;
}

// Initial Load
renderTasks();
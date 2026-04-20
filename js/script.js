function renderTasks() {
    const list = document.getElementById("taskList");
    const search = document.getElementById("searchInput").value.toLowerCase();

    list.innerHTML = "";

    let filteredTasks = tasks
        .map((task, index) => ({ ...task, originalIndex: index }))
        .filter(task => {
            if (filter === "completed") return task.completed;
            if (filter === "pending") return !task.completed;
            return true;
        })
        .filter(task =>
            task.text.toLowerCase().includes(search)
        );

    filteredTasks.forEach(task => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        span.onclick = () => toggleComplete(task.originalIndex);

        const actions = document.createElement("div");
        actions.classList.add("actions");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit");
        editBtn.onclick = () => editTask(task.originalIndex);

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = () => deleteTask(task.originalIndex);

        actions.appendChild(editBtn);
        actions.appendChild(delBtn);

        li.appendChild(span);
        li.appendChild(actions);

        list.appendChild(li);
    });

    document.getElementById("counter").textContent =
        `Total: ${tasks.length} | Completed: ${tasks.filter(t => t.completed).length} | Pending: ${tasks.filter(t => !t.completed).length}`;
}
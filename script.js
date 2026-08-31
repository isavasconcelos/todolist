let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentTheme = localStorage.getItem("theme") || "default";
const root = document.documentElement;

setTheme(currentTheme, false);
render();

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function setTheme(theme, saveTheme = true) {
    currentTheme = theme;
    if (saveTheme) {
        localStorage.setItem("theme", theme);
    }

    if (theme === "pink") {
        root.style.setProperty("--bg", "linear-gradient(135deg,#FFE6F0,#F7F1FF,#FFF6D8)");
        root.style.setProperty("--container", "#linear-gradient(135deg,#FFE6F0,#F7F1FF,#FFF6D8)");       
        root.style.setProperty("--primary", "#F6AFCF");
        root.style.setProperty("--primary-dark", "#E98DB6");
        root.style.setProperty("--secondary", "#FFF8FB");
        root.style.setProperty("--input", "#FFF3F8");
    } else if (theme === "blue") {
        root.style.setProperty("--bg", "linear-gradient(135deg,#DFF6FF,#EEF7FF,#FFFFFF)");
        root.style.setProperty("--container", "#linear-gradient(135deg,#DFF6FF,#EEF7FF,#FFFFFF)");
        root.style.setProperty("--primary", "#7CC6FE");
        root.style.setProperty("--primary-dark", "#4FA3F7");
        root.style.setProperty("--secondary", "#F5FBFF");
        root.style.setProperty("--input", "#EAF8FF");
    } else if (theme === "green") {
        root.style.setProperty("--bg", "linear-gradient(135deg,#EAFBE7,#F8FFF4,#FFFFFF)");
        root.style.setProperty("--container", "#linear-gradient(135deg,#EAFBE7,#F8FFF4,#FFFFFF)");
        root.style.setProperty("--primary", "#8FD3A8");
        root.style.setProperty("--primary-dark", "#69BE8B");
        root.style.setProperty("--secondary", "#F7FFF8");
        root.style.setProperty("--input", "#EDFCEF");
    } else if (theme === "purple") {
        root.style.setProperty("--bg", "linear-gradient(135deg,#F3E8FF,#FAF5FF,#FFFFFF)");
        root.style.setProperty("--container", "#linear-gradient(135deg,#F3E8FF,#FAF5FF,#FFFFFF)");
        root.style.setProperty("--primary", "#C8A2FF");
        root.style.setProperty("--primary-dark", "#A874F2");
        root.style.setProperty("--secondary", "#FBF8FF");
        root.style.setProperty("--input", "#F5EDFF");
    } else if (theme === "default") {
        root.style.setProperty("--bg", "linear-gradient(135deg,#F5F5F5,#EAEAEA,#D9D9D9)");
        root.style.setProperty("--container", "#FFFFFF");
        root.style.setProperty("--primary", "#2F2F2F");
        root.style.setProperty("--primary-dark", "#000000");
        root.style.setProperty("--secondary", "#F7F7F7");
        root.style.setProperty("--input", "#EFEFEF");
        root.style.setProperty("--subtitle", "#6E6E6E");
    }
}

function addTask() {
    const input = document.getElementById("taskInput");
    const weekday = document.getElementById("weekday").value;
    const weekly = document.getElementById("weekly").checked;

    if (input.value.trim() === "") return;

    tasks.push({
        text: input.value,
        day: weekday,
        weekly: weekly,
        done: false
    });

    input.value = "";
    document.getElementById("weekly").checked = false;
    save();
    render();
}

function toggle(index) {
    tasks[index].done = !tasks[index].done;
    save();
    render();
}

function removeTask(index) {
    if (confirm("Tem certeza que deseja apagar esta tarefa? 🗑️")) {
        tasks.splice(index, 1);
        save();
        render();
    }
}

function render() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    if (tasks.length === 0) {
        list.innerHTML = "<p>There are no tasks</p>";
        return;
    }

    tasks.forEach((task, index) => {
        list.innerHTML += `
        <div class="card">
            <div class="info">
                <h3 class="${task.done ? 'done' : ''}">${task.text}</h3>
                <span>📅 ${task.day} ${task.weekly ? '<span class="weekly"> • 🔁 Semanal</span>' : ''}</span>
            </div>
            <div class="actions">
                <button class="finish" onclick="toggle(${index})">✔</button>
                <button class="delete" onclick="removeTask(${index})">🗑</button>
            </div>
        </div>`;
    });
}

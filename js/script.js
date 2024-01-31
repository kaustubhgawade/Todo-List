// TODAYS DATE
const date = new Date();
const todayDate = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

let dateDisplay = document.getElementById("date");
let monthDisplay = document.getElementById("month");
let yearDisplay = document.getElementById("year");

dateDisplay.innerHTML = todayDate;
monthDisplay.innerHTML = month;
yearDisplay.innerHTML = year;

// ADD TASK
const addTask = document.getElementById("task-add-btn");
const newTask = document.getElementById("task-input");
const allTaskList = document.getElementById("all-task-list");

addTask.addEventListener("click", addNewTask);
function addNewTask() {
  let value = newTask.value;
  if (value !== "") {
    let taskWrapper = document.createElement("div");
    taskWrapper.classList.add("task-wrapper");

    let innerTaskWrapper = document.createElement("div");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.addEventListener("change", function () {
      updateTaskStyle(checkbox, taskNote);
    });

    let taskNote = document.createElement("span");
    taskNote.textContent = value;
    taskNote.classList.add("task-note");

    let time = document.createElement("span");
    let currHour = date.getHours();
    let currMin = date.getMinutes();
    let timeText = `${currHour}:${currMin}`;
    time.textContent = timeText;
    time.classList.add("time");

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-button");
    deleteBtn.innerHTML = "&#10006";
    deleteBtn.addEventListener("click", function () {
      taskWrapper.remove();
      saveTasks();
    });

    allTaskList.append(taskWrapper);
    taskWrapper.append(innerTaskWrapper);
    taskWrapper.append(deleteBtn);
    innerTaskWrapper.append(checkbox);
    innerTaskWrapper.append(taskNote);
    innerTaskWrapper.append(time);

    newTask.value = "";
    saveTasks();
  }
}

function updateTaskStyle(checkbox, taskNote) {
  if (checkbox.checked) {
    taskNote.style.fontStyle = "italic";
    taskNote.style.textDecoration = "line-through";
    taskNote.style.color = "red";
  } else {
    taskNote.style.fontStyle = "normal";
    taskNote.style.textDecoration = "none";
    taskNote.style.color = "blue";
  }
  saveTasks();
}

function saveTasks() {
  const tasks = Array.from(allTaskList.children).map((taskWrapper) => {
    const taskNote = taskWrapper.querySelector(".task-note");
    const checkbox = taskWrapper.querySelector(".checkbox");

    return {
      content: taskNote.textContent,
      isChecked: checkbox.checked,
    };
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
});
function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    deleteAllTask();
    const tasks = JSON.parse(storedTasks);

    tasks.forEach((task) => {
      let taskWrapper = document.createElement("div");
      taskWrapper.classList.add("task-wrapper");

      let innerTaskWrapper = document.createElement("div");

      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("checkbox");
      checkbox.checked = task.isChecked;
      checkbox.addEventListener("change", function () {
        updateTaskStyle(checkbox, taskNote);
      });

      let taskNote = document.createElement("span");
      taskNote.textContent = task.content;
      taskNote.classList.add("task-note");

      let deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-button");
      deleteBtn.innerHTML = "&#10006";
      deleteBtn.addEventListener("click", function () {
        taskWrapper.remove();
        saveTasks();
      });

      allTaskList.append(taskWrapper);
      taskWrapper.append(innerTaskWrapper);
      taskWrapper.append(deleteBtn);
      innerTaskWrapper.append(checkbox);
      innerTaskWrapper.append(taskNote);

      updateTaskStyle(checkbox, taskNote);
    });
  }
}

// DELETE ALL TASKS
const deleteAllTasks = document.getElementById("delete-all-tasks");
deleteAllTasks.addEventListener("click", deleteAllTask);
function deleteAllTask() {
  const taskWrapper = document.querySelectorAll(".task-wrapper");
  taskWrapper.forEach((element) => {
    element.remove();
    saveTasks();
  });
}

// EVENT  LISTENERS
document.addEventListener("keyup", () => {
  if (event.key === "Enter") {
    addNewTask();
  }
});

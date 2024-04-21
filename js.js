// document.addEventListener("DOMContentLoaded", function() {
//     const taskInput = document.getElementById("taskInput");
//     const addBtn = document.getElementById("addBtn");
//     const taskList = document.getElementById("taskList");
  
//     addBtn.addEventListener("click", function() {
//       const taskText = taskInput.value.trim();
//       if (taskText !== "") {
//         createTask(taskText);
//         taskInput.value = "";
//       }
//     });
  
//     function createTask(taskText) {
//       const li = document.createElement("li");
//       li.innerHTML = `
//         <input type="checkbox">
//         <span>${taskText}</span>
//         <button class="delete-btn">X</button>
//       `;
//       taskList.appendChild(li);
//     }
  
//     taskList.addEventListener("click", function(e) {
//       if (e.target.tagName === "INPUT") {
//         e.target.parentNode.classList.toggle("completed");
//       } else if (e.target.classList.contains("delete-btn")) {
//         e.target.parentNode.remove();
//       }

//     });
//   });
document.addEventListener("DOMContentLoaded", function() {
  const taskInput = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  const taskList = document.getElementById("taskList");

  addBtn.addEventListener("click", function() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      createTask(taskText);
      saveTasksToLocalStorage(); // Save tasks to local storage
      taskInput.value = "";
    }
  });

  function createTask(taskText) {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox">
      <span>${taskText}</span>
      <button class="delete-btn">X</button>
    `;
    taskList.appendChild(li);
  }

  taskList.addEventListener("click", function(e) {
    if (e.target.tagName === "INPUT") {
      e.target.parentNode.classList.toggle("completed");
      saveTasksToLocalStorage(); // Save tasks to local storage
    } else if (e.target.classList.contains("delete-btn")) {
      e.target.parentNode.remove();
      saveTasksToLocalStorage(); // Save tasks to local storage
    }
  });

  // Function to save tasks to local storage
  function saveTasksToLocalStorage() {
    const tasks = [];
    const taskElements = taskList.querySelectorAll("li");
    taskElements.forEach(function(taskElement) {
      const taskText = taskElement.querySelector("span").textContent;
      const isCompleted = taskElement.classList.contains("completed");
      tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Function to load tasks from local storage when the page is loaded
  function loadTasksFromLocalStorage() {
    const tasksJSON = localStorage.getItem("tasks");
    if (tasksJSON) {
      const tasks = JSON.parse(tasksJSON);
      tasks.forEach(function(task) {
        createTaskFromData(task);
      });
    }
  }

  // Function to create tasks from data loaded from local storage
  function createTaskFromData(task) {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""}>
      <span>${task.text}</span>
      <button class="delete-btn">X</button>
    `;
    if (task.completed) {
      li.classList.add("completed");
    }
    taskList.appendChild(li);
  }

  // Load tasks from local storage when the page is loaded
  loadTasksFromLocalStorage();
});

    
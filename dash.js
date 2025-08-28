function showSection(sectionId) {
  document
    .querySelectorAll(".section")
    .forEach((sec) => (sec.style.display = "none"));
  document.getElementById(sectionId).style.display = "block";
}

function logout() {
  alert("You have been logged out.");
  window.location.href = "login.html";
}

// To-Do List
function addTask() {
  let taskInput = document.getElementById("taskInput");
  let task = taskInput.value.trim();
  if (task) {
    let li = document.createElement("li");
    li.textContent = task;
    document.getElementById("taskList").appendChild(li);
    taskInput.value = "";
  }
}

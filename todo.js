function showSection(id) {
        document.querySelectorAll(".section").forEach((section) => {
          section.classList.remove("active");
        });
        document.getElementById(id).classList.add("active");
      }

      function logout() {
        alert("Logging out...");
        window.location.href = "login.html";
      }

      function addTask() {
        const taskInput = document.getElementById("taskInput");
        const taskList = document.getElementById("taskList");

        if (taskInput.value.trim() !== "") {
          const li = document.createElement("li");
          li.textContent = taskInput.value;

          li.addEventListener("click", function () {
            this.remove();
            document.getElementById("completedTaskList").appendChild(this);
          });

          taskList.appendChild(li);
          taskInput.value = "";
        }
      }
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const role = document.getElementById('role').value;

  if(username === "" || password === "" || role === "") {
    showAlert("Please fill in all fields and select a role");
    return;
  }

  // Redirect based on role
  if(username === "ADOC JOAN" && password === "Joan law 5" && role === "CEO") {
    localStorage.setItem("loggedInUser", username);
    localStorage.setItem("userRole", role);
    window.location.href = "ceo_dashboard.html"; // CEO goes to CEO dashboard
  } 
  else if(username === "ManagerUser" && password === "ManagerPass" && role === "Manager") {
    localStorage.setItem("loggedInUser", username);
    localStorage.setItem("userRole", role);
    window.location.href = "manager_dashboard.html"; // Manager dashboard
  } 
  else if(username === "WorkerUser" && password === "WorkerPass" && role === "Worker") {
    localStorage.setItem("loggedInUser", username);
    localStorage.setItem("userRole", role);
    window.location.href = "worker_dashboard.html"; // Worker dashboard
  } 
  else {
    showAlert("Invalid username, password, or role!");
  }
});

    
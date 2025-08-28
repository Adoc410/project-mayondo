const inventoryTable = document.querySelector("#inventoryTable tbody");
const addItemSection = document.getElementById("addItemSection");
const addBtn = document.getElementById("addBtn");
const logoutBtn = document.getElementById("logoutBtn");
const welcomeMsg = document.getElementById("welcome");

// Get logged user & role
const username = localStorage.getItem("loggedInUser");
const role = localStorage.getItem("userRole");

if (!username || !role) {
  window.location.href = "login.html"; // redirect if not logged in
}

welcomeMsg.textContent = `Welcome ${username} (${role})`;

// Default inventory data
let inventory = JSON.parse(localStorage.getItem("inventory")) || [
  { name: "Chair", qty: 20, price: 25 },
  { name: "Table", qty: 10, price: 80 },
  { name: "Wardrobe", qty: 5, price: 150 },
];

// Render inventory
function renderInventory() {
  inventoryTable.innerHTML = "";
  inventory.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.qty}</td>
          <td>${item.price}</td>
          ${
            role === "Manager" || role === "CEO"
              ? `<td><button class="deleteBtn" onclick="deleteItem(${index})">Delete</button></td>`
              : `<td>View Only</td>`
          }
        `;
    inventoryTable.appendChild(row);
  });
  localStorage.setItem("inventory", JSON.stringify(inventory));
}

// Add new it em (only for Manager & CEO)
if (role === "Worker") {
  addItemSection.style.display = "none";
  document.getElementById("actionCol").style.display = "none";
} else {
  addBtn.addEventListener("click", () => {
    const name = document.getElementById("itemName").value.trim();
    const qty = parseInt(document.getElementById("itemQty").value);
    const price = parseFloat(document.getElementById("itemPrice").value);

    if (name === "" || isNaN(qty) || isNaN(price)) {
      alert("Please enter valid item details.");
      return;
    }

    inventory.push({ name, qty, price });
    renderInventory();

    document.getElementById("itemName").value = "";
    document.getElementById("itemQty").value = "";
    document.getElementById("itemPrice").value = "";
  });
}

// Delete item (Manager & CEO only)
function deleteItem(index) {
  inventory.splice(index, 1);
  renderInventory();
}
window.deleteItem = deleteItem; // make function global

// // Logout
// logoutBtn.addEventListener("click", () => {
//   localStorage.removeItem("loggedInUser");
//   localStorage.removeItem("userRole");
//   window.location.href = "login.html";
// });

// Initial render
renderInventory();

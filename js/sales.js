const salesTable = document.querySelector("#salesTable tbody");
const addSaleSection = document.getElementById("addSaleSection");
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

// Default sales data
let sales = JSON.parse(localStorage.getItem("sales")) || [
  { product: "Chair", qty: 5, total: 125 },
  { product: "Table", qty: 2, total: 160 },
  { product: "Wardrobe", qty: 1, total: 150 },
];

// Render sales
function renderSales() {
  salesTable.innerHTML = "";
  sales.forEach((sale, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${sale.product}</td>
          <td>${sale.qty}</td>
          <td>${sale.total}</td>
          ${
            role === "Manager" || role === "CEO"
              ? `<td><button class="deleteBtn" onclick="deleteSale(${index})">Delete</button></td>`
              : `<td>View Only</td>`
          }
        `;
    salesTable.appendChild(row);
  });
  localStorage.setItem("sales", JSON.stringify(sales));
}

// Add new sale (Manager & CEO only)
if (role === "Worker") {
  addSaleSection.style.display = "none";
  document.getElementById("actionCol").style.display = "none";
} else {
  addBtn.addEventListener("click", () => {
    const product = document.getElementById("saleProduct").value.trim();
    const qty = parseInt(document.getElementById("saleQty").value);
    const total = parseFloat(document.getElementById("saleTotal").value);

    if (product === "" || isNaN(qty) || isNaN(total)) {
      alert("Please enter valid sale details.");
      return;
    }

    sales.push({ product, qty, total });
    renderSales();

    document.getElementById("saleProduct").value = "";
    document.getElementById("saleQty").value = "";
    document.getElementById("saleTotal").value = "";
  });
}

// Delete sale
function deleteSale(index) {
  sales.splice(index, 1);
  renderSales();
}
window.deleteSale = deleteSale;

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("userRole");
  window.location.href = "login.html";
});

// Initial render
renderSales();

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
  const cartTableBody = document.querySelector("#cartTable tbody");
  const totalPriceEl = document.getElementById("totalPrice");
  cartTableBody.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const row = `
          <tr>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td><button onclick="removeItem(${index})">Remove</button></td>
          </tr>
        `;
    cartTableBody.innerHTML += row;
  });

  totalPriceEl.textContent = `Total: $${total}`;
}

function removeItem(index) {
  const removed = cart[index].name;
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  showToast(`${removed} removed `);
}

function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  showToast("Cart cleared ");
}

function checkout() {
  if (cart.length === 0) {
    showToast("Your cart is empty!");
    return;
  }
  showToast("Checkout successful ");
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Load cart on page load
updateCart();

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCounter() {
  document.getElementById("cartCounter").textContent = `Cart (${cart.length})`;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function addToCart(productName, price) {
  const product = { name: productName, price: price };
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();
  showToast(`${productName} added to cart ✅`);
}

// Initialize counter on page load
updateCartCounter();

// Click on cart counter → go to cart page
document.getElementById("cartCounter").addEventListener("click", () => {
  showToast("Redirecting to Cart...");
  setTimeout(() => {
    window.location.href = "cart.html";
  }, 1500);
});

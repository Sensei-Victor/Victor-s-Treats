let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cart-count");

let totalItems = 0;

cart.forEach((item) => {
  totalItems += item.quantity;
});

cartCount.textContent = totalItems;

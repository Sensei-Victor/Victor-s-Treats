let cart = JSON.parse(localStorage.getItem("cart")) || [];
// GET CART COUNT
const cartCount = document.getElementById("cart-count");
// CALCULATE TOTAL ITEMS
let totalItems = 0;

cart.forEach((item) => {
  totalItems += item.quantity;
});
cartCount.textContent = totalItems;

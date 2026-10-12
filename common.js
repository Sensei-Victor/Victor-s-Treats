function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) return;

  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
  } catch (error) {
    cart = [];
  }

  let totalItems = 0;
  cart.forEach((item) => {
    totalItems += item.quantity;
  });

  cartCount.textContent = totalItems;
}

updateCartCount();

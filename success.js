let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cart-count");

let totalItems = 0;

cart.forEach((item) => {
  totalItems += item.quantity;
});

cartCount.textContent = totalItems;

const transferDetails = document.getElementById("transfer-details");
const transferTotal = document.getElementById("transfer-total");

try {
  const lastOrder = JSON.parse(localStorage.getItem("lastOrder"));

  if (lastOrder && lastOrder.payment === "transfer") {
    transferTotal.textContent = "₦" + lastOrder.total.toLocaleString();
    transferDetails.hidden = false;
  }
} catch (error) {
  // ignore bad data
}

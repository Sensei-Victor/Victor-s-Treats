let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cart-count");
const checkoutItems = document.getElementById("checkout-items");
const checkoutSubtotal = document.getElementById("checkout-subtotal");
const checkoutDelivery = document.getElementById("checkout-delivery");
const checkoutTotal = document.getElementById("checkout-total");
const checkoutForm = document.getElementById("checkout-form");

function updateCartCount() {
  let totalItems = 0;

  cart.forEach((item) => {
    totalItems += item.quantity;
  });

  cartCount.textContent = totalItems;
}

function displayCheckoutItems() {
  checkoutItems.innerHTML = "";

  if (cart.length === 0) {
    checkoutItems.innerHTML = `
      <div class="empty-order">
        <p>Your cart is empty.</p>

        <a href="home.html#menu">
          Go To Menu
        </a>
      </div>
    `;

    checkoutSubtotal.textContent = "₦0";
    checkoutDelivery.textContent = "₦0";
    checkoutTotal.textContent = "₦0";

    return;
  }

  cart.forEach((item) => {
    const checkoutItem = document.createElement("div");

    checkoutItem.classList.add("checkout-item");

    checkoutItem.innerHTML = `
      <div class="checkout-item-info">

        <h3>${item.name}</h3>

        <p>
          ₦${item.price.toLocaleString()} × ${item.quantity}
        </p>

      </div>

      <div class="checkout-item-total">

        ₦${(item.price * item.quantity).toLocaleString()}

      </div>
    `;

    checkoutItems.appendChild(checkoutItem);
  });

  updateCheckoutTotal();
}

function updateCheckoutTotal() {
  let subtotal = 0;

  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  let delivery = 0;
  let total = subtotal + delivery;

  checkoutSubtotal.textContent = "₦" + subtotal.toLocaleString();
  checkoutDelivery.textContent = "₦" + delivery.toLocaleString();
  checkoutTotal.textContent = "₦" + total.toLocaleString();
}

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty!");

    return;
  }

  const name = document.getElementById("name").value;
  const payment = document.getElementById("payment").value;

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
  });


  localStorage.removeItem("cart");

  cart = [];

  window.location.href = "success.html";
});


updateCartCount();

displayCheckoutItems();

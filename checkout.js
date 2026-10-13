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

        <a href="index.html#menu">
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

  let delivery = cart.length > 0 ? 1000 : 0;
  let total = subtotal + delivery;

  checkoutSubtotal.textContent = "₦" + subtotal.toLocaleString();
  checkoutDelivery.textContent = "₦" + delivery.toLocaleString();
  checkoutTotal.textContent = "₦" + total.toLocaleString();
}

checkoutForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const button = document.getElementById("place-order-btn");
  button.disabled = true;
  button.textContent = "Placing order...";

  const name = document.getElementById("name").value;

  let subtotal = 0;
  const items = cart
    .map((item) => {
      subtotal += item.price * item.quantity;
      return (
        item.name +
        " x" +
        item.quantity +
        " = ₦" +
        (item.price * item.quantity).toLocaleString()
      );
    })
    .join("\n");

  const delivery = 1000;
  const total = subtotal + delivery;

  const order = {
    _subject: "New Order from " + name,
    name: name,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    payment: document.getElementById("payment").value,
    items: items,
    subtotal: "₦" + subtotal.toLocaleString(),
    delivery: "₦" + delivery.toLocaleString(),
    total: "₦" + total.toLocaleString(),
  };

  try {
    const response = await fetch("https://formspree.io/f/myekdkwa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      localStorage.setItem(
        "lastOrder",
        JSON.stringify({ payment: order.payment, total: total }),
      );
      localStorage.removeItem("cart");
      cart = [];
      window.location.href = "success.html";
    } else {
      throw new Error("Failed");
    }
  } catch (error) {
    alert(
      "Sorry, your order could not be sent. Please call 09076770312 to order.",
    );
    button.disabled = false;
    button.textContent = "Place Order";
  }
});

updateCartCount();

displayCheckoutItems();

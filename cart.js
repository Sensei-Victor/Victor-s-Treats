let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsContainer = document.getElementById("cart-items-container");
const subtotalElement = document.getElementById("subtotal");
const deliveryElement = document.getElementById("delivery");
const totalElement = document.getElementById("total");
const cartCountElement = document.getElementById("cart-count");
const checkoutButton = document.getElementById("checkout-btn");

function displayCart() {
  // Clear previous cart display
  cartItemsContainer.innerHTML = "";
  // EMPTY CART
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <h3>Your cart is empty 🛒</h3>
        <p>Add some delicious food from our menu!</p>
      </div>
    `;
    updateCartTotal();
    return;
  }

  // DISPLAY EACH CART ITEM
  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <img 
        src="${item.image}" 
        alt="${item.name}"
        class="cart-item-image"
      />


      <div class="cart-item-details">

        <h3>${item.name}</h3>

        <p class="cart-price">
          ₦${item.price.toLocaleString()}
        </p>
        <div class="quantity-controls">

          <button 
            class="quantity-btn decrease"
            data-index="${index}"
          >
            −
          </button>

          <span class="quantity">
            ${item.quantity}
          </span>


          <button 
            class="quantity-btn increase"
            data-index="${index}"
          >
            +
          </button>

        </div>

      </div>
      <div class="cart-item-right">
        <p class="item-total">
          ₦${(item.price * item.quantity).toLocaleString()}
        </p>

        <button 
          class="remove-btn"
          data-index="${index}"
        >
          Remove
        </button>

      </div>

    `;

    cartItemsContainer.appendChild(cartItem);
  });

  // ADD BUTTON EVENTS
  addCartEvents();

  updateCartTotal();
}
// ADD CART BUTTON EVENTS

function addCartEvents() {
  // INCREASE QUANTITY

  const increaseButtons = document.querySelectorAll(".increase");

  increaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;

      cart[index].quantity++;

      saveCart();

      displayCart();
    });
  });

  // DECREASE QUANTITY

  const decreaseButtons = document.querySelectorAll(".decrease");

  decreaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;

      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }

      saveCart();

      displayCart();
    });
  });

  // REMOVE ITEM

  const removeButtons = document.querySelectorAll(".remove-btn");

  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;

      // Remove item

      cart.splice(index, 1);

      saveCart();

      displayCart();
    });
  });
}
// UPDATE CART TOTAL

function updateCartTotal() {
  let subtotal = 0;

  // CALCULATE SUBTOTAL

  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  // DELIVERY PRICE

  let delivery = cart.length > 0 ? 1000 : 0;
  // TOTAL

  let total = subtotal + delivery;

  // DISPLAY PRICES

  subtotalElement.textContent = "₦" + subtotal.toLocaleString();

  deliveryElement.textContent = "₦" + delivery.toLocaleString();

  totalElement.textContent = "₦" + total.toLocaleString();

  // UPDATE CART COUNT

  let totalItems = 0;

  cart.forEach((item) => {
    totalItems += item.quantity;
  });

  cartCountElement.textContent = totalItems;
}

// SAVE CART

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");

    return;
  }
  window.location.href = "checkout.html";
});

displayCart();

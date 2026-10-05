
// CATEGORY FILTERING

const categoryButtons = document.querySelectorAll(".category-btn");
const foodCards = document.querySelectorAll(".food-card");

categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
    // Remove active class from all buttons
    categoryButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active class to clicked button
    button.classList.add("active");
    const selectedCategory = button.dataset.category;

    // Show or hide food cards
    foodCards.forEach((card) => {
      const cardCategory = card.dataset.category;

      if (selectedCategory === "all" || cardCategory === selectedCategory) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// GET ADD TO CART BUTTONS
const addCartButtons = document.querySelectorAll(".add-cart");
// GET CART FROM LOCAL STORAGE
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// ADD TO CARTS
addCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Find the food card containing the clicked button
    const foodCard = button.closest(".food-card");
    // Get food information
    const name = foodCard.querySelector("h3").textContent;
    const priceText = foodCard.querySelector("strong").textContent;
    const price = Number(priceText.replace("₦", "").replace(/,/g, ""));
    const image = foodCard.querySelector("img").getAttribute("src");
    // Check if item already exists
    const existingItem = cart.find((item) => item.name === name);

    // Increase quantity if it already exists
    if (existingItem) {
      existingItem.quantity++;
    }
    // Otherwise add a new item
    else {
      cart.push({
        name: name,
        price: price,
        image: image,
        quantity: 1,
      });
    }
    // Save cart
    localStorage.setItem("cart", JSON.stringify(cart));
    // Update cart number
    updateCartCount();
    // Message
    alert(name + " added to cart!");
  });
});

// UPDATE CART COUNT
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");

  if (!cartCount) return;

  let totalItems = 0;

  cart.forEach((item) => {
    totalItems += item.quantity;
  });

  cartCount.textContent = totalItems;
}
// RUN CART COUNT
updateCartCount();

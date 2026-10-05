
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// GET CART COUNT
const cartCount = document.getElementById("cart-count");
// UPDATE CART COUNT
function updateCartCount() {
  let totalItems = 0;

  cart.forEach((item) => {
    totalItems += item.quantity;
  });

  cartCount.textContent = totalItems;
}

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;

  formMessage.textContent =
    "Thank you, " +
    name +
    "! Your message has been received. We will get back to you soon.";
  formMessage.classList.add("success-message");
  contactForm.reset();
});

updateCartCount();

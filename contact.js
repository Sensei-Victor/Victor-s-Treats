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

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const submitButton = contactForm.querySelector("button");

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  const data = {
    name: name,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  try {
    const response = await fetch("https://formspree.io/f/mkjovgrq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      formMessage.textContent =
        "Thank you, " +
        name +
        "! Your message has been sent. We will get back to you soon.";
      formMessage.className = "success-message";
      contactForm.reset();
    } else {
      throw new Error("Failed");
    }
  } catch (error) {
    formMessage.textContent =
      "Sorry, your message could not be sent. Please call 09076770312 instead.";
    formMessage.className = "error-message";
  }

  submitButton.disabled = false;
  submitButton.textContent = "Send Message";
});

updateCartCount();

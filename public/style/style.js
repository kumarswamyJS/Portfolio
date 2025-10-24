// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const themeLabels = document.querySelectorAll(".theme-label");

// Set default to dark mode on first load
const savedTheme = localStorage.getItem("theme") || "dark";

// Apply the saved theme
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  themeLabels[0].style.opacity = "0.5";
  themeLabels[1].style.opacity = "1";
} else {
  document.body.classList.remove("dark-theme");
  themeLabels[0].style.opacity = "1";
  themeLabels[1].style.opacity = "0.5";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  if (document.body.classList.contains("dark-theme")) {
    themeLabels[0].style.opacity = "0.5";
    themeLabels[1].style.opacity = "1";
    localStorage.setItem("theme", "dark");
  } else {
    themeLabels[0].style.opacity = "1";
    themeLabels[1].style.opacity = "0.5";
    localStorage.setItem("theme", "light");
  }
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navigationLinks = document.querySelector(".navigation-links");

mobileMenuToggle.addEventListener("click", () => {
  navigationLinks.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".navigation-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navigationLinks.classList.remove("active");
  });
});

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(
    ".about-text, .technology-card, .project-card, .certificate-section, .hobbies-section"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Form animation on focus
document.querySelectorAll(".form-control").forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "translateY(-5px)";
    this.parentElement.style.transition = "transform 0.3s ease";
  });

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "translateY(0)";
  });
});

const contactForm = document.getElementById("contactForm");
const submitButton = document.getElementById("submitButton");
const loadingIndicator = document.getElementById("loadingIndicator");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Disable submit button and show loading indicator
  submitButton.disabled = true;
  loadingIndicator.classList.add("show");
  formMessage.classList.remove("show");

  // Get form data
  const formData = new FormData(contactForm);
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  try {
    // Send POST request to the server
    const response = await fetch("/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      // Show success message
      showMessage("Your message has been sent successfully!", "success");
      // Reset form
      contactForm.reset();
    } else {
      // Show error message
      showMessage("Failed to send your message. Please try again.", "error");
    }
  } catch (error) {
    console.error("Error:", error);
    showMessage("An error occurred. Please try again later.", "error");
  } finally {
    // Re-enable submit button and hide loading indicator
    submitButton.disabled = false;
    loadingIndicator.classList.remove("show");
  }
});

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = `form-message ${type} show`;

  // Hide message after 2.5 seconds
  setTimeout(() => {
    formMessage.classList.remove("show");
  }, 2500);
}

const heroText = "Hi, I'm Kumarswamy J S ";
const typingSpeed = 120; // milliseconds per character
let heroIndex = 0;

function typeHeroText() {
  if (heroIndex < heroText.length) {
    document.getElementById("typing-text").innerHTML +=
      heroText.charAt(heroIndex);
    heroIndex++;
    setTimeout(typeHeroText, typingSpeed);
  }
}

// Start typing effect after page loads
window.addEventListener("DOMContentLoaded", typeHeroText);

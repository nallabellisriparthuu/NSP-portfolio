// =========================
// Navbar Toggle (Mobile)
// =========================
function toggleMenu() {
  document.querySelector(".navbar").classList.toggle("show");
}

// Close mobile menu when a nav link is clicked (for better UX)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.navbar').classList.remove('show');
  });
});

// Allow menu toggle with keyboard (accessibility)
document.querySelector('.menu-icon').addEventListener('keydown', function (e) {
  if (e.key === 'Enter' || e.key === ' ') {
    toggleMenu();
  }
});

// =========================
// Home Section Typing Effect
// =========================
const nameText = "Hi, I'm Sriparthu";
const contentText =
  "Passionate Frontend Developer skilled in HTML, CSS, JavaScript, and ReactJS, dedicated to creating responsive, user-friendly, and visually appealing web applications.";

let nameIndex = 0;
let contentIndex = 0;
const typingSpeedIndex = 125;
const typingSpeedContent = 45;
const delayAfterName = 50;
const delayAfterContent = 500;

const nameElement = document.getElementById("typing-name");
const contentElement = document.getElementById("typing-content");
const resumeButton = document.getElementById("resume-button");

function typeName() {
  if (nameIndex < nameText.length) {
    nameElement.innerHTML += nameText.charAt(nameIndex);
    nameIndex++;
    setTimeout(typeName, typingSpeedIndex);
  } else {
    setTimeout(typeContent, delayAfterName);
  }
}

function typeContent() {
  if (contentIndex < contentText.length) {
    contentElement.innerHTML += contentText.charAt(contentIndex);
    contentIndex++;
    setTimeout(typeContent, typingSpeedContent);
  } else {
    setTimeout(showResumeButton, delayAfterContent);
  }
}

function showResumeButton() {
  resumeButton.style.display = "block";
  resumeButton.style.opacity = "0";
  resumeButton.style.transition = "opacity 1s ease-in-out";
  setTimeout(() => {
    resumeButton.style.opacity = "1";
  }, 100);
}

// Start typing effect on page load
window.addEventListener('DOMContentLoaded', typeName);

// =========================
// Projects Section - Load More
// =========================
document.getElementById("load-more-btn").addEventListener("click", function () {
  let hiddenProjects = document.querySelectorAll(".project-hidden");
  hiddenProjects.forEach((project, index) => {
    setTimeout(() => {
      project.style.display = "block";
      project.classList.remove("hidden");
    }, index * 200);
  });
  this.style.display = "none";
});

// =========================
// Contact Form Validation
// =========================
document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();
  let successMessage = document.getElementById("success-message");

  // Basic validation
  if (name === "" || email === "" || message === "") {
    alert("Please fill out all fields.");
    return;
  }
  if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Show success message
  successMessage.classList.remove("hidden");

  // Clear form fields
  this.reset();

  // Hide success message after 3 seconds
  setTimeout(() => {
    successMessage.classList.add("hidden");
  }, 3000);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// =========================
// Accessibility: Allow Enter key to submit form on last field
// =========================
document.getElementById("message").addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    document.querySelector(".submit-btn").click();
  }
});


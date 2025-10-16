// ...existing code...
document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // AOS Animation Init
  // =========================
  if (window.AOS && typeof AOS.init === "function") {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }

  // =========================
  // Navbar Toggle (Mobile)
  // =========================
  function toggleMenu() {
    const nav = document.querySelector(".navbar");
    if (nav) nav.classList.toggle("show");
  }

  const menuIcon = document.querySelector(".menu-icon");
  const navLinks = document.querySelectorAll(".nav-link");
  if (navLinks.length) {
    navLinks.forEach((link) =>
      link.addEventListener("click", () => {
        const nav = document.querySelector(".navbar");
        if (nav) nav.classList.remove("show");
      })
    );
  }
  if (menuIcon) {
    menuIcon.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") toggleMenu();
    });
  }

  // =========================
  // Typing Effect
  // =========================
  const nameText = "Hi, I'm Sriparthu ";
  const contentText =
    "Passionate Frontend Developer skilled in HTML, CSS, JavaScript, and ReactJS, dedicated to creating responsive, user-friendly, and visually appealing web applications.";
  const nameElement = document.getElementById("typing-name");
  const contentElement = document.getElementById("typing-content");
  const resumeButton = document.getElementById("resume-button");
  let nameIndex = 0,
    contentIndex = 0;
  const typingSpeedName = 125,
    typingSpeedContent = 45,
    delayAfterName = 50;

  function typeName() {
    if (!nameElement) return;
    if (nameIndex < nameText.length) {
      nameElement.innerHTML += nameText.charAt(nameIndex++);
      setTimeout(typeName, typingSpeedName);
    } else setTimeout(typeContent, delayAfterName);
  }

  function typeContent() {
    if (!contentElement) return;
    if (contentIndex < contentText.length) {
      contentElement.innerHTML += contentText.charAt(contentIndex++);
      setTimeout(typeContent, typingSpeedContent);
    } else showResumeButton();
  }

  function showResumeButton() {
    if (!resumeButton) return;
    resumeButton.style.display = "block";
    resumeButton.style.opacity = "0";
    resumeButton.style.transition = "opacity 1s ease-in-out";
    setTimeout(() => {
      resumeButton.style.opacity = "1";
    }, 100);
  }

  typeName();

  // =========================
  // Load More Projects
  // =========================
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      const hiddenProjects = document.querySelectorAll(".project-hidden");
      hiddenProjects.forEach((project, index) => {
        setTimeout(() => {
          project.style.display = "block";
          if (window.AOS && typeof AOS.refresh === "function") AOS.refresh();
        }, index * 200);
      });
      this.style.display = "none";
    });
  }

  // =========================
  // EmailJS Contact Form (robust init + in-page messages)
  // =========================
  (function initEmailJS() {
    const PUBLIC_KEY = "pGffREMUo0ReUy7jM";
    if (window.emailjs && typeof emailjs.init === "function") {
      try {
        emailjs.init(PUBLIC_KEY);
      } catch (e) {
        console.warn("EmailJS init failed:", e);
      }
      return;
    }
    // wait up to 5s for emailjs to load
    let waited = 0;
    const interval = setInterval(() => {
      if (window.emailjs && typeof emailjs.init === "function") {
        try {
          emailjs.init(PUBLIC_KEY);
        } catch (e) {
          console.warn("EmailJS init failed:", e);
        }
        clearInterval(interval);
      } else if (waited >= 5000) {
        clearInterval(interval);
        console.warn(
          "EmailJS not available after waiting — form won't send emails."
        );
      }
      waited += 200;
    }, 200);
  })();

  const contactForm = document.getElementById("contact-form");
  const formMessageEl = document.getElementById("form-message");

  function showFormMessage(msg, type = "info", timeout = 4000) {
    if (!formMessageEl) {
      alert(msg);
      return;
    }
    formMessageEl.textContent = msg;
    formMessageEl.classList.remove("hidden");
    if (type === "success") {
      formMessageEl.style.color = "green";
    } else if (type === "error") {
      formMessageEl.style.color = "crimson";
    } else {
      formMessageEl.style.color = "";
    }
    setTimeout(() => {
      formMessageEl.classList.add("hidden");
      formMessageEl.textContent = "";
    }, timeout);
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        showFormMessage("Please fill out all fields.", "error");
        return;
      }
      if (!isValidEmail(email)) {
        showFormMessage("Please enter a valid email.", "error");
        return;
      }

      if (window.emailjs && typeof emailjs.send === "function") {
        emailjs
          .send("service_3z2lewp", "template_18s2cvr", {
            from_name: name,
            from_email: email,
            message,
          })
          .then(() => {
            showFormMessage("Message sent successfully! ✅", "success");
            contactForm.reset();
          })
          .catch((err) => {
            if (err && err.status === 418) {
              showFormMessage(
                "Message failed: unsupported EmailJS SDK version. Check console and update SDK.",
                "error",
                7000
              );
              console.error("EmailJS Error (unsupported SDK):", err);
            } else {
              showFormMessage(
                "Failed to send message. Please try again later.",
                "error"
              );
              console.error("EmailJS Error:", err);
            }
          });
      } else {
        console.warn("EmailJS not available — form submission skipped.");
        showFormMessage(
          "Messaging currently unavailable — please try again later.",
          "error"
        );
        contactForm.reset();
      }
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Submit on Enter key in message field
  const messageField = document.getElementById("message");
  if (messageField) {
    messageField.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const submitBtn = document.querySelector(".submit-btn");
        if (submitBtn) submitBtn.click();
      }
    });
  }

  // Expose for inline onclick
  window.toggleMenu = toggleMenu;
});

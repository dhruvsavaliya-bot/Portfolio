document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     TYPING EFFECT
  =============================== */
  const roles = ["Web Developer", "Data Analyst"];
  let i = 0, j = 0, deleting = false;
  const text = document.getElementById("dynamic-text");

  function typeEffect() {
    const word = roles[i];
    text.textContent = word.substring(0, j);

    if (!deleting && j < word.length) j++;
    else if (deleting && j > 0) j--;
    else {
      deleting = !deleting;
      if (!deleting) i = (i + 1) % roles.length;
    }
    setTimeout(typeEffect, deleting ? 60 : 120);
  }
  typeEffect();

  /* ===============================
     CONTACT FORM (FIXED)
  =============================== */
 /* CONTACT FORM → OPEN GMAIL */
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const subject = `Portfolio Contact from ${name}`;
  const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;

  window.location.href =
    `mailto:dhruvsavaliya1306@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
});


  /* ===============================
     SCROLL ANIMATION
  =============================== */
  const animated = document.querySelectorAll(".animate");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  animated.forEach(el => observer.observe(el));

  /* ===============================
     THEME TOGGLE (FIXED)
  =============================== */
  
});


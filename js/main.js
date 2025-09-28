document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Project filtering
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"));
    // Add active class to clicked button
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projectCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// Intersection Observer for fade-in animations
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

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Add some dynamic interactions
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // ——— TYPEWRITER ———
  const phrases = ["Full‑Stack Developer", "Cloud Engineer", "Problem Solver"];
  const typedText = document.getElementById("typed-text");
  const cursor = document.querySelector(".cursor");
  let phraseIndex = 0,
    charIndex = 0,
    isDeleting = false;

  function type() {
    const current = phrases[phraseIndex];
    // **use pre‑decrement** when deleting, so charIndex never goes negative
    charIndex = isDeleting ? Math.max(charIndex - 1, 0) : charIndex + 1;

    typedText.textContent = current.substring(0, charIndex);

    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? 100 : 150);
    }
  }
  type();

  // ——— FLOATING CODE ELEMENTS ———
  // Add subtle mouse interaction to code elements
  const codeElements = document.querySelectorAll('.code-element');
  
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    codeElements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const elementX = rect.left + rect.width / 2;
      const elementY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(mouseX - elementX, 2) + Math.pow(mouseY - elementY, 2)
      );
      
      if (distance < 200) {
        const force = (200 - distance) / 200;
        const angle = Math.atan2(elementY - mouseY, elementX - mouseX);
        const moveX = Math.cos(angle) * force * 10;
        const moveY = Math.sin(angle) * force * 10;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${force * 45}deg)`;
        element.style.opacity = Math.min(0.3, 0.1 + force * 0.2);
      } else {
        element.style.transform = 'translate(0, 0) rotate(0deg)';
        element.style.opacity = '';
      }
    });
  });
  
  // Reset on mouse leave
  document.addEventListener('mouseleave', () => {
    codeElements.forEach(element => {
      element.style.transform = 'translate(0, 0) rotate(0deg)';
      element.style.opacity = '';
    });
  });
});

// Theme switching functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const body = document.body;

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);

// Update icon based on current theme
function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeIcon.className = 'fas fa-sun';
  } else {
    themeIcon.className = 'fas fa-moon';
  }
}

// Initialize icon
updateThemeIcon(savedTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});
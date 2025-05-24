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
  const phrases = ["Full‑Stack Developer", "Data Scientist", "Problem Solver"];
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

  // ——— STARFIELD ———
  const canvas = document.getElementById("starfield");
  const ctx = canvas.getContext("2d");

  // **1) Declare stars array and shooting star state first**
  const stars = [];
  let shooting = null;

  // 2) resize handler generates stars to fill the canvas
  function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    stars.length = 0; // clear old stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.3,
      });
    }
  }

  // hook up resize and call once
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // 3) Draw loop
  function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // static stars
    ctx.fillStyle = "white";
    stars.forEach((s) => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // maybe spawn a shooting star
    if (!shooting && Math.random() < 0.005) {
      shooting = {
        x: Math.random() * canvas.width,
        y: -20,
        len: Math.random() * 150 + 50,
        speed: Math.random() * 5 + 4,
      };
    }

    // draw shooting star
    if (shooting) {
      ctx.strokeStyle = "rgba(255,255,255,0.8)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(shooting.x, shooting.y);
      ctx.lineTo(shooting.x + shooting.len, shooting.y + shooting.len * 0.2);
      ctx.stroke();

      shooting.x += shooting.speed;
      shooting.y += shooting.speed * 0.2;

      if (shooting.x > canvas.width || shooting.y > canvas.height) {
        shooting = null;
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
});

document.getElementById('dark-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
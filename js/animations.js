// ============================================
// SCROLL ANIMATIONS
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ============================================

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const animationType = entry.target.getAttribute("data-animate");
        if (animationType) {
          entry.target.style.animation = `${animationType} 0.8s ease forwards`;
          observer.unobserve(entry.target);
        }
      }
    });
  }, observerOptions);

  // Observe all elements with data-animate attribute
  document.querySelectorAll("[data-animate]").forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
  });

  // Add CSS animations
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes zoomIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `;
  document.head.appendChild(style);

  // ============================================
  // PARALLAX EFFECT
  // ============================================

  const parallaxElements = document.querySelectorAll(".hero-shapes .shape");

  window.addEventListener("scroll", function () {
    const scrolled = window.scrollY;

    parallaxElements.forEach((element, index) => {
      const speed = (index + 1) * 0.2;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });

  // ============================================
  // COUNTER ANIMATION
  // ============================================

  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + "+";
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + "+";
      }
    }, 16);
  }

  // Animate stats counters
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statItems = entry.target.querySelectorAll(".stat-item h3");
          statItems.forEach((item) => {
            const text = item.textContent;
            const number = parseInt(text.replace("+", ""));
            animateCounter(item, number);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector(".about-stats");
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // ============================================
  // MOUSE MOVE EFFECT
  // ============================================

  const heroSection = document.querySelector(".hero");

  if (heroSection) {
    heroSection.addEventListener("mousemove", function (e) {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      const shapes = document.querySelectorAll(".hero-shapes .shape");
      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;

        shape.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }

  // ============================================
  // CARD TILT EFFECT
  // ============================================

  const cards = document.querySelectorAll(".skill-card, .project-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transition = "transform 0.1s ease";
    });

    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transition = "transform 0.3s ease";
      this.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

  // ============================================
  // TEXT REVEAL ANIMATION
  // ============================================

  function splitTextToSpans(element) {
    const text = element.textContent;
    element.innerHTML = "";

    text.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.animationDelay = `${index * 0.05}s`;
      span.className = "char";
      element.appendChild(span);
    });
  }

  // Add CSS for char animation
  const charStyle = document.createElement("style");
  charStyle.textContent = `
    .char {
      display: inline-block;
      opacity: 0;
      animation: charFadeIn 0.5s ease forwards;
    }
    
    @keyframes charFadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(charStyle);

  // ============================================
  // SCROLL PROGRESS BAR
  // ============================================

  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  const progressStyle = document.createElement("style");
  progressStyle.textContent = `
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      width: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--color-accent), var(--color-dark));
      z-index: 9999;
      transition: width 0.1s ease;
    }
  `;
  document.head.appendChild(progressStyle);

  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    progressBar.style.width = scrollPercent + "%";
  });

  // ============================================
  // STAGGER ANIMATION FOR LISTS
  // ============================================

  function staggerAnimation(elements, delay = 100) {
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("fade-in");
      }, index * delay);
    });
  }

  // Apply to project cards
  const projectCards = document.querySelectorAll(".project-card");
  const projectObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll(".project-card");
          staggerAnimation(cards, 150);
          projectObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  const projectsGrid = document.querySelector(".projects-grid");
  if (projectsGrid) {
    projectObserver.observe(projectsGrid);
  }

  // ============================================
  // SMOOTH REVEAL ON SCROLL
  // ============================================

  function revealOnScroll() {
    const reveals = document.querySelectorAll(".section");

    reveals.forEach((section) => {
      const windowHeight = window.innerHeight;
      const elementTop = section.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        section.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Run on load

  // ============================================
  // IMAGE LOAD ANIMATION
  // ============================================

  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.classList.add("loaded");
    });

    // If image is already cached/loaded
    if (img.complete) {
      img.classList.add("loaded");
    }
  });

  // Add image load styles
  const imgStyle = document.createElement("style");
  imgStyle.textContent = `
    img {
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    
    img.loaded {
      opacity: 1;
    }
  `;
  document.head.appendChild(imgStyle);

  // ============================================
  // TYPING CURSOR BLINK
  // ============================================

  setInterval(() => {
    const cursor = document.querySelector(".cursor");
    if (cursor) {
      cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
    }
  }, 500);

  // ============================================
  // PERFORMANCE MONITORING
  // ============================================

  // Request Animation Frame for smooth animations
  let ticking = false;

  function updateAnimations() {
    revealOnScroll();
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(updateAnimations);
      ticking = true;
    }
  });

  // ============================================
  // PRELOAD CRITICAL ANIMATIONS
  // ============================================

  // Preload animation classes
  const animationClasses = [
    "fadeIn",
    "slideInLeft",
    "slideInRight",
    "slideInUp",
    "zoomIn",
  ];

  animationClasses.forEach((className) => {
    const dummy = document.createElement("div");
    dummy.className = className;
    dummy.style.position = "absolute";
    dummy.style.visibility = "hidden";
    document.body.appendChild(dummy);

    // Force reflow
    dummy.offsetHeight;

    document.body.removeChild(dummy);
  });

  console.log(
    "%c✨ Animations Loaded",
    "color: #B17457; font-size: 14px; font-weight: bold;"
  );
});

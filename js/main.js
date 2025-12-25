// ============================================
// MAIN JAVASCRIPT
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // NAVIGATION
  // ============================================

  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("active");
      document.body.classList.toggle("menu-open");

      // Animate hamburger
      const hamburgers = menuToggle.querySelectorAll(".hamburger");
      hamburgers.forEach((line, index) => {
        line.style.transition = "all 0.3s ease";
        if (menuToggle.classList.contains("active")) {
          if (index === 0) {
            line.style.transform = "rotate(45deg) translateY(8px)";
          } else if (index === 1) {
            line.style.opacity = "0";
          } else if (index === 2) {
            line.style.transform = "rotate(-45deg) translateY(-8px)";
          }
        } else {
          line.style.transform = "none";
          line.style.opacity = "1";
        }
      });
    });
  }

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        document.body.classList.remove("menu-open");

        const hamburgers = menuToggle.querySelectorAll(".hamburger");
        hamburgers.forEach((line) => {
          line.style.transform = "none";
          line.style.opacity = "1";
        });
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);

    if (
      !isClickInsideNav &&
      !isClickOnToggle &&
      navMenu.classList.contains("active")
    ) {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
      document.body.classList.remove("menu-open");

      const hamburgers = menuToggle.querySelectorAll(".hamburger");
      hamburgers.forEach((line) => {
        line.style.transform = "none";
        line.style.opacity = "1";
      });
    }
  });

  // Active link highlighting
  function setActiveLink() {
    const currentPath = window.location.pathname;
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (
        link.getAttribute("href") === currentPath ||
        (currentPath.endsWith("/") &&
          link.getAttribute("href") === "index.html") ||
        currentPath.includes(link.getAttribute("href").replace(".html", ""))
      ) {
        link.classList.add("active");
      }
    });
  }

  setActiveLink();

  // ============================================
  // TYPING EFFECT
  // ============================================

  const typingElement = document.getElementById("typingText");
  if (typingElement) {
    const roles = [
      "Full-Stack Developer",
      "Mobile App Developer",
      "MERN Stack Developer",
      "Flutter Developer",
      "React Native Developer",
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Pause at end
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    }

    // Start typing effect after a short delay
    setTimeout(type, 1000);
  }

  // ============================================
  // SMOOTH SCROLL
  // ============================================

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ============================================
  // SKILL PROGRESS BARS
  // ============================================

  const progressBars = document.querySelectorAll(".progress-bar");

  function animateProgressBars() {
    progressBars.forEach((bar) => {
      const progress = bar.getAttribute("data-progress");
      const barRect = bar.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (barRect.top < windowHeight - 100) {
        bar.style.setProperty("--progress-width", progress + "%");
        bar.style.width = progress + "%";
      }
    });
  }

  // Run on scroll
  window.addEventListener("scroll", animateProgressBars);

  // Run on load
  animateProgressBars();

  // ============================================
  // LAZY LOADING IMAGES
  // ============================================

  const lazyImages = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute("data-src");
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));

  // ============================================
  // SCROLL TO TOP BUTTON
  // ============================================

  // Create scroll to top button
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollTopBtn.className = "scroll-top-btn";
  scrollTopBtn.setAttribute("aria-label", "Scroll to top");
  document.body.appendChild(scrollTopBtn);

  // Add styles dynamically
  const style = document.createElement("style");
  style.textContent = `
    .scroll-top-btn {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background-color: var(--color-accent);
      color: #fff;
      border: none;
      border-radius: 50%;
      font-size: 1.2rem;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1000;
      box-shadow: 0 4px 16px rgba(177, 116, 87, 0.3);
    }
    
    .scroll-top-btn.visible {
      opacity: 1;
      visibility: visible;
    }
    
    .scroll-top-btn:hover {
      background-color: var(--color-dark);
      transform: translateY(-5px);
      box-shadow: 0 6px 20px rgba(177, 116, 87, 0.4);
    }
    
    @media (max-width: 768px) {
      .scroll-top-btn {
        width: 45px;
        height: 45px;
        bottom: 20px;
        right: 20px;
      }
    }
  `;
  document.head.appendChild(style);

  // Show/hide scroll to top button
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  // Scroll to top on click
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // ============================================
  // PERFORMANCE OPTIMIZATION
  // ============================================

  // Debounce function for scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Optimize scroll events
  const optimizedScroll = debounce(function () {
    // Your scroll-related functions here
  }, 10);

  window.addEventListener("scroll", optimizedScroll);

  // ============================================
  // LOADING ANIMATION
  // ============================================

  window.addEventListener("load", function () {
    document.body.classList.add("loaded");

    // Add a class to trigger animations
    setTimeout(() => {
      document
        .querySelectorAll(".hero-greeting, .hero-title, .hero-subtitle")
        .forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
    }, 100);
  });
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Get scroll percentage
function getScrollPercentage() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return (scrollTop / docHeight) * 100;
}

// Console log for developers
console.log(
  "%c👋 Hello Developer!",
  "color: #B17457; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cInterested in the code? Check out my GitHub!",
  "color: #4A4947; font-size: 14px;"
);
console.log(
  "%c🚀 Built with passion and ☕",
  "color: #B17457; font-size: 12px;"
);

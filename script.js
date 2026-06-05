/* ========================================
   ASMA ABID — PORTFOLIO JavaScript
======================================== */

// ========== CUSTOM CURSOR ==========
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effect on interactive elements
const hoverTargets = document.querySelectorAll('a, button, .skill-card, .project-card, .social-btn, .back-top, input, textarea');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width   = '16px';
    cursor.style.height  = '16px';
    follower.style.width  = '50px';
    follower.style.height = '50px';
    follower.style.borderColor = 'rgba(200,169,110,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width   = '8px';
    cursor.style.height  = '8px';
    follower.style.width  = '32px';
    follower.style.height = '32px';
    follower.style.borderColor = 'rgba(200,169,110,0.5)';
  });
});

// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ========== MOBILE HAMBURGER ==========
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobLinks   = document.querySelectorAll('.mob-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ========== SMOOTH SCROLL OFFSET ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ========== SCROLL REVEAL ==========
const revealEls = document.querySelectorAll(
  '.section-label, .section-title, .about-text p, .about-list, .about-stats, .skill-card, .project-card, .ci-item, .contact-sub, .contact-form'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// Staggered reveal for grids
function addStaggerReveal(selector) {
  const items = document.querySelectorAll(selector);
  items.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.1}s`;
  });
}
addStaggerReveal('.skill-card');
addStaggerReveal('.project-card');

// ========== COUNTER ANIMATION ==========
function animateCounter(el, target) {
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 20);
}

const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target);
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ========== SKILL BAR ANIMATION ==========
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.dataset.width + '%';
      entry.target.style.width = width;
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ========== CONTACT FORM ==========
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-primary');
    const btnSpan = btn.querySelector('span');
    const originalText = btnSpan.textContent;

    // Loading state
    btnSpan.textContent = 'Sending...';
    btn.style.opacity = '0.7';
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
      // Success state
      btnSpan.textContent = originalText;
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
      formSuccess.classList.add('show');
      contactForm.reset();

      // Reset label positions
      document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        input.dispatchEvent(new Event('change'));
      });

      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 4000);
    }, 1800);
  });
}

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    if (
      scrollY >= section.offsetTop &&
      scrollY < section.offsetTop + section.offsetHeight
    ) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + section.id) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
});

// ========== HERO PARALLAX ==========
const heroBgText = document.querySelector('.hero-bg-text');
if (heroBgText) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroBgText.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.15}px))`;
  });
}

// ========== FLOATING SHAPES MOUSE PARALLAX ==========
const shapes = document.querySelectorAll('.shape');
document.addEventListener('mousemove', (e) => {
  const xAxis = (window.innerWidth / 2 - e.pageX) / 80;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 80;
  shapes.forEach((shape, i) => {
    const depth = (i + 1) * 0.5;
    shape.style.transform = `translate(${xAxis * depth}px, ${yAxis * depth}px)`;
  });
});

// ========== PAGE LOAD ==========
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// ========== PROJECT CARD TILT EFFECT ==========
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    card.style.transition = 'transform 0.5s ease';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease';
  });
});

// ========== SKILL CARD HOVER GLOW ==========
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, var(--surface2) 0%, var(--surface) 60%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = 'var(--surface)';
  });
});

console.log('%c⚡ Asma Abid Portfolio', 'color: #c8a96e; font-size: 1.2rem; font-weight: bold;');
console.log('%cBuilt with HTML, CSS & JavaScript 🚀', 'color: #8a8798;');
/* ═══════════════════════════════════════════════════════════
   KRATAGYA PATKAR — PORTFOLIO JS
   Custom cursor, scroll animations, smooth nav, mobile menu
   ═══════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  // ─── CUSTOM CURSOR ──────────────────────────────────────
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  const hoverTargets = 'a, button, .btn, .project-card, .detail-card, .skill-category, .social-link, .contact-email';

  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // ─── NAV SCROLL EFFECT ──────────────────────────────────
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 60);
    lastScroll = y;
  }, { passive: true });

  // ─── MOBILE MENU ────────────────────────────────────────
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── SMOOTH SCROLL ──────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = nav.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ─── SCROLL REVEAL ANIMATIONS ──────────────────────────
  const animateEls = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  animateEls.forEach(el => observer.observe(el));

  // ─── ACTIVE NAV LINK ────────────────────────────────────
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active',
            link.getAttribute('href') === '#' + id
          );
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(s => sectionObserver.observe(s));

  // ─── PARALLAX-STYLE HERO GRID ───────────────────────────
  const heroGrid = document.querySelector('.hero-bg-grid');
  if (heroGrid) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroGrid.style.transform = `translateY(${y * 0.3}px)`;
    }, { passive: true });
  }

  // ─── MAGNETIC EFFECT ON SOCIAL LINKS ────────────────────
  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mousemove', (e) => {
      const rect = link.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    link.addEventListener('mouseleave', () => {
      link.style.transform = '';
    });
  });

  // ─── TILT EFFECT ON PROJECT CARDS ───────────────────────
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `
        perspective(1000px)
        rotateY(${x * 4}deg)
        rotateX(${-y * 4}deg)
        translateY(-4px)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ─── TYPING EFFECT ON STATUS ─────────────────────────────
  const statusText = document.querySelector('.status-text');
  if (statusText) {
    const phrases = ['Open to work', 'Available for hire', 'Let\'s collaborate'];
    let phraseIdx = 0;

    setInterval(() => {
      phraseIdx = (phraseIdx + 1) % phrases.length;
      statusText.style.opacity = 0;
      setTimeout(() => {
        statusText.textContent = phrases[phraseIdx];
        statusText.style.opacity = 1;
      }, 300);
    }, 4000);

    statusText.style.transition = 'opacity 0.3s';
  }

  // ─── YEAR AUTO-UPDATE ───────────────────────────────────
  const yearEl = document.querySelector('.footer-copy');
  if (yearEl) {
    yearEl.textContent = `© ${new Date().getFullYear()} Kratagya Patkar`;
  }

  // ─── RE-REGISTER HOVER CURSOR FOR DYNAMIC ELEMENTS ─────
  // MutationObserver to catch any dynamically added elements
  const cursorObserver = new MutationObserver(() => {
    document.querySelectorAll(hoverTargets).forEach(el => {
      if (!el.dataset.cursorBound) {
        el.dataset.cursorBound = '1';
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      }
    });
  });

  cursorObserver.observe(document.body, { childList: true, subtree: true });

})();

// TechMinds Institute - Shared JavaScript Utilities (Mobile-Optimized)
//

// ── MOBILE MENU TOGGLE ──
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const body = document.body;
  
  if (!hamburger) return;
  
  // Use static elements from HTML
  const backdrop = document.getElementById('mobileMenuBackdrop');
  const mobileMenu = document.getElementById('mobileMenu');

  // Helper to rebuild menu links
  function rebuildMobileMenuLinks() {
    mobileMenu.innerHTML = '';
    // Get all navigation links (handles both <a> and <li><a> structures)
    const navContainer = document.querySelector('.nav-links');
    if (navContainer) {
      const navItems = navContainer.querySelectorAll('a');
      navItems.forEach(link => {
        const a = document.createElement('a');
        a.href = link.getAttribute('href');
        a.textContent = link.textContent;
        mobileMenu.appendChild(a);
      });
    }
    // Also add Enroll Now button if it exists
    const ctaButton = document.querySelector('.nav-cta');
    if (ctaButton) {
      const a = document.createElement('a');
      a.href = ctaButton.getAttribute('href');
      a.textContent = ctaButton.textContent;
      a.style.background = 'var(--accent)';
      a.style.color = '#000';
      a.style.margin = '8px 4%';
      a.style.padding = '12px 20px';
      a.style.borderRadius = '6px';
      a.style.textAlign = 'center';
      a.style.fontWeight = '700';
      mobileMenu.appendChild(a);
    }
    // Attach close handler to all links
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }
  
  function toggleMenu() {
    // Always rebuild menu links before showing
    rebuildMobileMenuLinks();
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    backdrop.classList.toggle('active');
  }
  
  function closeMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    backdrop.classList.remove('active');
  }
  
  // Toggle menu on hamburger click
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });
  
  // Close menu on backdrop click
  backdrop.addEventListener('click', closeMenu);
  
  // (link click close handled in rebuildMobileMenuLinks)
}

// ── SCROLL REVEAL ANIMATION ──
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
}

// ── ACTIVE NAV HIGHLIGHT ──
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  if (navLinks.length === 0) return;
  
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) cur = s.id;
    });
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      if (href === '#' + cur) {
        a.style.color = 'var(--accent)';
      } else {
        a.style.color = '';
      }
    });
  });
}

// ── LAZY LOAD IFRAME VIDEOS ──
function loadVideo(el, url) {
  // Replace only the clicked card's content with the iframe
  const iframe = document.createElement('iframe');
  iframe.src = url + '?autoplay=1';
  iframe.allowFullscreen = true;
  iframe.allow = 'autoplay; encrypted-media';
  iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none;';
  // ensure the clicked card is positioned for absolute iframe
  el.style.position = el.style.position || 'relative';
  el.innerHTML = '';
  el.appendChild(iframe);
  el.classList.add('loaded');
}

// ── INITIALIZE ALL UTILITIES ──
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollReveal();
  initActiveNavHighlight();
});

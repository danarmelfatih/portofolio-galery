function adjustGalleryText() {
  const title = document.querySelector('.gallery-title');

  if (!title) return;
  const width = window.innerWidth;

  if (width <= 480) {
    title.style.fontSize = "1.4rem";
    title.style.letterSpacing = "3px";
  } else if (width <= 768) {
    title.style.fontSize = "1.8rem";
    title.style.letterSpacing = "5px";
  } else {
    title.style.fontSize = "2rem";
    title.style.letterSpacing = "8px";
  }
}

window.addEventListener('load', adjustGalleryText);
window.addEventListener('resize', adjustGalleryText);


// === SLIDER ===
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const slide = document.querySelector('.slide');

if (next && prev && slide) {
  next.addEventListener('click', () => {
    const items = document.querySelectorAll('.item');
    slide.appendChild(items[0]);
  });

  prev.addEventListener('click', () => {
    const items = document.querySelectorAll('.item');
    slide.prepend(items[items.length - 1]);
  });
}


// === MENU TOGGLE (MOBILE) ===
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show'); // gunakan kelas 'show' agar cocok dengan CSS kamu
  });
}


// === SMOOTH SCROLL DAN LINK AKTIF ===
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

// Scroll halus saat klik
navItems.forEach(link => {
  link.addEventListener('click', e => {
    if (link.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }

      navItems.forEach(a => a.classList.remove('active'));
      link.classList.add('active');

      navLinks.classList.remove('show');
    }
  });
});

window.addEventListener('scroll', () => {
  let current = '';
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });

  
  const indicator = document.querySelector(".scroll-indicator");
  if (indicator) {
    indicator.style.opacity = window.scrollY > 50 ? "0" : "1";
    indicator.style.transition = "opacity 0.5s ease";
  }
});

// === RESPONSIVE GALLERY TEXT ===
function adjustGalleryText() {
  const title = document.querySelector('.gallery-title');
  const contents = document.querySelectorAll('.content p, .content h3');

  if (!title) return;
  const width = window.innerWidth;

  if (width <= 480) {
    title.style.fontSize = "1.4rem";
    title.style.letterSpacing = "3px";
    contents.forEach(el => {
      el.style.fontSize = "13px";
      el.style.lineHeight = "1.4";
    });
  } else if (width <= 768) {
    title.style.fontSize = "1.8rem";
    title.style.letterSpacing = "5px";
    contents.forEach(el => {
      el.style.fontSize = "14px";
      el.style.lineHeight = "1.5";
    });
  } else {
    title.style.fontSize = "2rem";
    title.style.letterSpacing = "8px";
    contents.forEach(el => {
      el.style.fontSize = "15px";
      el.style.lineHeight = "1.6";
    });
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



// === SCROLL INDICATOR ===
window.addEventListener("scroll", () => {
  const indicator = document.querySelector(".scroll-indicator");
  if (!indicator) return;

  indicator.style.opacity = window.scrollY > 50 ? "0" : "1";
  indicator.style.transition = "opacity 0.5s ease";
});



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
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }

      // Ubah warna aktif manual saat diklik
      navItems.forEach(a => a.classList.remove('active'));
      link.classList.add('active');

      // Tutup menu setelah klik (mode mobile)
      navLinks.classList.remove('show');
    }
  });
});

// Highlight aktif otomatis saat scroll
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// === GALLERY TITLE RESPONSIVE ===
function adjustGalleryText() {
  const title = document.querySelector('.gallery-title');

  if (!title) return;
  const width = window.innerWidth;

  if (width <= 480) {
    title.style.fontSize = "1.2rem";
    title.style.letterSpacing = "2px";
    title.style.padding = "8px 25px";
  } else if (width <= 768) {
    title.style.fontSize = "1.4rem";
    title.style.letterSpacing = "3px";
    title.style.padding = "10px 30px";
  } else {
    title.style.fontSize = "1.6rem";
    title.style.letterSpacing = "4px";
    title.style.padding = "10px 40px";
  }
}

window.addEventListener('load', adjustGalleryText);
window.addEventListener('resize', adjustGalleryText);


// === SLIDER ===
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const slide = document.querySelector('.slide');

function updateSlider() {
  const items = document.querySelectorAll('.slide .item');
  
  // Reset all items
  items.forEach((item, index) => {
    item.style.zIndex = items.length - index;
  });
}

if (nextBtn && prevBtn && slide) {
  nextBtn.addEventListener('click', () => {
    const items = document.querySelectorAll('.slide .item');
    if (items.length > 0) {
      slide.appendChild(items[0]);
      updateSlider();
    }
  });

  prevBtn.addEventListener('click', () => {
    const items = document.querySelectorAll('.slide .item');
    if (items.length > 0) {
      slide.prepend(items[items.length - 1]);
      updateSlider();
    }
  });
  
  // Initialize slider
  updateSlider();
}


// === MENU TOGGLE (MOBILE) ===
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    
    // Toggle icon
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('show')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
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

      // Close mobile menu
      navLinks.classList.remove('show');
      const icon = menuToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
});

// Scroll spy dan scroll indicator
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

  // Scroll indicator visibility
  const indicator = document.querySelector(".scroll-indicator");
  if (indicator) {
    indicator.style.opacity = window.scrollY > 50 ? "0" : "1";
    indicator.style.visibility = window.scrollY > 50 ? "hidden" : "visible";
    indicator.style.transition = "opacity 0.5s ease, visibility 0.5s ease";
  }
  
  // Back to top button visibility
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
});

// === AUTOPLAY SLIDER (Optional) ===
let autoPlayInterval;

function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    const items = document.querySelectorAll('.slide .item');
    if (items.length > 0 && slide) {
      slide.appendChild(items[0]);
      updateSlider();
    }
  }, 5000); // Change slide every 5 seconds
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// Start autoplay when page loads
if (slide) {
  startAutoPlay();
  
  // Stop autoplay on hover
  slide.addEventListener('mouseenter', stopAutoPlay);
  slide.addEventListener('mouseleave', startAutoPlay);
}

// === FORM SUBMISSION (Prevent default for demo) ===
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah dikirim.');
    contactForm.reset();
  });
}
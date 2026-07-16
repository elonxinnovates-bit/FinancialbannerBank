// Banner Bank Homepage - Interactivity Script

document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initAccountAccessDropdown();
  initMobileNav();
});

// ==========================================
// 1. Hero Carousel Interactivity
// ==========================================
function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const playPauseBtn = document.getElementById('carousel-play-btn');
  
  if (!slides.length) return;

  let currentSlide = 0;
  let isPlaying = true;
  let slideInterval = setInterval(nextSlide, 5000);

  // SVG Icons for Play and Pause
  const pauseIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
    </svg>
  `;
  
  const playIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
  `;

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function togglePlayPause() {
    if (isPlaying) {
      clearInterval(slideInterval);
      playPauseBtn.innerHTML = playIcon;
      isPlaying = false;
    } else {
      slideInterval = setInterval(nextSlide, 5000);
      playPauseBtn.innerHTML = pauseIcon;
      isPlaying = true;
    }
  }

  // Event Listeners for Dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      if (isPlaying) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
      }
    });
  });

  // Event Listener for Play/Pause Button
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', togglePlayPause);
  }
}

// ==========================================
// 2. Custom Account Access Dropdown Widget
// ==========================================
function initAccountAccessDropdown() {
  const trigger = document.getElementById('widget-select-trigger');
  const menu = document.getElementById('widget-dropdown-menu');
  const label = document.getElementById('widget-select-label');
  const signinBtn = document.getElementById('widget-signin-btn');
  const businessTrigger = document.getElementById('dropdown-business-trigger');
  const businessContent = document.getElementById('dropdown-business-content');
  
  // Navbar sign in helper to highlight widget
  const navSigninBtn = document.getElementById('nav-signin-btn');

  if (!trigger || !menu || !signinBtn) return;

  // Toggle dropdown open/close
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    trigger.classList.toggle('open');
    menu.classList.toggle('show');
  });

  // Toggle Business accordion inside dropdown
  if (businessTrigger && businessContent) {
    businessTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      businessContent.classList.toggle('show');
      
      // Rotate chevron
      const chevron = businessTrigger.querySelector('svg');
      if (chevron) {
        chevron.style.transform = businessContent.classList.contains('show') ? 'rotate(90deg)' : 'rotate(0deg)';
      }
    });
  }

  // Handle option selection
  const options = menu.querySelectorAll('.dropdown-option');
  options.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const value = option.getAttribute('data-value');
      const url = option.getAttribute('data-url');
      const text = option.textContent;

      // Update widget state
      label.textContent = text;
      signinBtn.setAttribute('href', url);
      
      // Close dropdown
      closeDropdown();
    });
  });

  // Handle Business sub-option selection
  const subOptions = menu.querySelectorAll('.sub-option');
  subOptions.forEach(subOption => {
    subOption.addEventListener('click', (e) => {
      e.stopPropagation();
      const value = subOption.getAttribute('data-value');
      const url = subOption.getAttribute('data-url');
      const text = subOption.textContent;

      // Update widget state
      label.textContent = text;
      signinBtn.setAttribute('href', url);

      // Close dropdown
      closeDropdown();
    });
  });

  // Close dropdown on click outside
  document.addEventListener('click', () => {
    closeDropdown();
  });

  function closeDropdown() {
    trigger.classList.remove('open');
    menu.classList.remove('show');
  }

  // Handle Navbar Sign In and Widget Sign In buttons with 3-second FDIC loader
  if (navSigninBtn) {
    navSigninBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const loader = document.getElementById('loading-overlay');
      if (loader) {
        loader.style.display = 'flex';
      }
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 3000);
    });
  }

  const widgetSigninBtn = document.getElementById('widget-signin-btn');
  if (widgetSigninBtn) {
    widgetSigninBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const loader = document.getElementById('loading-overlay');
      if (loader) {
        loader.style.display = 'flex';
      }
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 3000);
    });
  }
}

// ==========================================
// 3. Mobile Navigation Menu Toggle
// ==========================================
function initMobileNav() {
  const toggle = document.getElementById('mobile-nav-toggle');
  const menu = document.querySelector('.nav-menu');
  
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = toggle.querySelectorAll('span');
    if (toggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      menu.style.display = 'flex';
      menu.style.flexDirection = 'column';
      menu.style.position = 'absolute';
      menu.style.top = '100%';
      menu.style.left = '0';
      menu.style.width = '100%';
      menu.style.backgroundColor = 'var(--bg-white)';
      menu.style.padding = '20px';
      menu.style.boxShadow = 'var(--shadow-md)';
      menu.style.gap = '15px';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
      menu.style.display = '';
    }
  });
}

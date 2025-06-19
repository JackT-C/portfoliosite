function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Particle System
class ParticleSystem {
  constructor() {
    this.particles = [];
    this.init();
  }

  init() {
    this.container = document.createElement('div');
    this.container.className = 'particles';
    document.body.appendChild(this.container);
    
    for (let i = 0; i < 50; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    this.container.appendChild(particle);
    this.particles.push(particle);
  }
}

// Performance optimization utilities
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

// Scroll Progress Indicator
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  const optimizedScrollHandler = debounce(() => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
  }, 10);
  
  window.addEventListener('scroll', optimizedScrollHandler);
}

// Magnetic Effect for buttons and icons
function addMagneticEffect() {
  const magneticElements = document.querySelectorAll('.btn, .icon, .theme-toggle, .floating-btn');
  
  magneticElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translate(0, 0) scale(1)';
    });
  });
}

// Enhanced Typing Effect
function addTypingEffect() {
  const titleElement = document.querySelector('#profile .title');
  if (titleElement) {
    const text = titleElement.textContent;
    titleElement.textContent = '';
    titleElement.classList.add('typing-effect');
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        titleElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(() => {
          titleElement.classList.remove('typing-effect');
        }, 1000);
      }
    };
    
    setTimeout(typeWriter, 1000);
  }
}

// 3D Tilt Effect for cards
function add3DTiltEffect() {
  const cards = document.querySelectorAll('.details-container, .color-container');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}

// Optimized Animation Observer
function optimizeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        animationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    '.fade-in-up, .slide-in-left, .slide-in-right, .bounce-in, .details-container, .color-container'
  );
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
    animationObserver.observe(el);
  });
}

// Theme functionality
let currentThemeDropdown = null;
let floatingThemesOpen = false;

function toggleThemeSelector(event) {
  const isMobile = window.innerWidth <= 1200;
  const dropdownId = isMobile ? 'mobile-theme-dropdown' : 'desktop-theme-dropdown';
  const dropdown = document.getElementById(dropdownId);
  
  if (currentThemeDropdown && currentThemeDropdown !== dropdown) {
    currentThemeDropdown.classList.remove('show');
  }
  
  dropdown.classList.toggle('show');
  currentThemeDropdown = dropdown.classList.contains('show') ? dropdown : null;
  
  if (event) {
    event.stopPropagation();
  }
}

function enhancedThemeTransition(themeName) {
  document.body.style.transition = 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
  
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, transparent 0%, rgba(0,0,0,0.1) 100%);
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  `;
  
  document.body.appendChild(overlay);
  overlay.style.opacity = '1';
  
  setTimeout(() => {
    setTheme(themeName);
    overlay.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(overlay);
      document.body.style.transition = '';
    }, 300);
  }, 150);
}

function setTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('selectedTheme', themeName);
  
  document.querySelectorAll('.theme-option, .floating-theme-option').forEach(option => {
    option.classList.remove('active');
    if (option.dataset.theme === themeName) {
      option.classList.add('active');
    }
  });
  
  document.querySelectorAll('.theme-dropdown').forEach(dropdown => {
    dropdown.classList.remove('show');
  });
  currentThemeDropdown = null;
  
  setTimeout(() => {
    addMagneticEffect();
  }, 100);
}

// Floating Theme Switcher
function toggleFloatingThemes() {
  const floatingThemes = document.getElementById('floating-themes');
  floatingThemesOpen = !floatingThemesOpen;
  
  if (floatingThemesOpen) {
    floatingThemes.classList.add('show');
  } else {
    floatingThemes.classList.remove('show');
  }
}

function initializeFloatingThemes() {
  const floatingOptions = document.querySelectorAll('.floating-theme-option');
  
  floatingOptions.forEach(option => {
    option.addEventListener('click', function() {
      const theme = this.dataset.theme;
      enhancedThemeTransition(theme);
      toggleFloatingThemes();
      
      floatingOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.floating-theme-switcher') && floatingThemesOpen) {
      toggleFloatingThemes();
    }
  });
}

// Close theme selector when clicking outside
document.addEventListener('click', function(event) {
  if (!event.target.closest('.theme-selector')) {
    document.querySelectorAll('.theme-dropdown').forEach(dropdown => {
      dropdown.classList.remove('show');
    });
    currentThemeDropdown = null;
  }
});

// Initialize theme on page load
function initializeTheme() {
  const savedTheme = localStorage.getItem('selectedTheme') || 'default';
  setTheme(savedTheme);
  
  document.querySelectorAll('.theme-option').forEach(option => {
    option.addEventListener('click', function() {
      enhancedThemeTransition(this.dataset.theme);
    });
  });
}

// Initialize all enhancements
function initializeEnhancements() {
  new ParticleSystem();
  createScrollProgress();
  addMagneticEffect();
  addTypingEffect();
  add3DTiltEffect();
  initializeFloatingThemes();
  optimizeAnimations();
  
  // Add smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && floatingThemesOpen) {
      toggleFloatingThemes();
    }
  });
}

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", function() {
  // Initialize theme first
  initializeTheme();
  
  // Initialize all new enhancements
  initializeEnhancements();

  // Trigger profile section animations immediately
  const profileSection = document.getElementById('profile');
  if (profileSection) {
    const profileAnimations = profileSection.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .bounce-in');
    profileAnimations.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.animationPlayState = 'running';
    });
  }

  // Get modal element
  const modal = document.getElementById("video-modal");
  const modalVideo = document.getElementById("modal-video");
  const videoSource = document.getElementById("video-source");
  const span = document.getElementsByClassName("close")[0];

  // Function to open the video modal
  window.openVideo = function(videoUrl) {
    videoSource.src = videoUrl;
    modalVideo.load();
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  if (span) {
    span.onclick = function() {
      modal.style.display = "none";
      modalVideo.pause();
    };
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      modalVideo.pause();
    }
  };
});

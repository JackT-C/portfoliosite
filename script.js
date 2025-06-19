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

// Scroll Progress Indicator
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// Magnetic Effect for buttons and icons
function addMagneticEffect() {
  const magneticElements = document.querySelectorAll('.btn, .icon, .theme-toggle');
  
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

// Enhanced Theme Transition
function enhancedThemeTransition(themeName) {
  document.body.style.transition = 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
  
  // Add a smooth transition overlay
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

// Enhanced Scroll Animations
function enhanceScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .bounce-in');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
    observer.observe(el);
  });
}

// Color Palette Generator for themes
function generateColorPalette(baseColor) {
  const colors = {
    primary: baseColor,
    secondary: adjustColor(baseColor, 20),
    accent: adjustColor(baseColor, -30),
    background: adjustColor(baseColor, 90),
    text: adjustColor(baseColor, -80)
  };
  return colors;
}

function adjustColor(color, percent) {
  const R = parseInt(color.substring(1,3),16);
  const G = parseInt(color.substring(3,5),16);
  const B = parseInt(color.substring(5,7),16);

  const newR = parseInt(R * (100 + percent) / 100);
  const newG = parseInt(G * (100 + percent) / 100);
  const newB = parseInt(B * (100 + percent) / 100);

  return "#" + 
    (newR < 255 ? newR : 255).toString(16).padStart(2, '0') +
    (newG < 255 ? newG : 255).toString(16).padStart(2, '0') +
    (newB < 255 ? newB : 255).toString(16).padStart(2, '0');
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
  
  // Use optimized scroll handler
  window.addEventListener('scroll', optimizedScrollHandler);
  
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

// Scroll animation observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, observerOptions);

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", function() {
  // Initialize theme first
  initializeTheme();
    // Initialize all new enhancements
  initializeEnhancements();
  
  // Use optimized animations instead of the old system
  optimizeAnimations();

  // Trigger profile section animations immediately
  const profileSection = document.getElementById('profile');
  const profileAnimations = profileSection.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .bounce-in');
  profileAnimations.forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
    el.style.animationPlayState = 'running';
  });

  // Get modal element
  const modal = document.getElementById("video-modal");
  const modalVideo = document.getElementById("modal-video");
  const videoSource = document.getElementById("video-source");
  const span = document.getElementsByClassName("close")[0];

  // Function to open the video modal
  window.openVideo = function(videoUrl) {
    videoSource.src = videoUrl;
    modalVideo.load(); // Load the new video source
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
    modalVideo.pause(); // Pause the video when closing
    modalVideo.currentTime = 0; // Reset the video to the start
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
      modalVideo.pause(); // Pause the video when closing
      modalVideo.currentTime = 0; // Reset the video to the start
    }
  };

  initializeEnhancements();

});

// Theme functionality
let currentThemeDropdown = null;

function toggleThemeSelector(event) {
  const isMobile = window.innerWidth <= 1200;
  const dropdownId = isMobile ? 'mobile-theme-dropdown' : 'theme-dropdown';
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

function setTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('selectedTheme', themeName);
  
  // Update active state for all theme options (regular and floating)
  document.querySelectorAll('.theme-option, .floating-theme-option').forEach(option => {
    option.classList.remove('active');
    if (option.dataset.theme === themeName) {
      option.classList.add('active');
    }
  });
  
  // Close all dropdowns
  document.querySelectorAll('.theme-dropdown').forEach(dropdown => {
    dropdown.classList.remove('show');
  });
  currentThemeDropdown = null;
  
  // Re-apply magnetic effects after theme change
  setTimeout(() => {
    addMagneticEffect();
  }, 100);
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
    // Add click listeners to theme options
  document.querySelectorAll('.theme-option').forEach(option => {
    option.addEventListener('click', function() {
      enhancedThemeTransition(this.dataset.theme);
    });
  });
}

// Floating Theme Switcher
let floatingThemesOpen = false;

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
      toggleFloatingThemes(); // Close after selection
      
      // Update active state
      floatingOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Close floating themes when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.floating-theme-switcher') && floatingThemesOpen) {
      toggleFloatingThemes();
    }
  });
}

// Custom Cursor Effect
function initCustomCursor() {
  if (window.innerWidth > 768) { // Only on desktop
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.classList.add('active');
    });
    
    document.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
    });
    
    // Hover effects for interactive elements
    const hoverElements = document.querySelectorAll('a, button, .icon, .btn, .theme-option');
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    
    // Smooth cursor animation
    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  }
}

// Loading Screen
function initLoadingScreen() {
  const loadingScreen = document.createElement('div');
  loadingScreen.className = 'loading-screen';
  loadingScreen.innerHTML = '<div class="loading-spinner"></div>';
  document.body.appendChild(loadingScreen);
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        document.body.removeChild(loadingScreen);
      }, 500);
    }, 1000);
  });
}

// Performance Monitor
function initPerformanceMonitor() {
  // Reduce particles on low-end devices
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    const particleCount = 25; // Reduce from 50 to 25
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      if (index >= particleCount) {
        particle.remove();
      }
    });
  }
  
  // Monitor frame rate and adjust animations
  let frameCount = 0;
  let lastTime = performance.now();
  
  function checkFrameRate() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
      const fps = frameCount;
      frameCount = 0;
      lastTime = currentTime;
      
      if (fps < 30) {
        // Reduce animations on low FPS
        document.body.classList.add('reduced-animations');
      }
    }
    
    requestAnimationFrame(checkFrameRate);
  }
  
  checkFrameRate();
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
  initCustomCursor();
  initLoadingScreen();
  initPerformanceMonitor();
  
  // Use optimized scroll handler
  window.addEventListener('scroll', optimizedScrollHandler);
  
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

// Scroll animation observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, observerOptions);

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", function() {
  // Initialize theme first
  initializeTheme();
    // Initialize all new enhancements
  initializeEnhancements();
  
  // Use optimized animations instead of the old system
  optimizeAnimations();

  // Trigger profile section animations immediately
  const profileSection = document.getElementById('profile');
  const profileAnimations = profileSection.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .bounce-in');
  profileAnimations.forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
    el.style.animationPlayState = 'running';
  });

  // Get modal element
  const modal = document.getElementById("video-modal");
  const modalVideo = document.getElementById("modal-video");
  const videoSource = document.getElementById("video-source");
  const span = document.getElementsByClassName("close")[0];

  // Function to open the video modal
  window.openVideo = function(videoUrl) {
    videoSource.src = videoUrl;
    modalVideo.load(); // Load the new video source
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
    modalVideo.pause(); // Pause the video when closing
    modalVideo.currentTime = 0; // Reset the video to the start
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
      modalVideo.pause(); // Pause the video when closing
      modalVideo.currentTime = 0; // Reset the video to the start
    }
  };

  initializeEnhancements();

});

// Theme functionality
let currentThemeDropdown = null;

function toggleThemeSelector(event) {
  const isMobile = window.innerWidth <= 1200;
  const dropdownId = isMobile ? 'mobile-theme-dropdown' : 'theme-dropdown';
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

function setTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('selectedTheme', themeName);
  
  // Update active state for all theme options (regular and floating)
  document.querySelectorAll('.theme-option, .floating-theme-option').forEach(option => {
    option.classList.remove('active');
    if (option.dataset.theme === themeName) {
      option.classList.add('active');
    }
  });
  
  // Close all dropdowns
  document.querySelectorAll('.theme-dropdown').forEach(dropdown => {
    dropdown.classList.remove('show');
  });
  currentThemeDropdown = null;
  
  // Re-apply magnetic effects after theme change
  setTimeout(() => {
    addMagneticEffect();
  }, 100);
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
    // Add click listeners to theme options
  document.querySelectorAll('.theme-option').forEach(option => {
    option.addEventListener('click', function() {
      enhancedThemeTransition(this.dataset.theme);
    });
  });
}

// Floating Theme Switcher
let floatingThemesOpen = false;

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
      toggleFloatingThemes(); // Close after selection
      
      // Update active state
      floatingOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Close floating themes when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.floating-theme-switcher') && floatingThemesOpen) {
      toggleFloatingThemes();
    }
  });
}

// Custom Cursor Effect
function initCustomCursor() {
  if (window.innerWidth > 768) { // Only on desktop
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.classList.add('active');
    });
    
    document.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
    });
    
    // Hover effects for interactive elements
    const hoverElements = document.querySelectorAll('a, button, .icon, .btn, .theme-option');
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    
    // Smooth cursor animation
    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  }
}

// Loading Screen
function initLoadingScreen() {
  const loadingScreen = document.createElement('div');
  loadingScreen.className = 'loading-screen';
  loadingScreen.innerHTML = '<div class="loading-spinner"></div>';
  document.body.appendChild(loadingScreen);
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        document.body.removeChild(loadingScreen);
      }, 500);
    }, 1000);
  });
}

// Performance Monitor
function initPerformanceMonitor() {
  // Reduce particles on low-end devices
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    const particleCount = 25; // Reduce from 50 to 25
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      if (index >= particleCount) {
        particle.remove();
      }
    });
  }
  
  // Monitor frame rate and adjust animations
  let frameCount = 0;
  let lastTime = performance.now();
  
  function checkFrameRate() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
      const fps = frameCount;
      frameCount = 0;
      lastTime = currentTime;
      
      if (fps < 30) {
        // Reduce animations on low FPS
        document.body.classList.add('reduced-animations');
      }
    }
    
    requestAnimationFrame(checkFrameRate);
  }
  
  checkFrameRate();
}

// Enhanced Performance Optimizations
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    progressBar.style.width = scrolled + '%';
  }
}, 10);

// Intersection Observer for better performance
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
        animationObserver.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  // Observe all animated elements
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

//# sourceMappingURL=script.js.map


function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
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
  
  // Pause all animations initially
  const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .bounce-in');
  animatedElements.forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });

  // Trigger profile section animations immediately
  const profileSection = document.getElementById('profile');
  const profileAnimations = profileSection.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .bounce-in');
  profileAnimations.forEach(el => {
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
  
  // Update active state for all theme options
  document.querySelectorAll('.theme-option').forEach(option => {
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
      setTheme(this.dataset.theme);
    });
  });
}


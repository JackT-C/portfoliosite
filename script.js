function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
  

document.addEventListener("DOMContentLoaded", function() {
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


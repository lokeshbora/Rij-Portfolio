// 1. Sticky Navigation Logic
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (nav) {
    nav.classList.toggle('stuck', window.scrollY > 50);
  }
});

// 2. Intersection Observer for "Reveal" Animations
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});

// 3. ENHANCED VIDEO LOGIC (Desktop Hover + Mobile Tap/Scroll)
const projectVideos = document.querySelectorAll('.project-video');

// Create an observer to auto-play/pause videos when they enter the screen
// This is the best experience for mobile users
const videoScrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const video = entry.target;
    
    if (entry.isIntersecting) {
      // Small delay to ensure smooth scrolling before play
      video.play().catch(() => {
        /* Silently handle block if browser prevents it */
      });
    } else {
      video.pause();
    }
  });
}, { threshold: 0.5 }); // Starts playing when 50% of the video is visible

projectVideos.forEach(video => {
  // Observe for scroll-play
  videoScrollObserver.observe(video);

  // DESKTOP: Play on Hover
  video.addEventListener('mouseenter', () => {
    video.play().catch(error => {
      console.warn("Hover play blocked. Ensure 'muted' attribute is present.", error);
    });
  });

  video.addEventListener('mouseleave', () => {
    video.pause();
  });

  // MOBILE: Play/Pause on Tap
  video.addEventListener('click', () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
});
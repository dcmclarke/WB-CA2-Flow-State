  // Set Active Nav Link
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // Timer Functionality
  const timerDisplay = document.getElementById('timer');
  const startButton = document.getElementById('start-button');
  const soundButton = document.getElementById('sound-button');
  const timerModes = document.querySelectorAll('.timer-mode');
  const sessionCount = document.getElementById('session-count');

  let timeLeft = 25 * 60; // Default: 25 minutes (focus)
  let isRunning = false;
  let timerInterval = null;
  let currentMode = 'focus';
  let sessionsCompleted = 0;

  const updateTimerDisplay = () => {
    if (timerDisplay) {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  };

  const startTimer = () => {
    if (!isRunning) {
      isRunning = true;
      if (timerDisplay) timerDisplay.classList.add('running');
      if (startButton) startButton.textContent = 'Pause Focus Timer';
      timerInterval = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          updateTimerDisplay();
        } else {
          clearInterval(timerInterval);
          timerInterval = null;
          isRunning = false;
          if (timerDisplay) timerDisplay.classList.remove('running');
          if (startButton) startButton.textContent = 'Start Focus Timer';

          if (currentMode === 'focus') {
            sessionsCompleted++;
            if (sessionCount) sessionCount.textContent = `${sessionsCompleted} / 4`;
          }
          timeLeft = currentMode === 'focus' ? 25 * 60 : currentMode === 'short-break' ? 5 * 60 : 30 * 60;
          updateTimerDisplay();
        }
      }, 1000);
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      isRunning = false;
      if (timerDisplay) timerDisplay.classList.remove('running');
      if (startButton) startButton.textContent = 'Start Focus Timer';
    }
  };

  if (timerModes && timerModes.length > 0) {
    timerModes.forEach(button => {
      button.addEventListener('click', () => {
        if (button.dataset.mode === currentMode) return; // Prevent re-selecting same mode
        timerModes.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentMode = button.dataset.mode;
        timeLeft = currentMode === 'focus' ? 25 * 60 : currentMode === 'short-break' ? 5 * 60 : 30 * 60;
        updateTimerDisplay();
        if (isRunning) {
          clearInterval(timerInterval);
          timerInterval = null;
          isRunning = false;
          if (timerDisplay) timerDisplay.classList.remove('running');
          if (startButton) startButton.textContent = 'Start Focus Timer';
        }
      });
    });
  }

  if (startButton) {
    startButton.addEventListener('click', startTimer);
  }

  if (soundButton) {
    let isMuted = false;
    soundButton.addEventListener('click', () => {
      isMuted = !isMuted;
      soundButton.innerHTML = isMuted ? '<i class="fa-solid fa-volume-mute"></i>' : '<i class="fa-solid fa-volume-high"></i>';
    });
  }

  // Carousel Functionality
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevButton = document.querySelector('.carousel-arrow-left');
  const nextButton = document.querySelector('.carousel-arrow-right');
  let currentIndex = 0;

  const updateCarousel = () => {
    if (testimonialCards && testimonialCards.length > 0) {
      testimonialCards.forEach((card, index) => {
        card.classList.toggle('active', index === currentIndex);
      });
    }
  };

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
      updateCarousel();
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % testimonialCards.length;
      updateCarousel();
    });
  }

  updateCarousel();

  // Fade-In Animation on Scroll
  const fadeInElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeInElements.forEach((element) => {
    observer.observe(element);
  });
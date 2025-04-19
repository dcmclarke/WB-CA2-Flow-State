document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const desktopNav = document.querySelector('.desktop-nav');

  if (mobileMenuButton && desktopNav) {
    const toggleMenu = () => {
      const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
      mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
      desktopNav.classList.toggle('show-mobile');
    };

    // Handle both click and touchstart events
    mobileMenuButton.addEventListener('click', toggleMenu);
    mobileMenuButton.addEventListener('touchstart', (e) => {
      e.preventDefault(); // Prevent default touch behavior (e.g., scrolling)
      toggleMenu();
    });
  }

  // Fade-In Animation
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
});

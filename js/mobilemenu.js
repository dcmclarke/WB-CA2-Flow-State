document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const desktopNav = document.querySelector('.desktop-nav');
  
    if (mobileMenuButton && desktopNav) {
      mobileMenuButton.addEventListener('click', () => {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        desktopNav.classList.toggle('show-mobile');
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
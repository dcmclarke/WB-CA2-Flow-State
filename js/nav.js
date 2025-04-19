document.addEventListener('DOMContentLoaded', () => {
    // Set Active Nav Link
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
  
    navLinks.forEach(link => link.classList.remove('active'));
  
    // Add .active to the matching link
    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href').split('/').pop().toLowerCase();
      if (linkPath === currentPath) {
        link.classList.add('active');
      }
    });
  });
  $(document).ready(function() {
    // Handle gallery item clicks (links and images) with jQuery
    $('.gallery-link, .gallery-image').on('click', function() {
      const info = $(this).data('info');
      const link = $(this).data('link');
      $('#modal-info').text(info);
      $('#modal-link').attr('href', link);
    });

    // Intersection Observer for fade-in animations
    const sections = document.querySelectorAll('.fade-in');
    const observerOptions = {
      root: null,
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  });
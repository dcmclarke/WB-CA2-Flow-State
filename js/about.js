$(document).ready(function() {
  // Handle contact form submission
  $('#submit-contact').on('click', function() {
    const name = $('#contact-name').val().trim();
    const email = $('#contact-email').val().trim();
    const phone = $('#contact-phone').val().trim();
    const inquiry = $('#contact-inquiry').val();
    const message = $('#contact-message').val().trim();
    const nameError = $('#name-error');
    const emailError = $('#email-error');
    const phoneError = $('#phone-error');
    const inquiryError = $('#inquiry-error');
    const messageError = $('#message-error');
    const formMessage = $('#form-message');

    // Reset previous error messages
    nameError.removeClass('show').text('');
    emailError.removeClass('show').text('');
    phoneError.removeClass('show').text('');
    inquiryError.removeClass('show').text('');
    messageError.removeClass('show').text('');
    formMessage.removeClass('success').text('').hide();

    let isValid = true;

    // Validate name
    if (!name) {
      nameError.addClass('show').text('Name is required.');
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      emailError.addClass('show').text('Email is required.');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      emailError.addClass('show').text('Please enter a valid email (e.g., user@domain.com).');
      isValid = false;
    }

    // Validate phone number
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$|^\d{10}$/;
    if (!phone) {
      phoneError.addClass('show').text('Phone number is required.');
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      phoneError.addClass('show').text('Please enter a valid phone number (e.g., 123-456-7890 or 1234567890).');
      isValid = false;
    }

    // Validate inquiry type
    if (!inquiry) {
      inquiryError.addClass('show').text('Please select an inquiry type.');
      isValid = false;
    }

    // Validate message
    if (!message) {
      messageError.addClass('show').text('Message is required.');
      isValid = false;
    }

    // If all validations pass, show success message
    if (isValid) {
      formMessage
        .addClass('success')
        .text(`Thank you, ${name}! Your ${inquiry} inquiry has been received. We'll get back to you at ${email}.`)
        .show();

      // Clear the form
      $('#contact-form')[0].reset();
    }
  });

  // Typewriter effect for hero heading
  const text = "About Flow State";
  let i = 0;
  const speed = 100; // Speed of typing in milliseconds
  function typeWriter() {
    if (i < text.length) {
      $('#typewriter-heading').append(text.charAt(i));
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter();

  // Intersection Observer for fade-in animations
  const elements = document.querySelectorAll('.fade-in');
  const observerOptions = {
    root: null,
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once visible
      }
    });
  }, observerOptions);

  elements.forEach(element => observer.observe(element));
});
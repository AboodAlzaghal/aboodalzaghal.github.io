// Contact form validation
// Checks that every field has a value before allowing submission,
// shows an inline error under any empty field, and confirms success with an alert.

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  if (!form) return; // script.js only runs the form logic on contact.html

  const fields = [
    { id: 'fullName', errorId: 'fullNameError', label: 'Full name' },
    { id: 'email', errorId: 'emailError', label: 'Email address' },
    { id: 'country', errorId: 'countryError', label: 'Country' },
    { id: 'comments', errorId: 'commentsError', label: 'Comments' }
  ];

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validateField(field) {
    const input = document.getElementById(field.id);
    const errorEl = document.getElementById(field.errorId);
    const value = input.value.trim();

    let message = '';
    if (value === '') {
      message = field.label + ' is required.';
    } else if (field.id === 'email' && !isValidEmail(value)) {
      message = 'Please enter a valid email address.';
    }

    if (message) {
      input.classList.add('invalid');
      errorEl.textContent = message;
      return false;
    } else {
      input.classList.remove('invalid');
      errorEl.textContent = '';
      return true;
    }
  }

  // Validate a field as soon as the user leaves it
  fields.forEach(function (field) {
    const input = document.getElementById(field.id);
    input.addEventListener('blur', function () {
      validateField(field);
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    let allValid = true;
    fields.forEach(function (field) {
      const fieldValid = validateField(field);
      if (!fieldValid) allValid = false;
    });

    if (!allValid) {
      return; // stop here — errors are already shown under each field
    }

    alert('Thanks! Your message was submitted successfully.');
    form.reset();
    fields.forEach(function (field) {
      document.getElementById(field.id).classList.remove('invalid');
      document.getElementById(field.errorId).textContent = '';
    });
  });
});

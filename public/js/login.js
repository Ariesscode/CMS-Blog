const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};
document.addEventListener('DOMContentLoaded', function() {
const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const toggleButton = document.getElementById('register-link');

  // Function to toggle between login and register forms
  function toggleForms() {
    if (loginForm.style.display === 'none') {
      loginForm.style.display = 'block';
      signupForm.style.display = 'none';
      
    } else {
      loginForm.style.display = 'none';
      signupForm.style.display = 'block';
    }
  }

  // Add a click event listener to the button
  toggleButton.addEventListener('click', toggleForms);

});
document
  .querySelector('.loginBtn')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signUpBtn')
  .addEventListener('submit', signupFormHandler);

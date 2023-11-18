
document.body.addEventListener('click', function (event) {
  if (event.target.matches('.loginBtn')) {
    loginFormHandler(event);
  }
      
    if(event.target.matches('.signUpBtn')) {
      signupFormHandler(event);
    }
    if(event.target.matches('#register-link')) {
      toggleForms(event);
    }
  });

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
      document.location.replace('/dashboard');
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
      document.location.replace('/login');
    } else {
      alert('Failed to sign up.');
    }
  }
};

const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  // Function to toggle between login and register forms
  function toggleForms() {
    if (loginForm.style.display === 'none') {
      loginForm.style.display = 'block';
      signupForm.style.display = 'none';
      
    } else {
      loginForm.style.display = 'none';
      signupForm.style.display = 'block';
    }
  };

  
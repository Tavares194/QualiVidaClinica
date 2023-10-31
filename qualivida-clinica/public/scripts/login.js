const loginForm = document.querySelector('#login-form');
const errorDiv = document.querySelector('.error-message');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#senha');

document.addEventListener('DOMContentLoaded', () => {
  if (error) {
    errorDiv.innerText = error;
  }
})

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let formError;

  if (!emailInput.value || !passwordInput.value) {
    formError = 'Preencha todos os campos!';
  }

  if (formError) {
    errorDiv.innerText = formError;
  } else {
    errorDiv.innerText = '';
    loginForm.submit();
  }
})
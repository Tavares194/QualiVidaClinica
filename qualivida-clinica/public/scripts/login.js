const loginForm = document.querySelector('#login-form');
const errorDiv = document.querySelector('.error-message');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#senha');

emailInput.addEventListener('focus', event => {
  emailInput.classList.remove('is-invalid')
})

passwordInput.addEventListener('focus', event => {
  passwordInput.classList.remove('is-invalid')
})

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let formError;

  if (!emailInput.value) {
    formError = 'Preencha o campo email!';
    emailInput.classList.add('is-invalid');
  }

  if (!passwordInput.value) {
    formError = 'Preencha o campo senha!';
    passwordInput.classList.add('is-invalid');
  }

  if (!emailInput.value && !passwordInput.value) {
    formError = 'Preencha todos os campos!';
    emailInput.classList.add('is-invalid');
    passwordInput.classList.add('is-invalid');
  }

  if (formError) {
    errorDiv.innerText = formError;
  } else {
    errorDiv.innerText = '';
    loginForm.submit();
  }
})
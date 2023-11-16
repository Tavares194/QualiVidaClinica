let currentLanguage = navigator.language;

const loginForm = document.querySelector('#login-form');
const errorDiv = document.querySelector('.error-message');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#senha');

emailInput.addEventListener('focus', event => {
  emailInput.classList.remove('is-invalid');
  errorDiv.innerText = '';
});

passwordInput.addEventListener('focus', event => {
  passwordInput.classList.remove('is-invalid');
  errorDiv.innerText = '';
});

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const errorMessages = await fetchErrorMessages(currentLanguage);
  if (!errorMessages)
    errorMessages = await fetchErrorMessages('pt-BR');

  let formError;

  if (!emailInput.value && !passwordInput.value) {
    formError = errorMessages.empty_fields;
    errorDiv.innerText = formError;
    emailInput.classList.add('is-invalid');
    passwordInput.classList.add('is-invalid');
    return;
  }

  if (!emailInput.value) {
    formError = errorMessages.empty_email;
    errorDiv.innerText = formError;
    emailInput.classList.add('is-invalid');
    return;
  }

  if (!passwordInput.value) {
    formError = errorMessages.empty_password;
    errorDiv.innerText = formError;
    passwordInput.classList.add('is-invalid');
    return;
  }

  loginForm.submit();
});

async function fetchErrorMessages(language) {
  try {
    const response = await fetch(`locales/${language}.json`);
    const allErrorMessages = await response.json();

    const loginErrorMessages = allErrorMessages.errors && allErrorMessages.errors.login
      ? allErrorMessages.errors.login
      : {};

    return loginErrorMessages;
  } catch (error) {
    console.error('Error fetching error messages:', error);
    return {};
  }
}
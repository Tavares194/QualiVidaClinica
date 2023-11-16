let preferredLanguage;

fetch('/login')
  .then(response => {
    preferredLanguage = response.headers.get('X-Preferred-Language');
    console.log('Preferred Language:', preferredLanguage);

    setUpLoginForm();
  })
  .catch(error => console.error('Error fetching data:', error));

async function setUpLoginForm() {

  const inputs = document.querySelectorAll('input');
  const loginForm = document.querySelector('#login-form');
  const errorDiv = document.querySelector('.error-message');
  const emailInput = document.querySelector('#email');
  const passwordInput = document.querySelector('#senha');

  inputs.forEach(input => {
    input.addEventListener("focus", event => {
      event.target.classList.remove('is-invalid');
    })
  })

  const errorMessages = await fetchErrorMessages(preferredLanguage);

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

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
}


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
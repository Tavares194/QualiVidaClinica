let currentLanguage = navigator.language;
console.log(currentLanguage)

const cadastroForm = document.querySelector('#cadastro-form');
const nomeInput = document.querySelector('#nome');
const cpfInput = document.querySelector('#cpf');
const rgInput = document.querySelector('#rg');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#senha');
const confirmPasswordInput = document.querySelector('#confirmarSenha');
const errorDiv = document.querySelector('.error-message');

nomeInput.addEventListener('focus', event => {
  nomeInput.classList.remove('is-invalid')
})

cpfInput.addEventListener('focus', event => {
  cpfInput.classList.remove('is-invalid')
})

rgInput.addEventListener('focus', event => {
  rgInput.classList.remove('is-invalid')
})

emailInput.addEventListener('focus', event => {
  emailInput.classList.remove('is-invalid')
})

passwordInput.addEventListener('focus', event => {
  passwordInput.classList.remove('is-invalid')
})

confirmPasswordInput.addEventListener('focus', event => {
  passwordInput.classList.remove('is-invalid');
  confirmPasswordInput.classList.remove('is-invalid')
})

function isPasswordValid(password) {
  // Check if password has at least: a number, an uppercase letter and a lowercase letter
  return /\d/.test(password) && /[A-Z]/.test(password) && /[a-z]/.test(password);
}

function renderError(error) {
  errorDiv.innerText = error;
}

function validateCPF(strCPF) {
  var soma;
  var resto;
  soma = 0;
  if (strCPF == "00000000000") return false;

  for (let i = 1; i <= 9; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;

  if ((resto == 10) || (resto == 11)) resto = 0;
  if (resto != parseInt(strCPF.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;

  if ((resto == 10) || (resto == 11)) resto = 0;
  if (resto != parseInt(strCPF.substring(10, 11))) return false;
  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

cadastroForm.addEventListener('submit', async event => {
  event.preventDefault();

  const errorMessages = await fetchErrorMessages(currentLanguage);
  if (!errorMessages)
    errorMessages = await fetchErrorMessages('en-US');

  const inputs = document.querySelectorAll('input');
  let formError;

  let hasEmptyField = false;
  inputs.forEach(input => {
    if (!input.value) {
      hasEmptyField = true;
      input.classList.add('is-invalid');
    }
  })

  if (hasEmptyField) {
    formError = errorMessages.empty_fields;
    renderError(formError);
    return;
  }

  if (!isValidEmail(emailInput.value)) {
    emailInput.classList.add('is-invalid');
    formError = errorMessages.invalid_email;
    renderError(formError)
    return;
  }

  if (!isPasswordValid(passwordInput.value)) {
    passwordInput.classList.add('is-invalid');
    formError = errorMessages.invalid_password;
    renderError(formError);
    return;
  }

  if (confirmPasswordInput.value != passwordInput.value) {
    passwordInput.classList.add('is-invalid');
    confirmPasswordInput.classList.add('is-invalid');
    formError = errorMessages.match_password;
    renderError(formError);
    return;
  }

  cpfInput.value = cpfInput.value.replace(/[.-]/g, '');

  if (!validateCPF(cpfInput.value)) {
    cpfInput.classList.add('is-invalid');
    formError = errorMessages.invalid_cpf;
    renderError(formError)
    return;
  }

  rgInput.value = rgInput.value.replace(/[.-]/g, '');

  if (rgInput.value.length !== 9) {
    rgInput.classList.add('is-invalid');
    formError = errorMessages.invalid_id;
    renderError(formError);
    return;
  }

  errorDiv.innerText = '';
  cadastroForm.submit();
})

cpfInput.addEventListener('input', function () {
  var v = this.value;

  if (isNaN(v[v.length - 1])) {
    this.value = v.substring(0, v.length - 1);
    return;
  }

  this.setAttribute("maxlength", "14");
  if (v.length == 3 || v.length == 7) this.value += ".";
  if (v.length == 11) this.value += "-";
});

rgInput.addEventListener('input', function () {
  var v = this.value;

  if (isNaN(v[v.length - 1])) {
    this.value = v.substring(0, v.length - 1);
    return;
  }

  this.setAttribute("maxlength", "12");
  if (v.length == 2 || v.length == 6) this.value += ".";
  if (v.length == 10) this.value += "-";
});

async function fetchErrorMessages(language) {
  try {
    const response = await fetch(`locales/${language}.json`);
    const allErrorMessages = await response.json();

    const loginErrorMessages = allErrorMessages.errors && allErrorMessages.errors.signup
      ? allErrorMessages.errors.signup
      : {};

    return loginErrorMessages;
  } catch (error) {
    console.error('Error fetching error messages:', error);
    return {};
  }
}
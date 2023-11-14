const cadastroForm = document.querySelector('#cadastro-form');
const errorDiv = document.querySelector('.error-message');
const nomeInput = document.querySelector('#nome');
const cpfInput = document.querySelector('#cpf');
const rgInput = document.querySelector('#rg');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#senha');

document.addEventListener('DOMContentLoaded', () => {
  if (mensagem_erro) {
    errorDiv.innerText = mensagem_erro;
  }
})

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

cadastroForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let formError;

  if (!nomeInput.value) {
    formError = 'Preencha o campo nome!';
    nomeInput.classList.add('is-invalid');
  }

  if (!cpfInput.value) {
    formError = 'Preencha o campo CPF!';
    cpfInput.classList.add('is-invalid');
  }

  if (!rgInput.value) {
    formError = 'Preencha o campo RG!';
    rgInput.classList.add('is-invalid');
  }

  if (!emailInput.value) {
    formError = 'Preencha o campo email!';
    emailInput.classList.add('is-invalid');
  }

  if (!passwordInput.value) {
    formError = 'Preencha o campo senha!';
    passwordInput.classList.add('is-invalid');
  }

  if (!nomeInput.value && !cpfInput.value && !rgInput.value && !emailInput.value && !passwordInput.value) {
    formError = 'Preencha todos os campos!';
    nomeInput.classList.add('is-invalid');
    cpfInput.classList.add('is-invalid');
    rgInput.classList.add('is-invalid');
    emailInput.classList.add('is-invalid');
    passwordInput.classList.add('is-invalid');
  }

  if (formError) {
    errorDiv.innerText = formError;
  } else {
    errorDiv.innerText = '';
    cadastroForm.submit();
  }
})
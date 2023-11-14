const cadastroForm = document.querySelector('#cadastro-form');
const errorDiv = document.querySelector('.error-message');
const nomeInput = document.querySelector('#nome');
const cpfInput = document.querySelector('#cpf');
const rgInput = document.querySelector('#rg');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#senha');
const confirmPasswordInput = document.querySelector('#confirmarSenha');

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

confirmPasswordInput.addEventListener('focus', event => {
  passwordInput.classList.remove('is-invalid')
})

function isNumeric(input) {
  return /^\d+$/.test(input);
}

function hasNumber(input) {
  return /\d/.test(input);
}

function hasUpperCase(input) {
  return /[A-Z]/.test(input);
}

function hasLowerCase(input) {
  return /[a-z]/.test(input);
}

function validateCPF(strCPF) {
  var soma;
  var resto;
  soma = 0;
  if (strCPF == "00000000000") return false;

  for (i = 1; i <= 9; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;

  if ((resto == 10) || (resto == 11)) resto = 0;
  if (resto != parseInt(strCPF.substring(9, 10))) return false;

  soma = 0;
  for (i = 1; i <= 10; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;

  if ((resto == 10) || (resto == 11)) resto = 0;
  if (resto != parseInt(strCPF.substring(10, 11))) return false;
  return true;
}

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

function validateRG(strRG) {
  const numerosRG = strRG.replace(/\D/g, '').slice(0, -1);

  if (numerosRG.length !== 9) {
    return false;
  }

  let soma = 0;
  for (let i = 0; i < 8; i++) {
    soma += parseInt(numerosRG.charAt(i)) * (8 - i);
  }

  const resto = soma % 11;
  let digitoVerificador = 11 - resto;
  if (digitoVerificador === 10 || digitoVerificador === 11) {
    digitoVerificador = 0;
  }

  const ultimoDigito = parseInt(strRG.charAt(strRG.length - 1));
  return digitoVerificador === ultimoDigito;
}

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


cadastroForm.addEventListener('submit', event => {
  const inputs = document.querySelectorAll('input');
  let formError;

  let hasEmptyField = false;
  inputs.forEach(input => {
    if (!input.value) {
      hasEmptyField = true;
      inputs.classList.add('is-invalid');
      return;
    }
  })

  if (hasEmptyField) {
    formError += 'Todos os campos devem ser preenchidos!';
    return;
  }

  if (!hasNumber(passwordInput.value) || !hasUpperCase(passwordInput.value) || !hasLowerCase(passwordInput.value)) {
    formError += 'A senha criada não atende aos requisitos!';
    return;
  }

  if (confirmPasswordInput.value != password) {
    formError += 'As senhas não coincidem!';
    return;
  }

  cpfInput.value = cpfInput.value.replace(/[.-]/g, '');

  if (!validateCPF(cpfInput.value)) {
    formError += 'CPF Inválido!';
    return;
  }

  rgInput.value = rgInput.value.replace(/[.-]/g, '');

  if (!validateRG(rgInput.value)) {
    formError += 'RG Inválido!';
    return;
  }

  if (formError) {
    errorDiv.innerText = formError;
  } else {
    errorDiv.innerText = '';
    cadastroForm.submit();
  }
})

// if (!nomeInput.value) {
//   formError = 'Preencha o campo nome!';
//   nomeInput.classList.add('is-invalid');
// }

// if (!cpfInput.value) {
//   formError = 'Preencha o campo CPF!';
//   cpfInput.classList.add('is-invalid');
// }

// if (!rgInput.value) {
//   formError = 'Preencha o campo RG!';
//   rgInput.classList.add('is-invalid');
// }

// if (!emailInput.value) {
//   formError = 'Preencha o campo email!';
//   emailInput.classList.add('is-invalid');
// }

// if (!passwordInput.value) {
//   formError = 'Preencha o campo senha!';
//   passwordInput.classList.add('is-invalid');
// }

// if (!confirmPasswordInput.value) {
//   formError = 'Preencha o campo confirmar senha!';
//   confirmPasswordInput.classList.add('is-invalid');
// }

// if (!nomeInput.value && !cpfInput.value && !rgInput.value && !emailInput.value && !passwordInput.value && !confirmPasswordInput.value) {
//   formError = 'Preencha todos os campos!';
//   nomeInput.classList.add('is-invalid');
//   cpfInput.classList.add('is-invalid');
//   rgInput.classList.add('is-invalid');
//   emailInput.classList.add('is-invalid');
//   passwordInput.classList.add('is-invalid');
//   confirmPasswordInput.classList.add('is-invalid');
// }

// if (formError) {
//   errorDiv.innerText = formError;
// } else {
//   errorDiv.innerText = '';
//   cadastroForm.submit();
// }
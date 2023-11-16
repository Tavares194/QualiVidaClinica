function isPasswordValid(password) {
  // Check if password has at least: a number, an uppercase letter and a lowercase letter
  return /\d/.test(password) && /[A-Z]/.test(password) && /[a-z]/.test(password);
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

export const formValidator = function (valores) {
  let formError = null;

  const valoresArray = Object.values(valores);
  let hasEmptyField = false;
  valoresArray.forEach(valor => {
    if (!valor) {
      hasEmptyField = true;
    }
  })

  if (hasEmptyField || valoresArray.length !== 6) {
    formError = 'errors.signup.empty_fields';
    return formError;
  }

  if (!isValidEmail(valores.email)) {
    formError = 'errors.signup.invalid_email';
    return formError;
  }

  if (!isPasswordValid(valores.senha)) {
    formError = 'errors.signup.invalid_password';
    return formError;
  }

  if (valores.senha != valores.confirmarSenha) {
    formError = 'errors.signup.match_password';
    return formError;
  }

  if (!validateCPF(valores.cpf)) {
    formError = 'errors.signup.invalid_cpf';
    return formError;
  }

  if (valores.rg.length !== 9) {
    formError = 'errors.signup.invalid_id';
    return formError;
  }

  return formError;
}
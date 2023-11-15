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

export const formValidator = function (nome, cpf, rg, email, senha, confirmarSenha) {
  const fields = [nome, cpf, rg, email, senha, confirmarSenha]
  let formError = null;

  let hasEmptyField = false;
  fields.forEach(field => {
    if (!field) {
      hasEmptyField = true;
    }
  })

  if (hasEmptyField) {
    formError = 'Todos os campos devem ser preenchidos!';
    return formError;
  }

  if (!isPasswordValid(senha)) {
    formError = 'A senha criada não atende aos requisitos!';
    return formError;
  }

  if (senha != confirmarSenha) {
    formError = 'As senhas não coincidem!';
    return formError;
  }

  if (!validateCPF(cpf)) {
    formError = 'CPF Inválido!';
    return formError;
  }

  if (rg.length !== 9) {
    formError = 'RG Inválido!';
    return formError;
  }

  return null;
}
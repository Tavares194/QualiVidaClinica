import { db } from "../database/db.js";
import { formValidator } from "../validators/cadastroValidator.js"

async function checkIfAlreadyRegistered(query, value, errorMessage, res) {
    return new Promise((resolve, reject) => {
        db.query(query, value, (error, results) => {
            if (error) {
                reject(error);
            } else {
                if (results.length !== 0) {
                    const mensagem_erro = errorMessage;
                    res.render('cadastro', { mensagem_erro });
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        });
    });
}

export const getPage = (req, res) => {
    res.render('cadastro', { mensagem_erro: null });
}

export const cadastroUsuario = async (req, res) => {
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const rg = req.body.rg;
    const email = req.body.email;
    const senha = req.body.senha;
    const confirmarSenha = req.body.confirmarSenha;

    const validationError = formValidator(nome, cpf, rg, email, senha, confirmarSenha);
    if (validationError) {
        res.render('cadastro', { mensagem_erro: validationError })
        return;
    }

    const valores = [nome, cpf, rg, email, senha];

    const query_insert = "INSERT INTO usuario (nome, cpf, rg, email, senha) VALUES(?);";

    const query_cpfVerification = "SELECT usuario_id FROM usuario WHERE cpf=?";
    const query_rgVerification = "SELECT usuario_id FROM usuario WHERE rg=?";
    const query_emailVerification = "SELECT usuario_id FROM usuario WHERE email=?";

    try {
        const cpfAlreadyRegistered = await checkIfAlreadyRegistered(query_cpfVerification, cpf, "CPF já cadastrado", res);
        if (cpfAlreadyRegistered) return;

        const rgAlreadyRegistered = await checkIfAlreadyRegistered(query_rgVerification, rg, "RG já cadastrado", res);
        if (rgAlreadyRegistered) return;

        const emailAlreadyRegistered = await checkIfAlreadyRegistered(query_emailVerification, email, "Email já cadastrado", res);
        if (emailAlreadyRegistered) return;

        db.query(query_insert, [valores], (error) => {
            if (error) {
                return res.json(error);
            }
            return res.render('login', { error: null, email: null });
        });
    } catch (error) {
        return res.json(error);
    }
}
import { db } from "../database/db.js";
import { formValidator } from "../validators/cadastroValidator.js"
import bcrypt from "bcrypt";

async function checkIfAlreadyRegistered(query, value, res) {
    return new Promise((resolve, reject) => {
        db.query(query, value, (error, results) => {
            if (error) {
                reject(error);
            } else {
                if (results.length !== 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        });
    });
}

export const getPage = (req, res) => {
    res.render('cadastro')
}

export const cadastroUsuario = async (req, res) => {
    const formData = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        rg: req.body.rg,
        email: req.body.email,
    };

    const valores = { ...formData };
    valores['senha'] = req.body.senha;
    valores['confirmarSenha'] = req.body.confirmarSenha;

    const validationError = formValidator(valores);
    if (validationError) {
        res.render('cadastro', { mensagem_erro: validationError, formData })
        return;
    }

    try {
        const query_cpfVerification = "SELECT usuario_id FROM usuario WHERE cpf=?";
        const cpfAlreadyRegistered = await checkIfAlreadyRegistered(query_cpfVerification, valores.cpf, res);
        if (cpfAlreadyRegistered) {
            res.render('cadastro', { mensagem_erro: "CPF já está em uso!", formData })
            return;
        }

        const query_rgVerification = "SELECT usuario_id FROM usuario WHERE rg=?";
        const rgAlreadyRegistered = await checkIfAlreadyRegistered(query_rgVerification, valores.rg, res);
        if (rgAlreadyRegistered) {
            res.render('cadastro', { mensagem_erro: "RG já está em uso", formData })
            return;
        }

        const query_emailVerification = "SELECT usuario_id FROM usuario WHERE email=?";
        const emailAlreadyRegistered = await checkIfAlreadyRegistered(query_emailVerification, valores.email, res);
        if (emailAlreadyRegistered) {
            res.render('cadastro', { mensagem_erro: "Email já está em uso", formData })
            return;
        }

        valores.senha = await bcrypt.hash(valores.senha, 10);

        delete valores.confirmarSenha;

        const query_insert = "INSERT INTO usuario SET ?;";
        db.query(query_insert, [valores], (error) => {
            if (error) {
                return res.json(error);
            }
            return res.render('login', { successMessage: "Cadastro realizado com sucesso! Entre com suas credenciais." });
        });
    } catch (error) {
        return res.json(error);
    }
}
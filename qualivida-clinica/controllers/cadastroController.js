import { formValidator } from "../validators/cadastroValidator.js"
import User from "../models/User.js";
import bcrypt from "bcrypt";

async function existsInDatabase(valores) {
    const existsCPF = await User.findAll({
        attributes: ['cpf'],
        where: {
            cpf: valores.cpf
        }
    })

    if (existsCPF.length > 0) {
        return 'existing_cpf';
    }

    const existsRG = await User.findAll({
        attributes: ['rg'],
        where: {
            rg: valores.rg
        }
    })

    if (existsRG.length > 0) {
        return 'existing_id';
    }

    const existsEmail = await User.findAll({
        attributes: ['email'],
        where: {
            email: valores.email
        }
    })

    if (existsEmail.length > 0) {
        return 'existing_email';
    }

    return null;
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
        res.render('cadastro', { mensagem_erro: req.__(validationError), formData })
        return;
    }

    const existingUser = await existsInDatabase(valores);
    if (existingUser) {
        const errorMessage = req.__(`errors.signup.${existingUser}`);
        return res.render('cadastro', { mensagem_erro: errorMessage, formData });
    }

    valores.senha = await bcrypt.hash(valores.senha, 10);

    delete valores.confirmarSenha;

    const user = await User.create(valores);

    if (user) {
        return res.render('login', { successMessage: req.__("login.success_message") });
    } else {
        res.send('Error creating user!');
    }
}
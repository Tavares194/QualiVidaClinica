import { db } from "../database/db.js";

export const getPage = (req, res) => {
    res.render('cadastro', { error: null, email: null });
}

export const cadastroUsuario = (req, res) => {
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const rg = req.body.rg;
    const email = req.body.email;
    const senha = req.body.senha;
    var mensagem_erro = '';

    const valores = [nome, cpf, rg, email, senha];

    const query_insert = "INSERT INTO usuario (nome, cpf, rg, email, senha) VALUES(?);";

    const query_cpfVerification = "SELECT usuario_id FROM usuario WHERE cpf=?";
    const query_rgVerification = "SELECT usuario_id FROM usuario WHERE rg=?";
    const query_emailVerification = "SELECT usuario_id FROM usuario WHERE email=?";

    db.query(query_cpfVerification, cpf, (error, results) => {
        if (error) return res.json(error);
        if (results) mensagem_erro += "CPF já cadastrado";
        console.log(mensagem_erro);
    });

    db.query(query_rgVerification, rg, (error, results) => {
        if (error) return res.json(error);
        if (results) mensagem_erro += " RG já cadastrado";
        console.log(mensagem_erro);
    });

    db.query(query_emailVerification, email, (error, results) => {
        if (error) return res.json(error);
        if (results) mensagem_erro += " Email já cadastrado";
        console.log(mensagem_erro);
    });

    if (mensagem_erro != '') {
        console.log(mensagem_erro);
        res.render('cadastro', { mensagem_erro: mensagem_erro })
    } else {
        db.query(query_insert, [valores], (error) => {
            if (error) return res.json(error);
            if (mensagem_erro != '') {
                console.log(mensagem_erro);
                return res.render('cadastro', { mensagem_erro: mensagem_erro })
            }
            else { return res.render('login', { error: null, email: null }); }
        });
    }
}
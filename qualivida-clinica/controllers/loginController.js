import { db } from "../database/db.js";

export const getPage = (req, res) => {
    res.render('login', { error: null });
}

export const loginUsuario = (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    const query = "SELECT * FROM usuario WHERE email=? and senha=?";

    const valores = [email, senha];

    db.query(query, [...valores], (error, data) => {
        if (error) {
            return res.json(error);
        }

        if (data.length > 0) {
            return res.json(data).status(200);
        } else {
            res.render('login', { error: "Email e/ou senha inválidos!" })
        }
    });
}
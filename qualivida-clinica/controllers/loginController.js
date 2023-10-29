import { db } from "../database/db.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getPage = (req, res) => {
    const filePath = path.join(__dirname, '..', "public", "views", "login.html");
    res.sendFile(filePath);
}

export const loginUsuario = (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    const error = [];

    if (email === "") {
        error.push("Email inválido");
    }

    if (senha === "") {
        error.push("Senha inválida");
    }

    if (error.length !== 0) {
        res.send(error);
        return;
    }

    const query = "SELECT * FROM usuario WHERE email=? and senha=?";

    const valores = [email, senha];

    db.query(query, [...valores], (error, data) => {
        if (error) {
            return res.json(error);
        }
        return res.json(data).status(200);
    });
}
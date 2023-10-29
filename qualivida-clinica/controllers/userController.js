import { db } from "../database/db.js";

export const selectUsuarios = (req, res) => {
    const query = "SELECT * FROM usuario";
    db.query(query, (error, data) => {
        if (error) return res.json(error)
        return res.json(data).status(200)
    });
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

export const insertUsuarios = (req, res) => {
    const query = "INSERT INTO usuario(nome) VALUES(?)";
    db.query(query, [req.body.nome], (error) => {
        if (error) return res.json(error)
        return res.json("Usuário cadastrado com sucesso").status(200)
    });
}

export const updateUsuarios = (req, res) => {
    const query = "UPDATE usuario SET nome = ? WHERE id=?";

    const valores = [
        req.body.nome,
        req.params.id
    ]

    db.query(query, [...valores], (error) => {
        if (error) return res.json(error)
        return res.json("Usuário atualizado com sucesso").status(200)
    });
}

export const deleteUsuarios = (req, res) => {
    const query = "DELETE FROM usuario WHERE id=?";

    db.query(query, req.params.id, (error) => {
        if (error) return res.json(error)
        return res.json("Usuário deletado com sucesso").status(200)
    });
}
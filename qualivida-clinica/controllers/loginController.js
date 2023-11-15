import { db } from "../database/db.js";
import bcrypt from "bcrypt";

async function comparePasswords(userInputPassword, hashedPasswordFromDatabase) {
    try {
        const result = await bcrypt.compare(userInputPassword, hashedPasswordFromDatabase);

        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const getPage = (req, res) => {
    res.render('login');
}

export const loginUsuario = (req, res) => {

    if (req.body.action === 'logout') {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).send('Internal Server Error');
            }
            return;
        });
    }

    const email = req.body.email;
    const senha = req.body.senha;

    const query = "SELECT * FROM usuario WHERE email=?";

    db.query(query, email, (error, data) => {
        if (error) {
            return res.json(error);
        }

        if (data.length > 0) {
            const user = data[0];

            //Logar na session e talvez cookie...
            if (comparePasswords(senha, user.senha)) {
                req.session.userId = user.usuario_id;
                req.session.username = user.nome.split(' ')[0];
                console.log(req.session);
                res.redirect('/');
                return;
            }
        }
        res.render('login', { error: "Email e/ou senha inválidos", email: email })
        return;
    });
}
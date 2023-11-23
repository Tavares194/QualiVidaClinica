import User from '../models/User.js'
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

export const loginUsuario = async (req, res) => {
    if (req.body.action === 'logout') {
        try {
            res.clearCookie('userId');
            await new Promise((resolve, reject) => {
                req.session.destroy((err) => {
                    if (err) {
                        console.error('Error destroying session:', err);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            return res.redirect('/');
        } catch (error) {
            console.error('Error during logout:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    const { email, senha } = req.body;

    const users = await User.findAll({
        attributes: ['usuario_id', 'senha', 'nome'],
        where: {
            email: email
        }
    });

    if (users.length > 0) {
        const user = users[0];
        const passwordsMatch = await comparePasswords(senha, user.senha);
        if (passwordsMatch) {
            const userInfo = {
                "userId": user.usuario_id,
                "username": user.nome.split(' ')[0]
            }

            const rememberMe = req.body.remember_me;
            if (rememberMe) {
                res.cookie('userId', userInfo.userId, {
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                    httpOnly: true,
                });
            }

            req.session.user = userInfo;
            res.redirect('/');
            return;
        }
    }
    res.render('login', { error: req.__("errors.login.invalid-credentials"), email: email })
    return;
};

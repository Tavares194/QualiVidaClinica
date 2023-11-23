import User from '../models/User.js'

export const checkLoggedIn = (req, res, next) => {
  if (req.session && req.session.user) {
    return res.redirect('/');
  }
  next();
};

export const checkCookieAuth = async (req, res) => {
  if (!req.session.user && req.cookies && req.cookies.userId) {
    const userId = req.cookies.userId;
    const user = await User.findByPk(userId, {
      attributes: ['usuario_id', 'nome']
    });

    if (user) {
      const userInfo = {
        "userId": user.usuario_id,
        "username": user.nome.split(' ')[0]
      }

      req.session.user = userInfo;
    }
  }
}

export const getPage = (req, res) => {
    const username = req.session.user ? req.session.user.username : undefined;
    res.render('home', { username });
}
export const getPage = (req, res) => {
    const username = req.session.username
    res.render('home', { username });
}
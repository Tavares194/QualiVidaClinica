export const getPage = (req, res) => {
    res.render('home', { error: null, email: null });
}
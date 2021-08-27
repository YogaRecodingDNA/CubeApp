module.exports = function(req, res) {

    res.clearCookie("loggedIn");

    res.clearCookie("token");

    res.redirect('/');

};
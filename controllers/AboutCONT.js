const mongoose = require('mongoose');

module.exports = function (req, res) {

    const loggedIn = req.cookies.loggedIn;

    res.render("about", {loggedIn});

};





// module.exports = AboutController = function (req, res) {

//     res.render("about");

// };
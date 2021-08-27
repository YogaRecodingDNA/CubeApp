const bcrypt = require('bcrypt');
const User = require('../../models/User');

module.exports = function (req, res) {

    const body = req.body;

    const pw = body.password;
    
    const saltRounds = 9;

        bcrypt.hash(pw, saltRounds, (err, hash) => { 

            body.password = hash;

            const newUser = new User(body);
    
            newUser.save(function (err, newUser) {
                if (err) return console.error(err);
            });
        });

    res.redirect('/login');

};
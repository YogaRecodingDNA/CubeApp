const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');



exports.about = function (req, res) {

    const loggedIn = req.cookies.loggedIn;

    res.render("about", {loggedIn});

};



exports.register = function (req, res) {

    let notification = req.cookies.invalid;
    
    res.render('registerPage', {
        notification,
    });

    if (notification){ res.clearCookie('invalid'); }

};



exports.registerPOST = function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        console.log(errors);

        const errorMsg = errors.array()[0].msg;

        res.cookie("invalid", errorMsg, { maxAge: 3000 });

        res.redirect('/register');

    } else {

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

    }

};



exports.login = function (req, res){

    let notification = req.cookies.invalid;
    
    res.render('loginPage', {
        notification,
    });
    
    if (notification){ res.clearCookie('invalid'); }
};



exports.loginPOST = function(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        console.log(errors);

        const errorMsg = errors.array()[0].msg;

        res.cookie("invalid", errorMsg, { maxAge: 3000 });
        
        res.redirect('/login');
        
    } else {
        
        // Get username and password
        const un = req.body.username;
        const pw = req.body.password;
        
        // Find user by username
        User.findOne({username: un}, function(err, user){

            // Grab User's data and assign to variables for later use
            const userId = user._id;
            const username = user.username;
            const hashedPW = user.password;

            // Compare logged in password to the found-user's Hashed password
            bcrypt.compare(pw, hashedPW, (err, matchedPW) => { 
                
                // If password is a match...
                if(matchedPW == true){
                    
                    // Place user id and username into JWT payload object for later use and set expiry time
                    const payload = { userId, username };
                    const options = { expiresIn: '1h' };
                    
                    // Create json web token
                    const token = jwt.sign(payload, process.env.secret, options);
                    
                    // Set new cookie property called "token" { token: ajsdf89a767649rhu2efoairgaoi}
                    res.cookie("token", token, { httpOnly: true, maxAge: 6 * 300000 });
                    
                    // Set new cookie property called "loggedIn" to  "true" { loggedIn: true }
                    res.cookie("loggedIn", true, { maxAge: 6 * 300000 });
                    
                    res.redirect('/');
                    
                } else {

                   res.cookie("invalid", 'Please enter the correct password.', { maxAge: 3000 });
                   
                   res.redirect('/login');
               }
           }); 
        });
    }
};



exports.logout = function(req, res) {

    res.clearCookie("loggedIn");

    res.clearCookie("token");

    res.clearCookie('invalid');

    res.redirect('/');

};
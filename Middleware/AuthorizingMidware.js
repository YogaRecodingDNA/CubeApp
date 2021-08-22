 const jwt = require("jsonwebtoken");
 
 module.exports = function(req, res, next) {
     
    const currentPath = req.route.path;
    const loggedIn = req.cookies.loggedIn;
    const details = '/details/:id';
    const home = '/';
     
    try {

        if(loggedIn){

            const token = req.cookies.token;
            
            const userInfo = jwt.verify(token, process.env.secret);
            
            req.user = userInfo;

            next();

        } else if (!loggedIn && (currentPath == home || currentPath == details)){

            next();

        } else {

            res.redirect('/login');

        }

    } catch (err) {

        console.log("Error!", err);

    }

 };

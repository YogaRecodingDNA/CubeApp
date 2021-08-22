const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

module.exports = function(req, res) {

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
               const options = { expiresIn: '2d' };
   
               // Create your json web token
               const token = jwt.sign(payload, process.env.secret, options);
               
               // Set new cookie property called "token" { token: ajsdf89a767649rhu2efoairgaoi}
               res.cookie("token", token, { httpOnly: true, maxAge: 3 * 300000 });
               
               // Set new cookie property called "loggedIn" to  "true" { loggedIn: true }
               res.cookie("loggedIn", true, { maxAge: 3 * 300000 });
            
               res.redirect('/');
                  
           } else {
               
               console.log("PASSWORDS DON'T MATCH!");
               res.redirect('/login');
           }
       }); 
    }); 
};








/* 

try {
		console.log(req.body);
		const { username, password } = req.body;
		const user = await User.findByCredentials(username, password);

		const token = await user.generateAuthToken();

		// set token as a cookie
		res.cookie("token", token, { httpOnly: true, maxAge: 10000 * 10000 });

		res.cookie("loggedIn", true);

		//res.send({ user, token });
	
        
*/

/* 

res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true })
res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })

*/
const Cube = require('../models/Cube');

module.exports = function (req, res) {

    const loggedIn = req.cookies.loggedIn;

    Cube.find(function (err, cubes) {
        
        if (err) return console.error(err); 
        
        res.render("index", {cubes, loggedIn});
        
    });
};





// console.log("Got my token ====>", token);
// console.log("Got my REQ Cookies ====>", req.cookies);
// console.log("token ====>", req.cookies.token);
// console.log("loggedIn", req.cookies.loggedIn);


// module.exports = HompageController = function (req, res) {

//     Cube.find(function (err, cubes) {

//         if (err) return console.error(err); 

//         res.render("index", {cubes});

//     });

// };
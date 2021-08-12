const mongoose = require('mongoose');
const Cube = require('../models/Cube');

module.exports = function (req, res) {

    Cube.find(function (err, cubes) {

        if (err) return console.error(err); 

        res.render("index", {cubes});

    });

};







// module.exports = HompageController = function (req, res) {

//     Cube.find(function (err, cubes) {

//         if (err) return console.error(err); 

//         res.render("index", {cubes});

//     });

// };
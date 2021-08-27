const mongoose = require('mongoose');
const Cube = require('../models/Cube');

module.exports = function (req, res) {

    const newCube = new Cube(req.body);
    
    newCube.save(function (err, newCube) {

        if (err) return console.error(err);

      });

      res.redirect('/');
      
};


// module.exports = POSTcreateController = function (req, res) {

//     const newCube = new Cube(req.body);
    
//     newCube.save(function (err, newCube) {

//         if (err) return console.error(err);

//       });

//       res.redirect('/');
      
// };
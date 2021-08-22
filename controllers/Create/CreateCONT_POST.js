const Cube = require('../../models/Cube');

// REQUIRES AUTHENTICATION
module.exports = function (req, res) {

  // Access the jwt payload to assign the logged in user's id to UserID
  const UserID = req.user.userId;

  // Set Cube's property "creatorId" value to the current UserID acquired from the jwt verify
  req.body.creatorId = UserID;

  // Create new cube using info in your req.body
  const newCube = new Cube(req.body);
  
  // Save cube to database
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
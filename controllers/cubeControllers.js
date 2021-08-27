const Cube = require('../models/Cube');
const { validationResult } = require('express-validator');



exports.home = function (req, res) {

    // Check cookies to see if user is logged in
    const loggedIn = req.cookies.loggedIn;

    // Get all cubes from database to render to screen
    Cube.find(function (err, cubes) { // cubes === the found cubes from Cube.find    
        if (err) return console.error(err);
        
        // Render the index/Homepage and set the properties inside the object
        // for handlebars to manipulate the html from server side.
        res.render("index", {cubes, loggedIn});
        
    });
};



exports.details = function(req, res) {

    Cube.findById(req.params.id).
    populate('accessory').
    exec(function (err, cube) { 
        if (err) return console.error(err);
        
        if(req.cookies.loggedIn){
            
            const userID = req.user.userId;
            
            let authorized = (cube.creatorId == userID) ? true : false;

            res.render("details", {
                cube,
                loggedIn: true,
                authorized,
            });
           
        } else {

            res.render("details", {
                cube,
                loggedIn: false,
                authorized: false,
            }); 

        }
    });
};



exports.create = function (req, res) {

    const loggedIn = req.cookies.loggedIn;

    const notification = req.cookies.invalid;
    
    res.render("create", {
        loggedIn,
        notification,
    });

    if (notification){ res.clearCookie('invalid'); }
    
};



exports.createPOST = function (req, res) {

    if (req.cookies.invalid){ res.clearCookie('invalid'); }
  
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
  
      console.log(errors);
  
      const errorMsg = errors.array()[0].msg;
  
      res.cookie("invalid", errorMsg, { maxAge: 3000 });
  
      res.redirect('/create');
      
    } else {
      
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
  
    }
  
  };



exports.edit = function (req, res){

    const notification = req.cookies.invalid;

    Cube.findById(req.params.id, function(err, cube){

        // LOGIC FOR DROPDOWN SELECT MENU (populate the current cube's difficulty level, 
        // with the others still available to choose from)
        
        // Declare empty array for options
        let options = [];

        // Assign current cube's difficulty level (1-6) to variable and convert to digit
        let difficulty = Number(cube.difficultyLevel);

        // Loop through 6 options
        for(let i = 1; i <= 6; i++){

            // If current iterator == diff level of cube
            if (i == difficulty){

                // Set the associated index to true
                options[i -1] = true;

            } else {

                // Otherwise set current iterator minus 1's index to false
                options[i -1] = false;
            }
        }

        // Assign each index's value to a variable pertaining to each option in hbs template
        let [level_1, level_2, level_3, level_4, level_5, level_6] = options;

        // Place all options into the hbs-render-object for the hbs {{#if}} helper to conditionally 
        // populate the selected (true) element.. False valued (unselected elements) are still 
        // available in the dropdown menu.
        res.render('editCubePage', {
            cube,
            notification,
            level_1,
            level_2,
            level_3,
            level_4,
            level_5,
            level_6,
        });
    });

    if (notification){ res.clearCookie('invalid'); }
};



exports.editPOST = function (req, res) {

    const cubeID = req.params.id;

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
  
      console.log(errors);
  
      const errorMsg = errors.array()[0].msg;
  
      res.cookie("invalid", errorMsg, { maxAge: 3000 });
  
      res.redirect(`/edit/${cubeID}`);
      
    } else {
  
        Cube.findByIdAndUpdate({_id: cubeID}, req.body, function(err, editedCube) {
            if (err) console.error(err);
      
            editedCube.save(function(err, result){
                if (err) console.error(err);
                res.redirect('/');
            });
        });
        
    }

};



exports.delete = function (req, res){
    
    Cube.findById(req.params.id, function(err, cube){
         // LOGIC FOR DROPDOWN SELECT MENU (populate the current cube's difficulty level, with the others still available to choose from)
        let options = [];

        let difficulty = Number(cube.difficultyLevel);

        for(let i = 1; i <= 6; i++){

            if (i == difficulty){

                options[i -1] = true;

            } else {

                options[i -1] = false;
            }
        }

        let [level_1, level_2, level_3, level_4, level_5, level_6] = options;

        res.render('deleteCubePage', {
            cube,
            level_1,
            level_2,
            level_3,
            level_4,
            level_5,
            level_6,
        });
    });
};



exports.deletePOST = function (req, res) {

    Cube.findByIdAndDelete(req.params.id, function(err, cube) {
        if (err) console.error(err);

        res.redirect('/');
    });
};
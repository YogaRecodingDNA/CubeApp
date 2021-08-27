const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');
const { validationResult } = require('express-validator');



exports.createAccessory = function (req, res) {

    const loggedIn = req.cookies.loggedIn;

    const notification = req.cookies.invalid;
    
    res.render("createAccessory", {
        loggedIn,
        notification,
    });

    if (notification){ res.clearCookie('invalid'); }
    
};



exports.createAccessoryPOST = function (req, res) {

    if (req.cookies.invalid){ res.clearCookie('invalid'); }
  
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
  
      console.log(errors);
  
      const errorMsg = errors.array()[0].msg;
  
      res.cookie("invalid", errorMsg, { maxAge: 3000 });
  
      res.redirect('/create/accessory');
      
    } else {
  
      const newAccessory = new Accessory(req.body);
      
      newAccessory.save(function (err, newAccessory) {
    
          if (err) return console.error(err);
    
        });
    
        res.redirect('/create/accessory');
  
    }
};



exports.attachAccessory = function (req, res) {

    Accessory.find( function(err, accessories) {
        if (err) return console.error(err);
        
        Cube.findById(req.params.id).
        populate('accessory').
        exec(function (err, cube) {
            if (err) return console.error(err);
    
            let manageAttached = cube.accessory.length == accessories.length ? true : false;
        
            res.render("attachAccessory", {
                cube,
                accessories,
                manageAttached
            }); 
        }); 
    });
};



exports.attachAccessoryPOST = function (req, res) {

    // Retrieve value of selection menu (chosen accessory)
    const selectedAccessory = req.body.accessory;

    // Retrieve current cube's id from the "/:id" parameter in the url path
    const cubeId = req.params.id;

    // Find current cube by Id
    Cube.findById(cubeId, function (err, cube) {

        if (err) return console.error(err);
        
        // Get collection of existing accessories
        Accessory.find(function (err, accessories){
            
            // Filter out the accessory doc associated with the chosen option
            let attachThisAccessory = accessories.filter( accessory => accessory.name == selectedAccessory)[0];
            
            if (!cube.accessory.includes(attachThisAccessory._id)){

                cube.accessory.push(attachThisAccessory);

                cube.save( function (err) {

                    if (err) return console.error(err);

                    res.redirect(`/details/${cubeId}`);

                });

            } else {
                
                console.log("Accessory Already Attached to this Cube!");
                
                res.redirect(`/details/${cubeId}`);
            }
        });
    });
};
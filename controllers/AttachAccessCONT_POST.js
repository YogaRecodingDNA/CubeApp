const mongoose = require('mongoose');
const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

module.exports = function (req, res) {

    console.log(req);

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

// 110c08d6c935480a8bb4641

// module.exports = POSTattachAccessoryController = function (req, res) {

//     // Retrieve value of selection menu (chosen accessory)
//     const selectedAccessory = req.body.accessory;

//     const cubeId = req.params.id;

//     // Find current cube by Id
//     Cube.findById(cubeId, function (err, cube) {

//         if (err) return console.error(err);
        
//         // Get collection of existing accessories
//         Accessory.find(function (err, accessories){
            
//             // Filter out the accessory doc associated with the chosen option
//             let attachThisAccessory = accessories.filter( accessory => accessory.name == selectedAccessory)[0];
            
//             if (!cube.accessory.includes(attachThisAccessory)){

//                 cube.accessory.push(attachThisAccessory);

//                 cube.save( function (err) {

//                     if (err) return console.error(err);

//                     res.redirect(`/details/${cubeId}`);

//                 });

//             }

//         });

//     });

// };
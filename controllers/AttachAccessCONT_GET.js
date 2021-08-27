const mongoose = require('mongoose');
const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

module.exports = function (req, res) {

    Cube.findById(req.params.id, function (err, cube) {
        if (err) return console.error(err);

        Accessory.find( function(err, accessories) {
            if (err) return console.error(err);
            console.log("Accessories ====>", accessories);
        })
        .then(response => {

            let attachedAcc;

            if (response.length == cube.accessory.length) {
                attachedAcc = true;
            } else {
                attachedAcc = false;
            }

            res.render("attachAccessory", {
                cube,
                response,
                attachedAcc
            });
        });
    });
};

 // response.forEach( collectionItem => {
            //     if (cube.accessory.includes(collectionItem._id)) {
            //         attachedArray.push(collectionItem);
            //     }
            // });


/*
IAN'S .LEAN() METHOD
 app.get('/attachAccessory/:id', function(req, res) {
    Cube.find(function(err, cubes) {
        let cubeId = req.url.split('/')[2];
        let cubeDetails = cubes.filter(data => data._id == cubeId);
        console.log('THESE ARE THE CUBES', cubes);
        
        Accessory.find(function(err, accessories) {

            let accessoryList = [];
            accessories.forEach(element => {
                accessoryList.push(element);
            });
            console.log(accessoryList);
            res.render('attachAccessory', {cubeDetails, accessoryList});
        }).lean(); 
    }).lean();
}); 
*/



// module.exports = GETattachAccessoryController = function (req, res) {

//     Cube.findById(req.params.id, function (err, cube) {
//         if (err) return console.error(err);

//         Accessory.find( function(err, accessories) {
//             if (err) return console.error(err);
//         })
//         .then(response => {

//             let attachedArray = [];
//             response.forEach( collectionItem => {
//                 if (cube.accessory.includes(collectionItem._id)) {
//                     attachedArray.push(collectionItem);
//                 }
//             });

//             if (response.length == attachedArray.length) {
//                 attachedArray = true;
//             } else {
//                 attachedArray = false;
//             }

//             res.render("attachAccessory", {
//                 cube,
//                 response,
//                 attachedArray
//             });

//         });
//     });
// };
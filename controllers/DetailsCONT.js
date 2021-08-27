const mongoose = require('mongoose');
const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

module.exports = function (req, res) {

    Cube.findById(req.params.id, function (err, cube) {

        if (err) return console.error(err);

        Accessory.find( function(err, accessories) {

            if (err) return console.error(err);

        }).then(response => {  

            let attachedArray = [];

            response.forEach( collectionItem => {

                if (cube.accessory.includes(collectionItem._id)) {

                    attachedArray.push(collectionItem);

                }

            });

            res.render("details", {
                cube,
                attachedArray,
            });

        });
    });
};





// Cube.findOne({ _id: req.params.id }).
    // populate('accessory'). // <-- key name inside my cube object
    // exec(function (err, myCube) { // <-- myCube === the Cube you found by id
    //     if (err) return console.error(err);

    //     let accessories = myCube.accessory;
    //     console.log('myCube ====> ', myCube);
    //     console.log('The accessories are', accessories);
    //     // console.log('The accessories are', story.accessories);
    //     res.render("details", {
    //         myCube,
    //         accessories,
    //     });
    // });




// module.exports = DetailsController = function (req, res) {

//     Cube.findById(req.params.id, function (err, cube) {

//         if (err) return console.error(err);

//         Accessory.find( function(err, accessories) {

//             if (err) return console.error(err);

//         }).then(data => {  

//             let attachedArray = [];

//             data.forEach( collectionItem => {

//                 if (cube.accessory.includes(collectionItem._id)) {

//                     attachedArray.push(collectionItem);

//                 }

//             });

//             res.render("details", {
//                 cube,
//                 attachedArray,
//             });

//         });
//     });
// };
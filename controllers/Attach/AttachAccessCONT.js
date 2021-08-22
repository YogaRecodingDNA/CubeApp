const Cube = require('../../models/Cube');
const Accessory = require('../../models/Accessory');

// REQUIRES AUTHENTICATION
module.exports = function (req, res) {

    // ***ALT version below
    Accessory.find( function(err, accessories) {// accessories === the entire Accessory collection
        if (err) return console.error(err);
        
        Cube.findById(req.params.id).
        populate('accessory').
        exec(function (err, cube) { // <-- cube === the Cube you found by id
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


/***ALT VERSION (WITHOUT POPULATE METHOD)

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
*/


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
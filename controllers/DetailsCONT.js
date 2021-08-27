const Cube = require('../models/Cube');

// Check current cube's CreatorId for a match to the current User's ID
module.exports = function(req, res) {

    Cube.findById(req.params.id).
    populate('accessory').
    exec(function (err, cube) { // <-- cube === the Cube you found by id   
        if (err) return console.error(err);
        
        if(req.cookies.loggedIn){
            
            const UserID = req.user.userId;
            
            let authorized = (cube.creatorId == UserID) ? true : false;

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



/* 
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async(req, res, next) => {
  console.log(req.cookies)
    const token = req.cookies.token;
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log('the data is ', data)
    try {
        const user = await User.findOne({ _id: data._id })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth
*/





/* 
***
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
    */








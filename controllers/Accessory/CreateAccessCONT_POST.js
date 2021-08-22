const Accessory = require('../../models/Accessory');

module.exports = function (req, res) {

    const newAccessory = new Accessory(req.body);
    
    newAccessory.save(function (err, newAccessory) {

        if (err) return console.error(err);

      });

      res.redirect('/create/accessory');

};





// module.exports = postAccessory = function (req, res) {

//     const newAccessory = new Accessory(req.body);
    
//     newAccessory.save(function (err, newAccessory) {

//         if (err) return console.error(err);

//       });

//       res.redirect('/create/accessory');
      
// };
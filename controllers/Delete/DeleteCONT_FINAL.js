const Cube = require('../../models/Cube');

module.exports = function (req, res) {

    Cube.findByIdAndDelete(req.params.id, function(err, cube) {
        if (err) console.error(err);

        res.redirect('/');
    });
};
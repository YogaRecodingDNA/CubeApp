const Cube = require('../../models/Cube');

module.exports = function (req, res) {

    Cube.findByIdAndUpdate({_id: req.params.id}, req.body, function(err, editedCube) {
        if (err) console.error(err);

        editedCube.save(function(err, result){
            if (err) console.error(err);
            res.redirect('/');
        });
    });
};
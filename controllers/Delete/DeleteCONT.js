const Cube = require('../../models/Cube');

module.exports = function (req, res){
    
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
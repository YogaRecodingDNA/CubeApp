const Cube = require('../../models/Cube');

module.exports = function (req, res){

    Cube.findById(req.params.id, function(err, cube){

        // LOGIC FOR DROPDOWN SELECT MENU (populate the current cube's difficulty level, 
        // with the others still available to choose from)
        
        // Declare empty array for options
        let options = [];

        // Assign current cube's difficulty level (1-6) to variable and convert to digit
        let difficulty = Number(cube.difficultyLevel);

        // Loop through 6 options
        for(let i = 1; i <= 6; i++){

            // If current iterator == diff level of cube
            if (i == difficulty){

                // Set the associated index to true
                options[i -1] = true;

            } else {

                // Otherwise set current iterator minus 1's index to false
                options[i -1] = false;
            }
        }

        // Assign each index's value to a variable pertaining to each option in hbs template
        let [level_1, level_2, level_3, level_4, level_5, level_6] = options;

        // Place all options into the hbs-render-object for the hbs {{#if}} helper to conditionally 
        // populate the selected (true) element.. False valued (unselected elements) are still 
        // available in the dropdown menu.
        res.render('editCubePage', {
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
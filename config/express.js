const express = require('express');
const exp_hbs = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = (app) => {
    
    // View Engine Setup
    app.set("view engine", "hbs");
    app.engine(
	"hbs",
	exp_hbs({
		extname: "hbs",
		defaultLayout: "",
        layoutsDir: __dirname + "/views",
        partialsDir: __dirname + "/views",
	})
);
    
    //TODO: Setup the body parser
    app.use(bodyParser.urlencoded({extended: true}));

    //TODO: Setup the static files
    app.use(express.static('static'));

};







// app.set('views', path.join(__dirname, 'views')); // setting folder for public files

    // // register the partials, hint if it says module not found after you do this, its because the module most likely isn't there! Import it! 

    // hbs.registerPartials(__dirname + '/views/partials'); 

    // // setting view engine to hbs, engine compiles views and data into HTML

    // app.set('view engine', 'hbs');

const express = require('express');
const exp_hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    
    // View Engine
    app.set("view engine", "hbs");
    app.engine(
	"hbs",
	exp_hbs({
		extname: "hbs",
		defaultLayout: "",
        layoutsDir: __dirname + "/views",
        partialsDir: __dirname + "/views",
	}));
    
    
    // Body Parser
    app.use(bodyParser.urlencoded({extended: true}));

    // Cookie Parser
    app.use(cookieParser());

    // Static Files
    app.use(express.static('static'));

};
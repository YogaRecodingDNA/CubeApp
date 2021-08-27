const mongoose = require('mongoose');
const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');
const HomepageCONT = require('../controllers/HomepageCONT');
const AboutCONT = require('../controllers/AboutCONT');
const DetailsCONT = require('../controllers/DetailsCONT');
const CreateCONT_GET = require('../controllers/CreateCONT_GET');
const CreateCONT_POST = require('../controllers/CreateCONT_POST');
const CreateAccessCONT_GET = require('../controllers/CreateAccessCONT_GET');
const CreateAccessCONT_POST = require('../controllers/CreateAccessCONT_POST');
const AttachAccessCONT_GET = require('../controllers/AttachAccessCONT_GET');
const AttachAccessCONT_POST = require('../controllers/AttachAccessCONT_POST');
const _404CONT = require('../controllers/_404CONT');

module.exports = (app) => {
    
    app.get('/', HomepageCONT);

    app.get('/about', AboutCONT);
    
    app.get('/create', CreateCONT_GET);

    app.post('/create', CreateCONT_POST);
    
    app.get('/create/accessory', CreateAccessCONT_GET);

    app.post('/create/accessory', CreateAccessCONT_POST);
    
    app.get('/details/:id', DetailsCONT);

    app.get('/attach/accessory/:id', AttachAccessCONT_GET);

    app.post('/attach/accessory/:id', AttachAccessCONT_POST);

    app.get('/*', _404CONT);

};
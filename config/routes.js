const AuthMidware = require('../Middleware/AuthorizingMidware');
const AboutCONT = require('../controllers/AboutCONT');
const AttachAccessCONT = require('../controllers/Attach/AttachAccessCONT');
const AttachAccessCONT_POST = require('../controllers/Attach/AttachAccessCONT_POST');
const CreateCONT = require('../controllers/Create/CreateCONT');
const CreateCONT_POST = require('../controllers/Create/CreateCONT_POST');
const CreateAccessCONT = require('../controllers/Accessory/CreateAccessCONT');
const CreateAccessCONT_POST = require('../controllers/Accessory/CreateAccessCONT_POST');
const DetailsCONT = require('../controllers/DetailsCONT');
const EditCONT = require('../controllers/Edit/EditCONT');
const EditCONT_POST = require('../controllers/Edit/EditCONT_POST');
const DeleteCONT = require('../controllers/Delete/DeleteCONT');
const DeleteCONT_FINAL = require('../controllers/Delete/DeleteCONT_FINAL');
const HomepageCONT = require('../controllers/HomepageCONT');
const LoginCONT = require('../controllers/Login/LoginCONT');
const LoginCONT_POST = require('../controllers/Login/LoginCONT_POST');
const LogoutCONT = require('../controllers/LogoutCONT');
const RegisterCONT = require('../controllers/Register/RegisterCONT');
const RegisterCONT_POST = require('../controllers/Register/RegisterCONT_POST');
const _404CONT = require('../controllers/_404CONT');

module.exports = (app) => {
    
    app.get('/', AuthMidware, HomepageCONT);

    app.get('/about', AuthMidware, AboutCONT);
    
    app.get('/create', AuthMidware, CreateCONT);

    app.post('/create', AuthMidware, CreateCONT_POST);
    
    app.get('/create/accessory', AuthMidware, CreateAccessCONT); // Phase 2 addition

    app.post('/create/accessory', AuthMidware, CreateAccessCONT_POST); // Phase 2 addition
    
    app.get('/details/:id', AuthMidware, DetailsCONT);

    app.get('/attach/accessory/:id', AuthMidware, AttachAccessCONT); // Phase 2 addition

    app.post('/attach/accessory/:id', AttachAccessCONT_POST); // Phase 2 addition

    app.get('/edit/:id', AuthMidware, EditCONT); // Phase 3 addition

    app.post('/edit/:id', AuthMidware, EditCONT_POST); // Phase 3 addition

    app.get('/delete/:id', AuthMidware, DeleteCONT); // Phase 3 addition

    app.post('/delete/:id', AuthMidware, DeleteCONT_FINAL); // Phase 3 addition

    app.get('/login', LoginCONT); // Phase 3 addition

    app.post('/login', LoginCONT_POST); // Phase 3 addition

    app.get('/register', RegisterCONT); // Phase 3 addition

    app.post('/register', RegisterCONT_POST); // Phase 3 addition

    app.get('/logout', AuthMidware, LogoutCONT); // Phase 3 addition

    app.get('/*', _404CONT);

};





















/* 

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User');
const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

*/
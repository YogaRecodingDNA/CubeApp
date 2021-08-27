// Middleware
const authorization = require('../Middleware/authorization');
const validation = require('../Middleware/validation');
// Controllers
const entryControllers = require('../controllers/register-login-logoutControllers');
const cubeControllers = require('../controllers/cubeControllers');
const accessoryControllers = require('../controllers/accessoryControllers');
const controller404 = require('../controllers/controller404');

// Routes
module.exports = (app) => {
    
    app.get('/', authorization, cubeControllers.home);

    app.get('/about', authorization, entryControllers.about);
    
    app.get('/create', authorization, cubeControllers.create);

    app.post('/create', validation.create, authorization, cubeControllers.createPOST);
    
    app.get('/create/accessory', authorization, accessoryControllers.createAccessory);

    app.post('/create/accessory', validation.create, authorization, accessoryControllers.createAccessoryPOST);
    
    app.get('/details/:id', authorization, cubeControllers.details);

    app.get('/attach/accessory/:id', authorization, accessoryControllers.attachAccessory);

    app.post('/attach/accessory/:id', authorization, accessoryControllers.attachAccessoryPOST);

    app.get('/edit/:id', authorization, cubeControllers.edit);

    app.post('/edit/:id', validation.edit, authorization, cubeControllers.editPOST);

    app.get('/delete/:id', authorization, cubeControllers.delete);

    app.post('/delete/:id', authorization, cubeControllers.deletePOST);

    app.get('/login', entryControllers.login);

    app.post('/login', validation.login, entryControllers.loginPOST);

    app.get('/register', entryControllers.register);

    app.post('/register', validation.register, entryControllers.registerPOST);

    app.get('/logout', authorization, entryControllers.logout);

    app.get('/*', controller404);

};




















// const CreateCONT = require('../controllers/Create/CreateCONT');
// const CreateCONT_POST = require('../controllers/Create/CreateCONT_POST');
// const DetailsCONT = require('../controllers/DetailsCONT');
// const EditCONT = require('../controllers/Edit/EditCONT');
// const EditCONT_POST = require('../controllers/Edit/EditCONT_POST');
// const DeleteCONT = require('../controllers/Delete/DeleteCONT');
// const DeleteCONT_FINAL = require('../controllers/Delete/DeleteCONT_FINAL');
// const HomepageCONT = require('../controllers/HomepageCONT');



// const CreateAccessCONT = require('../controllers/Accessory/CreateAccessCONT');
// const CreateAccessCONT_POST = require('../controllers/Accessory/CreateAccessCONT_POST');
// const AttachAccessCONT = require('../controllers/Attach/AttachAccessCONT');
// const AttachAccessCONT_POST = require('../controllers/Attach/AttachAccessCONT_POST');



// const AboutCONT = require('../controllers/AboutCONT');

// const validationCreate = require('../Middleware/validationCreate');
// const validationLogin = require('../Middleware/validationLogin');
// const validationRegister = require('../Middleware/validationRegister');


// const LoginCONT = require('../controllers/Login/LoginCONT');
// const LoginCONT_POST = require('../controllers/Login/LoginCONT_POST');
// const LogoutCONT = require('../controllers/LogoutCONT');
// const RegisterCONT = require('../controllers/Register/RegisterCONT');
// const RegisterCONT_POST = require('../controllers/Register/RegisterCONT_POST');
var HomeController = require('./Controllers/HomeController');
// var UserController = require('./Controllers/UserController');

// Routes
module.exports = function(app){  
    // Main Routes
    app.get('/',      HomeController.Index);

    app.post('/ok', HomeController.ok);
    // app.post('/User/RegisterUser', UserController.RegisterUser);
    // app.get('/User/Login', UserController.Login);
    // app.post('/User/LoginUser', UserController.LoginUser);
    // app.get('/User/Logout', UserController.Logout);
    // app.get('/User/SecureArea', UserController.SecureArea);
};

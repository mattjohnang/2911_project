var HomeController = require('./Controllers/HomeController');
var UserController = require('./Controllers/UserController');
var ReviewController = require('./Controllers/ReviewController');

// Routes
module.exports = function(app){  
    // Main Routes

    app.get('/',      HomeController.Index);


    app.get('/User/Register', UserController.Register);
    app.post('/User/RegisterUser', UserController.RegisterUser);
    app.get('/User/Login', UserController.Login);
    app.post('/User/LoginUser', UserController.LoginUser);
    app.get('/User/Logout', UserController.Logout);
    app.get('/User/SecureArea', UserController.SecureArea);
    app.get('/User/Profile', UserController.Profile);
    app.post('/User/UpdateProfile', UserController.UpdateProfile);
    app.get('/User/Edit_Profile', UserController.Edit_Profile)

    
    app.get('/User/My_Reviews', ReviewController.My_Reviews);
    app.get('/User/Reviews', ReviewController.Reviews)
    app.get('/User/WriteReview', ReviewController.WriteReview);
    app.post('/User/CreateReview', ReviewController.CreateReview)
    app.get('/User/EditReview', ReviewController.EditReview)
    app.post('/User/Update_Review', ReviewController.Update_Review)
    app.get('/User/DeleteReview', ReviewController.DeleteReview)

};

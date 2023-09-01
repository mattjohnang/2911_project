const User           = require('../Models/User');
const UserRepo = require('../Data/UserRepo')
const _userRepo = new UserRepo();
var   passport       = require('passport');
const RequestService = require('../Services/RequestService');

exports.Register = async function(req, res) {
    let reqInfo = RequestService.reqHelper(req);
    res.render('User/Register', {errorMessage:"", user:{}, reqInfo:reqInfo})
};

exports.RegisterUser  = async function(req, res){
   
    var password        = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;

    if (password == passwordConfirm) {

        var newUser = new User({
            firstName:    req.body.firstName,
            lastName:     req.body.lastName,
            email:        req.body.email,
            username:     req.body.username,
        });
       
        User.register(new User(newUser), req.body.password, 
                function(err, account) {
                    if (err) {
                        let reqInfo = RequestService.reqHelper(req);
                        return res.render('User/Register', 
                        { user : newUser, errorMessage: err, 
                          reqInfo:reqInfo });
                    }
                   
                    passport.authenticate('local') (req, res, 
                            function () { res.redirect('/User/SecureArea'); });
                });

    }
    else {
      res.render('User/Register', { user:newUser, 
              errorMessage: "Passwords do not match.", 
              reqInfo:reqInfo})
    }
};

exports.Login = async function(req, res) {
    let reqInfo      = RequestService.reqHelper(req);
    let errorMessage = req.query.errorMessage; 

    res.render('User/Login', { user:{}, errorMessage:errorMessage, 
                               reqInfo:reqInfo});
}

exports.LoginUser = (req, res, next) => {

  passport.authenticate('local', {
      successRedirect : '/User/SecureArea', 
      failureRedirect : '/User/Login?errorMessage=Invalid login.', 
  }) (req, res, next);
};

exports.Logout = (req, res) => {
    req.logout();
    let reqInfo = RequestService.reqHelper(req);

    res.render('User/Login', { user:{}, isLoggedIn:false, errorMessage : "", 
                               reqInfo:reqInfo});
};

exports.SecureArea  = async function(req, res) {
    let reqInfo = RequestService.reqHelper(req);

    if(reqInfo.authenticated) {
        res.render('User/SecureArea', {errorMessage:"", reqInfo:reqInfo})
    }
    else {
        res.redirect('/User/Login?errorMessage=You ' + 
                     'must be logged in to view this page.')
    }
}


exports.Profile= async function(req, response){
    let reqInfo = RequestService.reqHelper(req);

    console.log(reqInfo.username)
    if(reqInfo.authenticated) {
        
        response.render('User/Profile',{  reqInfo:reqInfo,
         errorMessage: ""})
    }
    else {
        response.redirect('/User/Login?errorMessage=You ' + 
                     'must be logged in to view this page.')
    }

};

exports.Edit_Profile = async function(req, response){
    let reqInfo = RequestService.reqHelper(req);
    
    console.log(reqInfo.username)
    if(reqInfo.authenticated) {
        let userObj = await _userRepo.getUserByID(reqInfo._id);
        console.log(userObj)
        console.log(reqInfo, "reqInfo")

        response.render('User/Edit_Profile',{  reqInfo:reqInfo,
         errorMessage: ""})
    }
    else {
        response.redirect('/User/Login?errorMessage=You ' + 
                     'must be logged in to view this page.')
    }

};

exports.UpdateProfile = async function(req, response) {
    let reqInfo = RequestService.reqHelper(req);
    let username = req.body.username;
    console.log("Your user name is: " + username);

    var newUser = new User({
        firstName:    req.body.firstName,
        lastName:     req.body.lastName,
        email:        req.body.email,
        username:     req.body.username
    });

    let responseObject = await _userRepo.update(newUser, reqInfo.email);

    if(responseObject.errorMessage == "") {
        response.redirect('Profile');
    }

    else {
        response.render('User/Edit_Profile', { 
            reqInfo:reqInfo,
            user:      responseObject.obj, 
            errorMessage: responseObject.errorMessage });
    }
}

var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
var Admin=require('../models/admin');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    
   User.findById(id, function (err, user) {
        done(err, user);
   });
});

passport.use('local.signup', new LocalStrategy({
    usernameField : 'email',
    password : 'password',
    /*firstname: 'firstname',
    lastname: 'lastname',
    phonenumber: 'phonenumber',*/
    passReqToCallback: true
} , function (req, email, password, done) {
    console.log(req.body.firstname);
    req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4});
    //req.checkBody(req.body.firstname,'Enter your First name').notEmpty();
    //req.checkBody(req.body.lastname,'Enter your Last name').notEmpty();
    //req.checkBody(req.body.phonenumber,'Enter Valid phone number').notEmpty().isInt().isLength(10);
    //console.log("Email: ",email);
    //console.log("Password: ",password);
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email': email}, function (err, user) {
        if(err){
           return done(err);
        }
        if(user){
           return done(null, false, {message: 'email is already in use.'});
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.firstname = req.body.firstname;
        newUser.lastname = req.body.lastname;
        newUser.phonenumber = req.body.phonenumber;
        console.log(newUser);
        newUser.save(function (err, result) {
            if(err){
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},function(req, email, password, done){
    req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email': email}, function (err, user) {
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false, {message: 'No user found'});
        } 
        if(!user.validPassword(password)){
            return done(null, false, {message: 'Wrong Password'});
        } 
        return done(null, user);
        
    });
}));

passport.use('local.adminsignin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,  
},function(req, email, password, done){
    req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    Admin.findOne({'email': email}, function (err, user) {
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false, {message: 'you are not an admin'});
        }
        if(!user.validPassword(password)){
            return done(null, false, {message: 'wrong password'});
        }
        return done(null, user);
        
    });
}));

passport.use('local.adminsignup', new LocalStrategy({
    usernameField : 'email',
    password : 'password',
    passReqToCallback: true
} , function (req, email, password, done) {
    req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4});
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    Admin.findOne({'email': email}, function (err, user) {
        if(err){
           return done(err);
        }
        if(user){
           return done(null, false, {message: 'email is only in use.'});
        }
        var newAdmin = new Admin();
        newAdmin.email = email;
        newAdmin.password = newAdmin.encryptPassword(password);
        newAdmin.save(function (err, result) {
            if(err){
                return done(err);
            }
            return done(null, newAdmin);
        });
    });
}));
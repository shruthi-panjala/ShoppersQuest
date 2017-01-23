var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var mongojs = require('mongojs');
var db = mongojs('shop',['categories','userorders','guestorders','users']);
var csrfProtection = csrf();

router.use(csrfProtection);
router.get('/signup',function (req, res, next) {
    var messages = req.flash('error');
    console.log(req.csrfToken());
    res.render('admin/signup',{layout:'other',csrfToken: req.csrfToken(), messages:messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.adminsignup',{
    successRedirect: '/admin/signin',
    failureRedirect: '/admin/signup',
    failureFlash: true
}));


router.get('/signin', function (req, res, next) {
    var messages = req.flash('error');
    res.render('admin/signin',{layout:'other',csrfToken: req.csrfToken(), messages:messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.adminsignin',{
    successRedirect: '/admin/profile',
    failureRedirect: '/admin/signin',
    failureFlash: true
}));

router.get('/users', function (req, res, next) {
    db.users.find(function (err, docs) {
        res.render('admin/usersdata',{layout:'adminlayout'});
    });
});

router.get('/userorders', function (req, res, next) {
    db.userorders.find(function (err, docs) {
        res.render('admin/userorders',{layout:'adminlayout'});
    });
});

router.get('/guestorders', function (req, res, next) {
    db.guestorders.find(function(err, docs){
        res.render('admin/guestorders',{layout:'adminlayout'});
    });
});

router.get('/addproduct', function (req, res, next) {
    res.render('admin/addproduct',{layout:'adminlayout'});
});

router.post('/addproduct', function (req, res, next) {
    db.categories.insert({title: req.body.name, url: req.body.image, category: req.body.category, dept: req.body.dept,
            subdept: req.body.subdept, price: req.body.price, description:req.body.description},
        function (err, docs) {
            if(docs){
                console.log(docs);
            }
        });
});

router.get('/',function (req, res, next) {
    res.render('admin/dashboard',{layout:'adminlayout'});
});

module.exports = router;
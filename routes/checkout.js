var express = require('express');
var router = express.Router();
var Cart=require('../models/cart');
var mongojs = require('mongojs');
var db = mongojs('shop',['userorders','guestorders','cart']);
var validator = require('express-validator');
//var app=express();
/* GET users listing. */
router.get('/', function(req, res, next) {
    if(!req.session.cart){
        return res.render('cart', { title: "cart" ,layout: "other", products:null});
        //res.redirect('/cart')
    }
    var cart=new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('checkout_last',{title: "CheckOut" ,layout: "other", total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/', function(req, res, next){
    if(!req.session.cart){
        //return res.render('cart', { title: "cart" ,layout: "other", products:null});
        res.redirect('/cart')
    }
    var cart=new Cart(req.session.cart);
    
    var stripe = require("stripe")("sk_test_Epe6a93Yg8fbktEGvgZ8cWOU");
    stripe.charges.create({
            amount: Math.floor((cart.totalPrice /68.12) * 100),
            currency: "usd",
            source: req.body.stripeToken, // obtained with Stripe.js
            description: "Test Charge"
        }, function(err, charge) {
        // asynchronously called
        if(err){
            req.flash('error',err.message);
            return res.redirect('/checkout')
        }
        req.flash('success', 'Successfully bought product!');
        if(req.isAuthenticated()){
            db.userorders.insert({email:req.user.email,order:cart},function(err,docs){
               if(docs){
                   console.log(docs);
               } 
            });
            db.cart.remove({email:req.user.emails},function(err, docs){
                if(err){
                    throw err;
                }
                console.log(docs);
            });
        }
        else{
            db.guestorders.insert({email:req.body.email, name: req.body.name, address: req.body.email, order:cart},function(err, docs){
               if(docs){
                   console.log("guestorders");
               } 
            });
        }
        req.session.cart = null;
        res.redirect('/');
        });
});

module.exports = router;

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}
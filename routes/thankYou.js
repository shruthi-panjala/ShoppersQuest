var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('shop',['orders']);
var Cart=require('../models/cart');

router.get('/', function(req, res, next) {
    var cart= new Cart(req.session.cart ? req.session.cart: {});
    if(req.user){
        var order= new Order(req.session.cart);
        db.orders.insert();
    }
    res.render('thankYou', { title: "Success", layout: "other"});

});

module.exports = router;
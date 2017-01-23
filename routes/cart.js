var express = require('express');
var router = express.Router();
var Cart=require('../models/cart');
//var app=express();
/* GET users listing. */
router.get('/', function(req, res, next) {
    if(!req.session.cart){
      return res.render('cart', { title: "cart",layout: "other",products:null});
    }
    var cart=new Cart(req.session.cart);
    console.log(cart.generateArray()[0].qty);
    res.render('cart',{title: "cart" ,layout: "other", products: cart.generateArray(), totalPrice: cart.totalPrice});
});

module.exports = router;

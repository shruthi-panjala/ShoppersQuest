var express = require('express');
var router = express.Router();
var Cart=require('../models/cart');
//var app=express();
/* GET users listing. */
router.get('/', function(req, res, next) {
    if(!req.session.cart){
      return res.render('checkout', { title: "checkOut" ,
                      layout: "other",
                                     products:null
                      });
    }
var cart=new Cart(req.session.cart);
        res.render('checkout',{title: "checkOut" ,layout: "other", products: cart.generateArray(), totalPrice: cart.totalPrice
                              });
    


});

module.exports = router;

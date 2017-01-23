var express = require('express');
var router = express.Router();
var mongojs= require('mongojs');
var db = mongojs('shop', ['products']);
    var Cart=require('../models/cart');                      
                          
                          
                          
//var app=express();
/* GET users listing. */
router.get('/', function(req, res, next) {
  //fetching data from models folder............
    db.products.find(function(err, docs){
       
        var productChunks=[];
        var chunkSize=3;
        for(var i=0; i < docs.length; i+=chunkSize){
            productChunks.push(docs.slice(i, i+chunkSize));
            
        }
         res.render('shop', { title: 'Shop Online', layout: "other",
                         products: productChunks
                            
                      
                      });
        
       // res.json(docs);
    });
   
    
});
/*router.get('/add-to-cart/:id', function(req,res,next){
    var productId=req.params.id;
    console.log("receiving product id on click:",productId);
    var cart= new Cart(req.session.cart ? req.session.cart: {});
    db.products.find({title:productId}, function(err,prod){
        if(err)
        {    return res.redirect('/men');}
        
        cart.add(prod[0], prod[0].title);
        console.log("beforeeeeee....")
        console.log(prod[0]);
        console.log("receiving.................",prod[0]._id);
        console.log("price:", prod[0].price);
        req.session.cart=cart;
        console.log(req.session.cart);
        res.redirect('/');
        
    });
    
});*/
/*router.get('/addToCart/:id', function(req,res, next){
   var productId=req.params.id;
    var cart=new Cart(req.session.cart ? req.session.cart:{});
db.products.findById(productId, function(err, product){
    if(err){
        return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart= cart;
    console.log(req.session.cart);
    res.redirect('/');
    
});
});*/


module.exports = router;

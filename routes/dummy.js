var express = require('express');
var router = express.Router();
var mongojs= require('mongojs');
var db = mongojs('shop', ['products']);
/* GET home page. */

router.get('/', function(req, res, next) {
  //fetching data from models folder............
    db.products.find(function(err, docs){
       
        var productChunks=[];
        var chunkSize=3;
        for(var i=0; i < docs.length; i+=chunkSize){
            productChunks.push(docs.slice(i, i+chunkSize));
            
        }
         res.render('dummy', { title: 'Shop Online',layout: "noFooter",
                         products: productChunks
                   
                      });
        
       // res.json(docs);
    });

    
});

module.exports = router;

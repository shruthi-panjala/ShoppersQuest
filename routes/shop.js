var express = require('express');
var router = express.Router();
var mongojs= require('mongojs');
var db = mongojs('shop', ['products']);
var db1=mongojs('shop',['categories']);
var Cart=require('../models/cart');                      

router.get('/:id',function(req,res,next){
    var deptName = req.params.id;
    var subdept=[];
    //console.log(req.originalUrl);
    //console.log(deptName);
    db1.categories.distinct("subdept",{dept: deptName}, function(err,docs1){
        for(var i=0;i<docs1.length;i++){
            subdept[i] = {"dept":deptName, "sub":docs1[i]};
        }
        //console.log(subdept);
    });
    db1.categories.find({dept:deptName},function(err, docs){
        if(err){
           return res.redirect('/');
        }
        var productChunks=[];
        var chunkSize=3;
        for(var i=0; i < docs.length; i+=chunkSize){
            productChunks.push(docs.slice(i, i+chunkSize));
        }
        res.render('shop/shop',{title: deptName,layout:"other",category: deptName, dept:deptName,sub_category:subdept,products: productChunks});
    });
});


router.get('/:id/:sub',function(req,res,next){
    var subdept = req.params.sub;
    var dept=req.params.id;
    //console.log("subdept",subdept);
    //console.log("dept",dept);
  db1.categories.find({$and:[{dept:dept},{subdept:subdept}]}, function(err,docs1){
       if(err){
           return res.redirect('/');
       }
       var productChunks=[];
        var chunkSize=3;
        for(var i=0; i < docs1.length; i+=chunkSize){
            productChunks.push(docs1.slice(i, i+chunkSize));
        }
        res.render('shop/shop',{title: dept,layout:"other",category: dept, sub_category:subdept,products: productChunks
                          });
  });
});

module.exports = router;

/*router.get('/', function(req, res, next) {
  //fetching data from models folder............
    db.products.find(function(err, docs){
       
        var productChunks=[];{dept:deptName},
        var chunkSize=3;
        for(var i=0; i < docs.length; i+=chunkSize){
            productChunks.push(docs.slice(i, i+chunkSize));
            
        }
         res.render('shop', { title: 'Shop O
         \nline', layout: "other",
                         products: productChunks
                      });
       // res.json(docs);
    });*/
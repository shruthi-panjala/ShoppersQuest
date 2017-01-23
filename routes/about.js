var express = require('express');
var router = express.Router();
//var app=express();
/* GET users listing. */
router.get('/', function(req, res, next) {
 res.render('about', { title: "about online" ,
                      layout: "other"
                      });

});

module.exports = router;

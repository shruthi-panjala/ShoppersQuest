var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var  mongoose = require('mongoose');
var mongojs= require('mongojs');
var db = mongojs('shop', ['shop']);
var db1=mongojs('shopping',['categories']);
var async = require("async");
var session=require('express-session');
var passport=require('passport');
var flash=require('connect-flash');
var MongoStore=require('connect-mongo')(session);
var validator = require('express-validator')

var adminRoutes=require('./routes/admin');
var userRoutes = require('./routes/user');
var index = require('./routes/index');
var about = require('./routes/about');
var shop = require('./routes/shop');
var cart = require('./routes/cart');
var checkout = require('./routes/checkout');
var tq = require('./routes/thankYou');
var dummy = require('./routes/dummy');
var wishlist = require('./routes/wish');
var singleProduct = require('./routes/single-product');

var app = express();
require('./config/passport');
mongoose.connect('localhost:27017/shop'); 
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());

//session--------------------------
app.use(session({
    secret: 'mysupersecret', 
    resave:false,
    saveUninitialized: false,
    store: new MongoStore({
        host: '127.0.0.1',
        port: '27017',
        db: 'shop',
        url: 'mongodb://localhost:27017/shop'
        }),
    cookie:{maxAge: 180*60*1000}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//----------------------------------------
app.use(function(req, res, next){
    res.locals.login = req.isAuthenticated();
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res, next){
    res.locals.login=req.isAuthenticated();
    //making session variable to be available in all views
    res.locals.session=req.session;
    next();
});

//-------------------------------------------------------





app.use('/about', about);
app.use('/shop', shop);
app.use('/cart', cart);
app.use('/admin',adminRoutes);
app.use('/user', userRoutes);
app.use('/checkout', checkout);
app.use('/tq', tq);
app.use('/wishlist', wishlist);
app.use('/dummy', dummy);
app.use('/product', singleProduct);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

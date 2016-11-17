'use strict';
var path = require('path');
var express=require('express');
var parser=require('body-parser');

var app=express();

//parse incoming req
app.use(parser.json());
app.use(parser.urlencoded({extended:false}));

// serve static files from /public
app.use('/static', express.static(__dirname+'/public'));

// 设置模板目录
app.set('views', __dirname+'/views');
// 设置模板引擎为 ejs
// app.set('view engine', 'pug');

//swig
var swig = require('swig'),
people;
app.set('view engine', 'html');
app.engine('html', swig.renderFile);



//database
var mongoose=require("mongoose");
mongoose.Promise = require('bluebird');
var session=require('express-session');
var mongostore=require('connect-mongo')(session);
mongoose.connect("mongodb://localhost:27017/bookme");
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
app.use(session({
	secret: 'book book',
	resave: true,
	saveUninitialized: false,
	store: new mongostore({
		mongooseConnection: db
	})
}));
app.use(function (req,res,next) {
	res.locals.currentUser=req.session.userId;
	next();
});

//router
var router=require('./src/api/route.js');
app.use('/',router);

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000,function(){
	console.log('server is running on 3000');
})
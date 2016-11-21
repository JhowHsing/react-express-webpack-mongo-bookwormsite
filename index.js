'use strict';
var path = require('path');
var express=require('express');
var parser=require('body-parser');
var flash = require('connect-flash');
// var fs = require('fs');
// var Busboy = require('busboy');
// var os = require('os');

var app=express();

//parse incoming req
app.use(parser.json());
app.use(parser.urlencoded({extended:false}));

// serve static files from /public
app.use('/static', express.static(__dirname+'/public'));

// flash 中间价，用来显示通知
app.use(flash());

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
	//flash
	res.locals.success = req.flash('success').toString();
  	res.locals.error = req.flash('error').toString();
	next();
});

// 处理表单及文件上传的中间件
// app.use(require('express-formidable')({
//   uploadDir: path.join(__dirname, '/public/img'),// 上传文件目录
//   keepExtensions: true// 保留后缀
// }));

//router
var router=require('./src/api/route.js');
app.use('/',router);

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    error: err
  });
});



app.listen(3000,function(){
	console.log('server is running on 3000');
})

module.exports = app;


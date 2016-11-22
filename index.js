'use strict';
var path = require('path');
var express=require('express');
//cookieparser
var cookieParser = require('cookie-parser');
var parser=require('body-parser');
var flash = require('connect-flash');
var passport=require('passport');
var User=require('./src/models/user.js');
var GitHubStrategy=require('passport-github2').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(userId, done) {
  User.findById(userId, function(err, user) {
    done(err, user);
  });
});

function generateOrFindUser(accessToken, refreshToken, profile, done){
  if(profile.emails[0]) {
    User.findOneAndUpdate(
      { email: profile.emails[0].value },
      {
        name: profile.displayName || profile.username,
        email: profile.emails[0].value,
        // photo: profile.photos[0].value
      },
      {
        upsert: true
      },
    done
  );
  } else {
    var noEmailError = new Error("Your email privacy settings prevent you from signing into Bookworm.");
    done(noEmailError, null);
  }
}

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/github/return'
  },
  generateOrFindUser)
);

// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_APP_ID,
//   clientSecret: process.env.FACEBOOK_APP_SECRET,
//   callbackURL: "http://localhost:3000/auth/facebook/return",
//   profileFields: ['id', 'displayName', 'photos', 'email']
// },
//   generateOrFindUser)
// );

// passport.serializeUser(function(user, done){
// 	done(null, user._id);
// });

// passport.deserializeUser(function(userId, done){
// 	User.findById(userId, done);
// });



var router=require('./src/api/route.js');
var auth=require('./src/api/auth.js');
var app=express();

//parse incoming req
app.use(parser.json());
app.use(parser.urlencoded({extended:false}));

//cookie parser
app.use(cookieParser());

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

app.use(session({
	secret: 'book book',
	resave: true,
	saveUninitialized: false,

	store: new mongostore({
		mongooseConnection: db
	})
}));

//Initialize Passport.js
app.use(passport.initialize());

//Restore session
app.use(passport.session());

db.on('error',console.error.bind(console,'connection error:'));

app.use(function (req,res,next) {
	res.locals.currentUser=req.session.userId || JSON.stringify(req.user);
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

app.use('/',router);
// app.get('/', function(req, res){
//   res.render('index', { user: req.user });
// });
// app.get('/login', function(req,res,next){
//   res.render('login')
// });
app.use('/auth',auth);

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    error: err
  });
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


app.listen(3000,function(){
	console.log('server is running on 3000');
})

module.exports = app;


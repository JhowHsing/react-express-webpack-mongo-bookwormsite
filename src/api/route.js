'use strict';
var express=require('express');
var router=express.Router();
var User=require('../models/user.js');
// var mid=require('../../middleware/index.js');

 
router.get('/profile', function(req, res, next) {
 res.render('profile');
});
 
router.post('/profile');


router.get('/', function(req,res,next){
	User.findById(req.session.userId)
      .exec(function (error, user) {
        if (error) {
          return next(error);
        } else if(user){
          return res.render('index', { name: user.name});
        }else{
          return res.render('index')
        }
      });
});
router.get('/register', function(req,res,next){
	res.render('index')
});
// POST /register
router.post('/register', function(req, res, next) {
  if (req.body.email &&
    req.body.username &&
    
    req.body.password &&
    req.body.password_confirm) {

      // confirm that user typed same password twice
      if (req.body.password !== req.body.password_confirm) {
        var err = new Error('两次输入密码须一致！');
        err.status = 400;
        return next(err);
      }

      // create object with form input
      var userData = {
        email: req.body.email,
        name: req.body.username,
        password: req.body.password
      };

      // use schema's `create` method to insert document into Mongo
      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          req.session.userId = user._id;
          return res.redirect('/');
        }
      });

    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
})
router.get('/login', function(req,res,next){
	res.render('index')
});
// POST /login
router.post('/login', function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('邮箱或密码错误！');
        err.status = 401;
        return next(err);
      }  else {
        req.session.userId = user._id;
        return res.redirect('/');
      }
    });

  } else {
    var err = new Error('请您填写邮箱和密码！');
    err.status = 401;
    return next(err);
  }

});
// GET /logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports=router;


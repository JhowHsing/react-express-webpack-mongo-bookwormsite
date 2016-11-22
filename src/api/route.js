'use strict';
var express=require('express');
var router=express.Router();
var User=require('../models/user.js');
var Book=require('../models/book.js');
var formidable = require('formidable'),
    fs = require('fs'),
    TITLE = 'formidable上传示例',
  AVATAR_UPLOAD_FOLDER = '/img/';

// var multiparty = require('multiparty');
//   var util = require('util');
//   var fs = require('fs');
var mid=require('../../middleware/index.js');

__dirname = process.cwd();
 
router.get('/profile', function(req, res, next) {
 res.render('profile');
});
 
router.post('/profile',function(req,res,next){
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';    //设置编辑
    form.uploadDir = __dirname+'/public/img/';  //设置上传目录
    // form.uploadDir = '/static/img/';
    form.keepExtensions = true;  //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function(err, fields, files) {

        if (err) {
          res.locals.error = err;
          res.render('index', { title: TITLE });
          return;   
        }  
        var extName = '';  //后缀名
        switch (files.my_file.type) {
          case 'image/pjpeg':
            extName = 'jpg';
            break;
          case 'image/jpeg':
            extName = 'jpg';
            break;     
          case 'image/png':
            extName = 'png';
            break;
          case 'image/x-png':
            extName = 'png';
            break;     
        }

        if(extName.length == 0){
            res.locals.error = '只支持png和jpg格式图片';
            res.render('index', { title: TITLE });
            return;          
        }

        var avatarName = Math.random() + '.' + extName;
        var newPath = form.uploadDir + avatarName;

        console.log(newPath);
        fs.renameSync(files.my_file.path, newPath); 

        var bookData={
          bookname: fields.bookname,
          bookimg: avatarName,
          bookdesc: fields.bookdesc
        }
        Book.create(bookData,function(error,book){
          if(error){
            return next(error)
          }else{
            // 这里如果res 会报错
            // return res.redirect('/');
          }
        })

    });
    res.locals.success = '上传成功';
    res.render('index', { title: TITLE }); 
    
});


router.get('/', function(req,res,next){
  
	User.findById(req.user?req.user._id:req.session.userId)
      .exec(function (error, user) {
        if (error) {
          return next(error);
        } else if(user){
          
          Book.find({})
                  .sort({createdAt:-1})
                  .exec(function (err,books) {
                    if(err) return next(err);
                    // res.json(books);
                    return res.render('index',{name: user.name, books:books});
                  });
          
        }else{
          
          Book.find({})
                  .sort({createdAt:-1})
                  .exec(function (err,books) {
                    if(err) return next(err);
                    // res.json(books);
                    return res.render('index',{books:books});
                  });
          
        }
      });

});
//书籍详细页
router.param('bid',function (req,res,next,id) {
  Book.findById(id,function (err,doc) {
    if(err) return next(err);
    if(!doc){
      err=new Error('内容不存在');
      err.status=404;
      return next(err);
    }
    req.book=doc;
    return next();
  })
})
router.get('/book/:bid',function (req,res,next) {
  // var id=req.params.id;
  // Book.findById(id,function (err,doc) {
  //   if(err) return next(err);
  //   if(!doc){
  //     err=new Error('内容不存在');
  //     err.status=404;
  //     return next(err);
  //   }
  //   req.book=doc;
  //   return res.render("book",{book:req.book})
    
  // })
  return res.render("book",{book:req.book});
  
})
router.get('/delete/:bid', mid.checkLogin, function (req,res,next) {
  req.book.remove(function(err){
    if(err){return next(err)}
    res.redirect('/');
  })
   
})
router.get('/edit/:bid', mid.checkLogin,function (req,res,next) {
  return res.render('edit',{book:req.book})
})
// router.post('/edit/:bid', mid.checkLogin,function (req,res,next) {

//   var form = new formidable.IncomingForm();   //创建上传表单
//     form.encoding = 'utf-8';    //设置编辑
//     form.uploadDir = __dirname+'/public/img/';  //设置上传目录
//     // form.uploadDir = '/static/img/';
//     form.keepExtensions = true;  //保留后缀
//     form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

//     form.parse(req, function(err, fields, files) {

//         if (err) {
//           res.locals.error = err;
//           res.render('index', { title: TITLE });
//           return;   
//         }  
//         var extName = '';  //后缀名
//         switch (files.my_file.type) {
//           case 'image/pjpeg':
//             extName = 'jpg';
//             break;
//           case 'image/jpeg':
//             extName = 'jpg';
//             break;     
//           case 'image/png':
//             extName = 'png';
//             break;
//           case 'image/x-png':
//             extName = 'png';
//             break;     
//         }

//         if(extName.length == 0){
//             res.locals.error = '只支持png和jpg格式图片';
//             res.render('index', { title: TITLE });
//             return;          
//         }

//         var avatarName = Math.random() + '.' + extName;
//         var newPath = form.uploadDir + avatarName;

//         console.log(newPath);
//         fs.renameSync(files.my_file.path, newPath); 

//         // var bookData={
//         //   bookname: fields.bookname,
//         //   bookimg: avatarName,
//         //   bookdesc: fields.bookdesc
//         // }
//         // req.book.update(bookData,function(error,book){
//         //   if(error){
//         //     return next(error)
//         //   }else{
//         //     // 这里如果res 会报错
//         //     // return res.redirect('/');
//         //   }
//         // })

//     });
//     res.locals.success = '更新成功';
    
//     // res.render('index', { title: TITLE }); 
// })
router.get('/register', function(req,res,next){
	res.render('register')
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
          req.flash('success', '注册成功');
          req.session.userId = user._id;
          return res.redirect('/');
        }
      });

    } else {
      var err = new Error('请填写所有表单项目');
      err.status = 400;
      return next(err);
    }
})
router.get('/login', function(req,res,next){
	res.render('login')
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
        // req.flash('success', '登录成功');
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
        return res.redirect('back');//返回之前的页面
      }
    });
  }
});

module.exports=router;


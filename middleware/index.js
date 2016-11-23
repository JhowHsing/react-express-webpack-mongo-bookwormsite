
module.exports = {
	// function logOut(req,res,next) {
	// 	if(req.session && req.session.userId){
	// 		return res.redirect('/');
	// 	}
	// 	return next();
	// },
	// function loginReq(req,res,next) {
	// 	if(req,session && req.session.userId){
	// 		return next();
	// 	}else{
	// 		var err=new Error('login required');
	// 		err.status=401;
	// 		return next(err);
	// 	}

	// },
	checkLogin: function checkLogin(req, res, next) {
	    if (!req.session.userId && !JSON.stringify(req.user)) {
	      req.flash('error', '未登录'); 
	      
	      return res.redirect('/');
	    }
	    next();
	  },

  	checkNotLogin: function checkNotLogin(req, res, next) {
	    if (req.session.user) {
	      req.flash('error', '已登录'); 
	      return res.redirect('back');//返回之前的页面
	    }
	    next();
	  }
};

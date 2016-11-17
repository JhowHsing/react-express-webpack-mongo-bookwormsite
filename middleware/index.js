function logOut(req,res,next) {
	if(req.session && req.session.userId){
		return res.redirect('/');
	}
	return next();
}
function loginReq(req,res,next) {
	if(req,session && req.session.userId){
		return next();
	}else{
		var err=new Error('login required');
		err.status=401;
		return next(err);
	}

}
module.exports.logOut = logOut;
module.exports.loginReq = loginReq;

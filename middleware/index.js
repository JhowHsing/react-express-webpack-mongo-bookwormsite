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
// function checklogin(req,res,next) {
// 	var name;
// 	User.findById(req.session.userId)
//       .exec(function (error, user) {
//         if (error) {
//           return next(error);
//         } else if(user){
        
// 			return name=user.name;
//         }        
    
// }
module.exports.logOut = logOut;
module.exports.loginReq = loginReq;
// module.exports.checklogin = checklogin;
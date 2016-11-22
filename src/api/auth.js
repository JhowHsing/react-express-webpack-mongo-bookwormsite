var express=require('express');
var router=express.Router();
var passport=require('passport');

router.get('/github',passport.authenticate('github',{ scope: [ 'user:email' ] }),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.

  });
router.get('/github/return',passport.authenticate('github',{failureRedirect: '/login'}),function (req,res) {
	res.redirect('/');
});
router.get('/logout',function (req,res) {
	res.logout();
	res.redirect('/');
});

module.exports=router;
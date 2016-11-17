import React, {Component} from "react";

class Login extends Component{
	render(){
		return (
			<div id="regi-div">
			<form className="form-horizontal" action='/login' method="POST">
			  <fieldset>
			    <div id="legend">
			      <legend className="">用户登录</legend>
			    </div>
			    <div className="form-group">
		        	<input type="email" id="email" name="email" placeholder="邮箱" className="form-control" />
		        </div>
		        <div className="form-group">

		        	<input type="password" id="password" name="password" placeholder="密码" className="form-control" />
		        </div>
			    <div className="control-group">		      
			      <div className="controls">
			        <button className="btn btn-primary" type="submit">登录</button>
			      </div>
			    </div>
			  </fieldset>
			</form>
			</div>
		)
	}
}
export default Login;
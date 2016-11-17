import React, {Component} from "react";

class Register extends Component{
	render(){
		return (
			<div id="regi-div">
			<form className="form-horizontal" action='/register' method="POST">
			  <fieldset>
			    <div id="legend">
			      <legend className="">用户注册</legend>
			    </div>
			    <div className="form-group">
			     
			      <label className="control-label col-sm-2"  htmlFor="username">用户名</label>
			      <div className="col-sm-10">
			        <input type="text" id="username" name="username" placeholder="" className="form-control" />
			        
			      </div>
			    </div>
			 
			    <div className="form-group">
			      
			      <label className="control-label col-sm-2" htmlFor="email">邮箱</label>
			      <div className="col-sm-10">
			        <input type="email" id="email" name="email" placeholder="" className="form-control" />
			        
			      </div>
			    </div>
			 
			    <div className="form-group">
			      
			      <label className="control-label col-sm-2" htmlFor="password">密码</label>
			      <div className="col-sm-10">
			        <input type="password" id="password" name="password" placeholder="" className="form-control" />
			        
			      </div>
			    </div>
			 
			    <div className="form-group">
			      
			      <label className="control-label col-sm-2" htmlFor="password_confirm">确认密码</label>
			      <div className="col-sm-10">
			        <input type="password" id="password_confirm" name="password_confirm" placeholder="" className="form-control" />
			        
			      </div>
			    </div>
			 
			    <div className="control-group">
			      
			      <div className="controls">
			        <button className="btn btn-primary" type="submit">注册</button>
			      </div>
			    </div>
			  </fieldset>
			</form>
			</div>
		)
	}
}
export default Register;
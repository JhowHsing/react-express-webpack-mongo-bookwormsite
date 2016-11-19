import React, { Component } from 'react';
// import NavLink from './NavLink';

class Profile extends Component {
  render() {
    return (
    	<div id="regi-div">
			<form className="form-horizontal" action='/profile' method="POST" encType="multipart/form-data">
			  <fieldset>
			    <div id="legend">
			      <legend className="">发布新书</legend>
			    </div>
			    <div className="form-group">
		        	<input type="text" id="bookname" name="bookname" placeholder="书名" className="form-control" />
		        </div>
		        <div className="form-group">
					<input type="file" name="my_file" id="my_file" className="form-control"></input>
		        	
		        </div>
		        <div className="form-group">
		        	<textarea id="bookdesc" name="bookdesc" placeholder="书籍描述" rows='5' className="form-control"></textarea>
		        </div>
			    <div className="control-group">		      
			      <div className="controls">
			        <button className="btn btn-primary" type="submit">提交</button>
			      </div>
			    </div>
			  </fieldset>
			</form>
		</div>
      
    );
  }
}

export default Profile;
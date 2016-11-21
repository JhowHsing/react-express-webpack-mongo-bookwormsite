import React, { Component } from 'react';
// import NavLink from './NavLink';

class Edit extends Component {
  render() {
    return (
    	<form className="form-horizontal" action='/edit/{{book._id.valueOf()}}' method="POST" encType="multipart/form-data">
		  <fieldset>
		    
		    <div className="form-group">
		    	<input type="text" id="bookname" name="bookname" placeholder="书名" className="form-control" value="{{book.bookname}}" />
		    </div>
		    <div className="form-group">
		    	
				<input type="file" name="my_file" id="my_file" className="form-control"></input>
		    	
		    </div>
		    <div className="form-group">
		    	<textarea id="bookdesc" name="bookdesc" placeholder="书籍描述" rows='5' className="form-control">{{book.bookdesc}}</textarea>
		    </div>
		    <div className="control-group">		      
		      <div className="controls">
		        <button className="btn btn-primary" type="submit">提交</button>
		      </div>
		    </div>
		  </fieldset>
		</form>  
    	)
	}
}
export default Edit;

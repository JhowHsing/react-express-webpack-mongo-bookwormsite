'use strict';
var mongoose=require('mongoose');
var BookSchema=new mongoose.Schema({
	bookname:{
		type: String,
		required: true,
		unique: true
	},
	bookimg: {
		type: String
		
	},
	bookdesc: {
		type: String
		// required: true
	}
})

var Book=mongoose.model('Book',BookSchema);
module.exports=Book;
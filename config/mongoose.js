var config = require('./config'),
mongoose = require('mongoose');

module.exports = function(){

	if (process.env.NODE_ENV==='production'){
		var uristring = process.env.db;
	}else{
		var uristring = config.db;
	}
	

	var db = mongoose.connect(uristring,function(err, res){
		
		if(err){
			console.log ('ERROR connecting to: ' + err);
		}else{
			console.log ('Data Base succeeded connected in env >> ', process.env.NODE_ENV);
		
		}	
	});

	// require('../app/models/article.server.model');
	require('../app/models/offer.server.model');
	require('../app/models/review.server.model');
	require('../app/models/product.server.model');

	return db;
};
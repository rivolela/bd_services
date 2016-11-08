var config = require('./config'),
mongoose = require('mongoose');

module.exports = function(){

	var uristring = config.db;

	var db = mongoose.connect(uristring,function(err, res){
		
		if(err){
			console.log ('ERROR connecting to: ' + err);
		}else{
			console.log ('Data Base succeeded connected in env >> ', process.env.NODE_ENV);
		
		}	
	});

	require('../app/models/user.server.model');
	require('../app/models/article.server.model');
	require('../app/models/offer.crawler.server.model');

	return db;
};
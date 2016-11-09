var mongoose = require('mongoose'),
 	config = require('../../config/config.js'),
 	requestsUtile = require('../utile/requests.server.utile.js');


var getErrorMessage = function(err){
	if(err.errors){
		for (var errName in err.errors){
			if(err.errors[errName].message){
				return err.errors[errName].message;
			}
		}
	}else{
		return 'Unknown server error';
	}
};


var setUrlOffers = function(query,page,items,next){

	try{
		var host = 'api.zanox.com/json/2011-03-01/';
		var uri = 'products';
		var connectid = 'connectid=' + config.connectid;
		var programs = 'programs=' + config.programs;
		var query = 'q=' + query;
		//var category = '';
		var items = 'items=' + items;
		var page = 'page=' + page;
		var url = 'https://' + host + uri + '?' + connectid + '&' + programs + '&' + query + '&' + items + '&' + page;

		return next(url);
		
	}catch(error){
		console.log('An error has occurred >> zanox.server.job >> setUrlOffers : ' +  error.message);
    	throw error ;
	}
};


exports.list = function(req,res){

	var call = new requestsUtile();
	var query = req.params.query || '';
	var page = req.params.page || 0;
	var items = req.params.items || 0;

	try{
		setUrlOffers(query,page,items,function(url){
			console.log(url);
			call.getJson(url,function(data,response,error){
				res.json(data);
			});
		});

	}catch(error){
		console.log(error);
		return res.status(400).send({
				message: getErrorMessage(error)
		});
	}
};






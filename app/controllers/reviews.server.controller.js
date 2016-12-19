var mongoose = require('mongoose'),
	Review = mongoose.model('Review');


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


exports.list = function(req,res){

	var ean = Number(req.params.ean || 0);
	var page = Number(req.params.page || 0);
    var limit = Number(req.params.limit || 10);

    var query = {ean:ean};

    console.log(req.params);

	var options = {
	  //select: 'advertiser date',
	  // sort: { 
	  // 	date: 'asc'
	  // },
	  //lean: true,
	  //offset: 10, 
	  page: page,
	  limit: limit
	};


	Review.paginate(query,options,function(err, result) {
		if(err){
			console.log(err);
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			console.log(result);
			res.json(result);
		}
	});
};


exports.listByCategory = function(req,res){

	var category = String(req.params.category);
	var page = Number(req.params.page || 0);
    var limit = Number(req.params.limit || 10);

    var query = {categoryBD:category};

	var options = {
	  //select: 'advertiser date',
	  // sort: { 
	  // 	date: 'asc'
	  // },
	  //lean: true,
	  //offset: 10, 
	  page: page,
	  limit: limit
	};


	Review.paginate(query,options,function(err, result) {
		if(err){
			console.log(err);
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(result);
		}
	});
};




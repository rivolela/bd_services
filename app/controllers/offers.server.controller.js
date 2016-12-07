var mongoose = require('mongoose'),
	Offer = mongoose.model('Offer');


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


exports.saveOffersPickoout = function(currentItem,productsArray,next){

	if(currentItem < productsArray.length){
		saveOfferBD(productsArray[currentItem],function(){
			saveOffersPickoout(currentItem+1,productsArray,next);
		});
	}else{
		return next(productsArray);
	}
};


exports.saveOfferBD = function(data,next){

	try{
		var offer = new Offer(data);
  	
	  	offer.save(function(err){
			if(err){
				console.log(err);
				return next(err);
			}else{
				console.log("offer saved:",offer);
				return next();
			}
		});

	}catch(e){
		console.log('An error has occurred: '+ e.message);
	}
};


exports.deleteOfferBD = function(data,next){

	offer = new Offer(data);

  	Offer.remove({ean:offer.ean},function(err){
		if(err){
			console.log(err);
			return next(err);
		}else{
			console.log("offer removed:",offer);
			return next();
		}
	});
};


exports.deleteCollectionOffersBD = function(next){

  	Offer.remove({},function(err){
		if(err){
			console.log(err);
			return next(err);
		}else{
			console.log("all offers were removed:");
			return next();
		}
	});
};


exports.getOffersBD = function(query,next){
	console.log(query);
	Offer.find(query,function(err,offers){
		if(err){
			console.log(err);
			return next(err);
		}else{
			console.log(offers);
			return next(offers);
		}
	});
};


exports.search = function(req,res){

	var page = Number(req.params.page || 0);
    var limit = Number(req.params.limit || 10);
    var query = String(req.params.query);

    console.log("query >>" , query);

	var options = {
	  select: {
	  	 score: { $meta: "textScore" }
	  },
	  sort: { 
	  	score: { $meta: "textScore" }
	  },
	  //lean: true,
	  //offset: 10, 
	  page: page,
	  limit: limit
	};

	Offer.paginate({$text:{$search:query},totalReviews:{$gt:0}},options,function(err, result) {
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


exports.list = function(req,res){

	var page = Number(req.params.page || 0);
    var limit = Number(req.params.limit || 10);
    var query = {};

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


	Offer.paginate(query,options,function(err, result) {
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



exports.listByEan = function(req,res){

	var page = Number(req.params.page || 0);
    var limit = Number(req.params.limit || 10);
    var ean = String(req.params.ean);
    var query;

    //if ean is null or empty, set url default
	if(ean == 0){
		query = {};
	}else{
		query = {ean:ean};
	}
    

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


	Offer.paginate(query,options,function(err, result) {
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


exports.listByCategory = function(req,res){

	var page = Number(req.params.page || 0);
    var limit = Number(req.params.limit || 10);
    var category = String(req.params.category);
    var query;

    //if ean is null or empty, set url default
	if(category == 0){
		query = {};
	}else{
		query = {categoryBD:category};
	}
    

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


	Offer.paginate(query,options,function(err, result) {
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




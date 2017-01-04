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

/**	[saveOffersPickoout ]
 * @param  {[currentItem]}
 * @param  {[productsArray]} @desc
 * @param  {next}
 * @return {[type]}
 */
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

	var aggregate = Offer.aggregate();

	aggregate
	.match({
		$text:{$search:query}
	})
	.group({ 
		_id: '$ean'	,
		offer_id: { $first: "$_id" },
		merchantProductId: { $first: "$merchantProductId" },
		name: { $first: "$name" },
		ean: { $first: "$ean" },
		advertiser: { $first: "$advertiser" },
		image_large: { $first: "$image_large" },
		image_medium: { $first: "$image_medium" },
		countSad: { $first: "$countSad" },
		countHappy: { $first: "$countHappy" },
		totalReviews: { $first: "$totalReviews" },
		score: { $first: {$meta: "textScore" }},
		price: { $first: "$price" },
		price_display: { $first: "$price_display" }		
	})
	.project ({
        _id :0,
        _id:"$offer_id",
        merchantProductId:1,
		name: 1,
		ean: 1,
		advertiser: 1,
		image_large: 1,
		image_medium: 1,
		countSad: 1,
		countHappy: 1,
		totalReviews: 1,
		score: 1,
		price: 1,
		price_display: 1
    })
	.sort({
		score: -1
	});

	var options = {
	  page: page,
	  limit: limit
	};

	Offer.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
  		if(err) {
  			return res.status(400).send({
				message: getErrorMessage(err)
			});
  		}else{
  			res.json({docs:results,total:count,limit:limit,page:page,pages:pageCount});
  		}
	});
};


exports.list = function(req,res){

	var page = Number(req.params.page || 0);
    var limit = Number(req.params.limit || 10);
    var query = {};

	var options = {
	  //select: 'advertiser date',
	  sort: { 
	  	totalReviews: 'desc'
	  },
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


/**
 * @description get list of offer by ean ( ordered by price )
 * @param  {req}
 * @param  {res}
 * @return {json{docs,total,limit,page,pages}}
 */
exports.listByEan = function(req,res){

	var page = Number(req.params.page || 0);
    var limit = Number(req.params.limit || 10);
    var ean = Number(req.params.ean);
    var query;

    //if ean is null or empty, set url default
	if(ean == 0){
		query = {};
	}else{
		query = {ean:ean};
	}
    

    // find users above 18 by city 
	var aggregate = Offer.aggregate();

	aggregate.match({
		ean:ean,
	})	
	.group({ 
		_id: '$merchantProductId',
		offer_id: { $first: "$_id" },
		merchantProductId: { $first: "$merchantProductId" },
		name: { $first: "$name" },
		ean: { $first: "$ean" },
		advertiser: { $first: "$advertiser" },
		image_large: { $first: "$image_large" },
		image_medium: { $first: "$image_medium" },
		countSad: { $first: "$countSad" },
		countHappy: { $first: "$countHappy" },
		totalReviews: { $first: "$totalReviews" },
		price: { $first: "$price" },
		price_display: { $first: "$price_display" },
		url: { $first: "$url" },
	})
	.project ({
        _id :0,
        _id:"$offer_id",
		name: 1,
		ean: 1,
		advertiser: 1,
		image_large: 1,
		image_medium: 1,
		countSad: 1,
		countHappy: 1,
		totalReviews: 1,
		score: 1,
		price_display: 1,
		url: 1
    })
    .sort({
		price: 1
	});

	var options = {
	  //select: 'advertiser date',
	  // sort: { 
	  // 	price: 'asc'
	  // },
	  //lean: true,
	  //offset: 10, 
	  page: page,
	  limit: limit,
	};

	Offer.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
  		if(err) {
  			return res.status(400).send({
				message: getErrorMessage(err)
			});
  		}else{
  			var docs = results;
  			var total = count;
  			var pages = pageCount;
  			res.json({docs,total,limit,page,pages});
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




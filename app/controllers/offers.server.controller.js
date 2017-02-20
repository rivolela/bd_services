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


// exports.validatePage = function(req,res,next,page){
// 	console.log("validatePage >>",page);
// 	// Article.findById(id).populate('creator','firstName lastName fullName').exec(function(err,article){
// 	// 	if(err){
// 	// 		return next(err);
// 	// 	}
// 	// 	if(!article){
// 	// 		return next(new Error('Failed to load article' + id));			
// 	// 	}
// 	// 	req.article = article;
// 	// 	next();
// 	// });
// 	next();
// };
var filter_offers = function(filter,next){

	var resp;

    switch(filter) {
	// filter by higher score
    case 0:
        resp = {
			score: { 
				$meta: "textScore" 
			},
			score: -1
		};
		break;
	// filter by total of reviews and after higher score
    case 1:
        resp = {
        	score: { 
				$meta: "textScore" 
			},
			score: -1,
			totalReviews: -1
    	};
        break;
    // filter by total of countHappy and after higher score
    case 2:
        resp = {
        	score: { 
				$meta: "textScore" 
			},
        	score: -1,
        	countHappy: -1
		};
        break;
    // filter by total of countSad and after higher score
    case 3:
        resp = {
        	score: { 
				$meta: "textScore" 
			},
			score:-1,
			countSad: -1
		};
        break;
    
	};

	console.log("resp",resp);
	return next(resp);
}


exports.search = function(req,res){

	var page = Number(req.params.page || 0);
    var limit = Number(req.params.limit || 10);
    var query = String(req.params.query);
    var filter = Number(req.params.filter || 0);
    var aggregate = Offer.aggregate();
    var setFilter;
    
    console.log("filter",filter);
    console.log("query >>" , query);

    filter_offers(filter,function(respFilter){
    	setFilter = respFilter;
    });

	aggregate
	.match({
		$text:{
			$search:query
			// $language:'pt'
		}
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
		score: { $max: {$meta: "textScore" }},
		price: { $min: "$price" },
		price_display: { $min: "$price_display" },
		category: { $first: "$category" },		
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
		price_display: 1,
		category:1
    }).sort(
    	setFilter
  	);
	

	var options = {
	  page: page,
	  limit: limit,
	  // sortBy:{
	  // 	// score: -1,
	  // 	// countSad: -1
	  // }
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
		price_display: 1
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
  			resp = {docs:results,
  					total:count,
  					limit:limit,
  					page:page,
  					pages:pageCount};

  			res.json(resp);
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




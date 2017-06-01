var mongoose = require('mongoose'),
 	StringUtile = require('../utile/string.server.utile.js');
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
        	totalReviews: -1,
        	score: { 
				$meta: "textScore" 
			},
			score: -1
		};
        break;
    // filter by total of countHappy and after higher score
    case 2:
        resp = {
        	countHappy: -1,
        	score: { 
				$meta: "textScore" 
			},
        	score: -1,
  		};
        break;
    // filter by total of countSad and after higher score
    case 3:
        resp = {
        	countSad: -1,
        	score: { 
				$meta: "textScore" 
			},
			score:-1
		};
        break;    
	// filter by minor price_display
    case 4:
        resp = {
        	price: 1,
        	score: { 
				$meta: "textScore" 
			},
			score:-1
		};
        break;
	};

	console.log("resp",resp);
	return next(resp);
}


var orderBy = function(order,next){

	var resp;

    switch(order) {
	// order by higher score
    case 0:
        resp = {
			score: { 
				$meta: "textScore" 
			},
			score: -1
		};
		break;
	// order by total of reviews and after higher score
    case 1:
        resp = {
        	totalReviews: -1,
        	score: { 
				$meta: "textScore" 
			},
			score: -1
		};
        break;
    // order by total of countHappy and after higher score
    case 2:
        resp = {
        	countHappy: -1,
        	score: { 
				$meta: "textScore" 
			},
        	score: -1,
  		};
        break;
    // order by total of countSad and after higher score
    case 3:
        resp = {
        	countSad: -1,
        	score: { 
				$meta: "textScore" 
			},
			score:-1
		};
        break;    
	// filter by minor price_display
    case 4:
        resp = {
        	price: 1,
        	score: { 
				$meta: "textScore" 
			},
			score:-1
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
    var order = Number(req.params.order || 0);
    var aggregate = Offer.aggregate();
    var setFilter;
    
    console.log("filter",filter);
    console.log("query >>" , query);

    // filter_offers(filter,function(respFilter){
    // 	setFilter = respFilter;
    // });
    orderBy(order,function(respFilter){
    	setFilter = respFilter;
    });

	aggregate
	.match({
		$and:[{
			$text:{$search:"\"" + query + "\""},
			product:{$ne:null}
		}]
	})
	.group({ 
		_id: {merchantProductId:'$merchantProductId',advertiser:"$advertiser"},
		 // { day: { $dayOfYear: "$date"}, year: { $year: "$date" } },
		offer_id: { $first: "$_id" },
		name: { $first: "$name" },
		ean: { $first: "$ean" },
		advertiser: { $first: "$advertiser" },
		image_large: { $first: "$image_large" },
		image_medium: { $first: "$image_medium" },
		countSad: { $first: "$countSad" },
		countHappy: { $first: "$countHappy" },
		totalReviews: { $first: "$totalReviews" },
		score: { $max: {$meta: "textScore" }},
		price: { $first: "$price" },
		price_display: { $min: "$price_display" },
		category: { $first: "$category" },
		categoryBD: { $first: "$categoryBD" },
		departamentBD: { $first: "$departamentBD" },
		minorPriceEAN: { $first: "$minorPriceEAN" },
		url: { $first: "$url" },
		product: { $first: "$product" },				
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
		price: 1,
		price_display: 1,
		category:1,
		categoryBD:1,
		url: 1,
		departamentBD:1,
		minorPriceEAN:1,
		product:1
    })
    .sort(
    	setFilter
  	);

	var options = {
	  page: page,
	  limit: limit,
	  populate:"product"
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

  			Offer.populate(results, { "path": "product",
  				"select":"name ean image manufacturer countSad countHappy totalReviews departamentBD nameURL"}, 
  				function(err,results_2) {
			    	if (err) {
			        	console.log("err >>",err);
			        	throw err;
			        }else{
			        	console.log( JSON.stringify( results_2, undefined, 4 ) );
			       		res.json({docs:results,total:count,limit:limit,page:page,pages:pageCount});
			        }
		    });
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

	aggregate
	.match({
		ean:ean,
	})
	.group({ 
		_id: {merchantProductId:'$merchantProductId',advertiser:"$advertiser"},
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
	}).sort({
    	price: 1
	});
	
	// .project ({
 //        _id :0,
 //        _id:"$offer_id",
	// 	name: 1,
	// 	ean: 1,
	// 	advertiser: 1,
	// 	image_large: 1,
	// 	image_medium: 1,
	// 	countSad: 1,
	// 	countHappy: 1,
	// 	totalReviews: 1,
	// 	score: 1,
	// 	price:1,
	// 	price_display: 1,
	// 	url: 1
 //    });
  
	var options = {
	  //select: 'advertiser date',
	  // sortBy: { 
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
    var paramCategory =  String(req.params.category);
    var category = paramCategory.replace(/\s/g,"_");
    var filter = Number(req.params.filter || 0);
    var order = Number(req.params.order || 0);
    var aggregate = Offer.aggregate();
    var setFilter;
    
    console.log("filter",filter);
    console.log("order",order);
    console.log("category >>" , category);

    // filter_offers(filter,function(respFilter){
    // 	setFilter = respFilter;
    // });

    orderBy(order,function(respFilter){
    	setFilter = respFilter;
    });

	aggregate
	.match({
		$and:[{categoryBD:category,product:{$ne:null}}],
	})
	.group({ 
		_id: {merchantProductId:'$merchantProductId',advertiser:"$advertiser"},
		offer_id: { $first: "$_id" },
		name: { $first: "$name" },
		ean: { $first: "$ean" },
		advertiser: { $first: "$advertiser" },
		image_large: { $first: "$image_large" },
		image_medium: { $first: "$image_medium" },
		countSad: { $first: "$countSad" },
		countHappy: { $first: "$countHappy" },
		totalReviews: { $first: "$totalReviews" },
		score: { $max: {$meta: "textScore" }},
		price: { $first: "$price" },
		price_display: { $min: "$price_display" },
		category: { $first: "$category" },
		categoryBD: { $first: "$categoryBD" },
		departamentBD: { $first: "$departamentBD" },
		minorPriceEAN: { $first: "$minorPriceEAN" },
		url: { $first: "$url" },
		product: { $first: "$product" },				
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
		price: 1,
		price_display: 1,
		category:1,
		categoryBD:1,
		departamentBD:1,
		minorPriceEAN:1,
		url: 1,
		product:1
    })
    .sort(
    	setFilter
  	);

	var options = {
	  page: page,
	  limit: limit,
	  populate:"product"
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

  			Offer.populate(results, { "path": "product",
  				"select":"name ean image manufacturer countSad countHappy totalReviews departamentBD nameURL"}, 
  				function(err,results_2) {
			    	if (err) {
			        	console.log("err >>",err);
			        	throw err;
			        }else{
			        	console.log( JSON.stringify( results_2, undefined, 4 ) );
			       		res.json({docs:results,total:count,limit:limit,page:page,pages:pageCount});
			        }
		    });
  		}
	});
};


exports.listByDepartament = function(req,res){

	var page = Number(req.params.page || 0);
    var limit = Number(req.params.limit || 10);
    var departament = String(req.params.departament);
    var filter = Number(req.params.filter || 0);
    var order = Number(req.params.order || 0);
    var aggregate = Offer.aggregate();
    var setFilter;
    
    console.log("filter",filter);
    console.log("departament >>" , departament);

    // filter_offers(filter,function(respFilter){
    // 	setFilter = respFilter;
    // });
    orderBy(order,function(respFilter){
    	setFilter = respFilter;
    });

	aggregate
	.match({
		$and:[{departamentBD:departament,product:{$ne:null}}],
	})
	.group({ 
		_id: {merchantProductId:'$merchantProductId',advertiser:"$advertiser"},
		offer_id: { $first: "$_id" },
		name: { $first: "$name" },
		ean: { $first: "$ean" },
		advertiser: { $first: "$advertiser" },
		image_large: { $first: "$image_large" },
		image_medium: { $first: "$image_medium" },
		countSad: { $first: "$countSad" },
		countHappy: { $first: "$countHappy" },
		totalReviews: { $first: "$totalReviews" },
		score: { $max: {$meta: "textScore" }},
		price: { $first: "$price" },
		price_display: { $min: "$price_display" },
		category: { $first: "$category" },
		categoryBD: { $first: "$categoryBD" },
		departamentBD: { $first: "$departamentBD" },
		minorPriceEAN: { $first: "$minorPriceEAN" },
		url: { $first: "$url" },
		product: { $first: "$product" },				
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
		price: 1,
		price_display: 1,
		category:1,
		categoryBD:1,
		departamentBD:1,
		minorPriceEAN:1,
		url: 1,
		product:1
    })
    .sort(
    	setFilter
  	);

	var options = {
	  page: page,
	  limit: limit,
	  populate:"product"
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

  			Offer.populate(results, { "path": "product",
  				"select":"name ean image manufacturer countSad countHappy totalReviews departamentBD nameURL"}, 
  				function(err,results_2) {
			    	if (err) {
			        	console.log("err >>",err);
			        	throw err;
			        }else{
			        	console.log( JSON.stringify( results_2, undefined, 4 ) );
			       		res.json({docs:results,total:count,limit:limit,page:page,pages:pageCount});
			        }
		    });
  		}
	});
};


exports.listByBrand = function(req,res){

	var page = Number(req.params.page || 0);
    var limit = Number(req.params.limit || 10);
    var brand = String(req.params.brand);
    var filter = Number(req.params.filter || 0);
    var order = Number(req.params.order || 0);
    var aggregate = Offer.aggregate();
    var setFilter;
    
    console.log("filter",filter);
    console.log("brand >>" , brand);

    // filter_offers(filter,function(respFilter){
    // 	setFilter = respFilter;
    // });
    orderBy(order,function(respFilter){
    	setFilter = respFilter;
    });

	aggregate
	.match({
		$and:[{manufacturer: { $regex : new RegExp(brand, "i") } ,product:{$ne:null}}],
	})
	.group({ 
		_id: {ean:'$ean',advertiser:"$advertiser",minorPriceEAN:"$minorPriceEAN"},
		offer_id: { $first: "$_id" },
		name: { $first: "$name" },
		ean: { $first: "$ean" },
		advertiser: { $first: "$advertiser" },
		image_large: { $first: "$image_large" },
		image_medium: { $first: "$image_medium" },
		countSad: { $first: "$countSad" },
		countHappy: { $first: "$countHappy" },
		totalReviews: { $first: "$totalReviews" },
		score: { $max: {$meta: "textScore" }},
		price: { $first: "$price" },
		price_display: { $min: "$price_display" },
		category: { $first: "$category" },
		categoryBD: { $first: "$categoryBD" },
		departamentBD: { $first: "$departamentBD" },
		minorPriceEAN: { $first: "$minorPriceEAN" },
		url: { $first: "$url" },
		manufacturer:{ $first: "$manufacturer" },
		product: { $first: "$product" },				
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
		price: 1,
		price_display: 1,
		category:1,
		categoryBD:1,
		departamentBD:1,
		manufacturer:1,
		minorPriceEAN:1,
		url: 1,
		product:1
    })
    .sort(
    	setFilter
  	);

	var options = {
	  page: page,
	  limit: limit,
	  populate:"product"
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

  			Offer.populate(results, { "path": "product",
  				"select":"name ean image manufacturer countSad countHappy totalReviews departamentBD nameURL"}, 
  				function(err,results_2) {
			    	if (err) {
			        	console.log("err >>",err);
			        	throw err;
			        }else{
			        	console.log( JSON.stringify( results_2, undefined, 4 ) );
			       		res.json({docs:results,total:count,limit:limit,page:page,pages:pageCount});
			        }
		    });
  		}
	});
};


exports.listByNameURL = function(req,res){

  var paramNameUrl = String(req.params.nameurl || 0);
  var page = Number(req.params.page || 0);
  var query;
  
  query = {nameURL:paramNameUrl};

  var options = {
    //select: 'advertiser date',
    // sort: { 
    //  date: 'asc'
    // },
    //lean: true,
    //offset: 10, 
    page: 1,
    limit: 20
  };


  Offer.paginate(query,options,function(err, result) {
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



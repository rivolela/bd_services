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


var filter_query = function(ean,filter,next){
    
	switch(filter) {
	// filter == 0 (all reviews)
    case 0:
        query = {$and: [
          {ean: ean},
          {rating:{ $gte: 0 }}
      	]};
      	break;
	// bd_boy_happy (rating>=4)	
    case 1:
        query = {$and: [
          {ean: ean},
          {rating:{ $gte: 4 }}
      	]};
        break;
    // bd_boy_happy (rating<=3)	
    case 2:
        query = {$and: [
          {ean: ean},
          {rating:{ $lte: 3 }}
      	]};
        break;
	};

	return next(query);
}


exports.list = function(req,res){

	var ean = Number(req.params.ean || 0);
	var page = Number(req.params.page || 0);
    var limit = Number(req.params.limit || 10);
    var filter = Number(req.params.filter || 0);
    var query;

	filter_query(ean,filter,function(respFilter){
    	query = respFilter;
    });


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


exports.getReviewsSummaryByEan = function(req,res){

	var ean = req.params.ean;
	console.log(ean);

  	    // find users above 18 by city 
	var aggregate = Review.aggregate();

	aggregate
	.match({
		ean:ean,
	})
    .group({ 
		_id: '$ean',
		ean: { $first: "$ean" },	
		countSad:{$sum:{$cond: [ { $lt: ["$rating", 4 ] }, 1, 0]}},
	    countHappy:{$sum:{$cond: [ { $gt: [ "$rating", 3 ] }, 1, 0]}},
	    totalReviews:{$sum:1},
	})
	.project ({
		_id :0,
        ean: 1,
        totalReviews:1,
        countSad:1,
        countHappy:1
    });
  
	var options = {
	  //select: 'advertiser date',
	  // sortBy: { 
	  // 	price: 'asc'
	  // },
	  //lean: true,
	  //offset: 10, 
	  // page: 1,
	  limit: 1,
	};

	Review.aggregatePaginate(aggregate, options, function(err, results, pageCount, count) {
  		if(err) {
  			return res.status(400).send({
				message: getErrorMessage(err)
			});
  		}else{
  			resp = {docs:results,
  					total:count,
  					// limit:limit,
  					// page:page,
  					pages:pageCount};

  			res.json(resp);
  		}
	});    	
};





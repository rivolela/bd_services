var mongoose = require('mongoose'),
    Product = mongoose.model('Product');


/**
 * [getByEAN get product by EAN]
 * @param  {response} req 
 * @param  {request}  res
 * @return {list} list of products
 */
exports.getByEAN = function(req,res){

  var ean = Number(req.params.ean || 0);
  var filter = Number(req.params.filter || 0);
  var query;
  
  query = {ean:ean};

  var options = {
    //select: 'advertiser date',
    // sort: { 
    //  date: 'asc'
    // },
    //lean: true,
    //offset: 10, 
    page: 1,
    limit: 1
  };


  Product.paginate(query,options,function(err, result) {
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


exports.getByNameURL = function(req,res){

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
    limit: 1
  };


  Product.paginate(query,options,function(err, result) {
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
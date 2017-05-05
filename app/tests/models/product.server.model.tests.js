var app = require('../../../server.js'),
	should = require('should'),
	mongoose = require('mongoose'),
	Product = mongoose.model('Product');


describe('Product Model Unit Tests:',function(){

	it('Should not be able to get the product list == 2871 products ',function(done){
		this.timeout(4000);
		Product.find({},function(err,products){
			products.length.should.be.equal(2871);
			done();
		});
	});
});

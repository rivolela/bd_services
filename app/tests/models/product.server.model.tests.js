var app = require('../../../server.js'),
	should = require('should'),
	mongoose = require('mongoose'),
	Product = mongoose.model('Product');


describe('Product Model Unit Tests:',function(){

	it('Should not be able to get the product list == 1527 offers ',function(done){
		this.timeout(4000);
		Product.find({},function(err,products){
			products.length.should.be.equal(1527);
			done();
		});
	});
});

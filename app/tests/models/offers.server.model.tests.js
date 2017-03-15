var app = require('../../../server.js'),
	should = require('should'),
	mongoose = require('mongoose'),
	Offer = mongoose.model('Offer');


describe('Offer Model Unit Tests:',function(){

	it('Should not be able to get the offer list == 7049 offers ',function(done){
		this.timeout(40000);
		Offer.find({},function(err,offers){
			offers.length.should.be.equal(7049);
			done();
		});
	});
});

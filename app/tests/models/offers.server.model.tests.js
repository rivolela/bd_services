var app = require('../../../server.js'),
	should = require('should'),
	mongoose = require('mongoose'),
	Offer = mongoose.model('Offer');


describe('Offer Model Unit Tests:',function(){

	it('Should not be able to get the offer list == 12115 offers ',function(done){
		this.timeout(40000);
		Offer.find({},function(err,offers){
			offers.length.should.be.equal(12115);
			done();
		});
	});
});

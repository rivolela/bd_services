var app = require('../../../server.js'),
	should = require('should'),
	mongoose = require('mongoose'),
	Offer = mongoose.model('Offer');

var offer_crawler;

describe('Offer Crawler Model Unit Tests:',function(){

	it('Should not be able to get the offer list == 969 offers ',function(done){
		this.timeout(20000);
		Offer.find({},function(err,offers){
			offers.length.should.be.equal(9362);
			done();
		});
	});
});

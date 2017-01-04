var app = require('../../../server.js'),
	should = require('should'),
	mongoose = require('mongoose'),
	Offer = mongoose.model('Offer');

var offer_crawler;

describe('Offer Crawler Model Unit Tests:',function(){

	it('Should not be able to get the offer list == 293 offers ',function(done){
		this.timeout(4000);
		Offer.find({},function(err,offers){
			offers.length.should.be.equal(293);
			done();
		});
	});
});

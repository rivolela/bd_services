var app = require('../../../server.js'),
	should = require('should'),
	mongoose = require('mongoose'),
	Offer = mongoose.model('Offer');

var offer_crawler;

describe('Offer Crawler Model Unit Tests:',function(done){

	// before(function(){

	// 	offer_crawler = new Offer({
	// 		urlOffer: '489238/sk',
	// 		name: 'Fogão Chef Gourmet Disney Princesa - Xalingo',
	// 		merchantProductId: '489238',
	// 		ean: '7895500723961',
	// 		url: 'http://ad.zanox.com/ppc/?25371034C45550273&ULP=[[489238/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[43EEF0445509C7205827]]',
	// 		advertiser: 'Walmart BR',
	// 		manufacturer: 'Safanelli'
	// 	});
	// });


	// describe('Testing the save method',function(){

	// 	it('Should be able to save without problems',function(){
	// 		offer_crawler.save(function(err){
	// 			should.not.exist(err);
	// 		});
	// 	});
	// })


	// describe('Testing the list method',function(){

	// 	it('Should not be able to get the offer pre-saved',function(){
	// 		Offer.find({},function(err,offers){
	// 			offers.length.should.be.equal(1);
	// 		});
	// 	});
	// });


	// after(function(done){
	// 	Offer.remove(function(){
	// 		done();
	// 	});
	// });
});
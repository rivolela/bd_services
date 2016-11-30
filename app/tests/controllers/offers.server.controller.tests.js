var app = require('../../../server.js'),
	request = require('supertest'),
	should = require('should'),
	mongoose = require('mongoose'),
	Offer = mongoose.model('Offer');

var offer_crawler;

describe('Offers BD Controller Unit Tests:',function(){


	before(function(done){
		offer_crawler = new Offer({
			urlOffer: '489238/sk',
			name: 'Fogão Chef Gourmet Disney Princesa - Xalingo',
			merchantProductId: '489238',
			ean: '7895500723961',
			url: 'http://ad.zanox.com/ppc/?25371034C45550273&ULP=[[489238/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[43EEF0445509C7205827]]',
			advertiser: 'Walmart BR',
			manufacturer: 'Safanelli'
		});

		offer_crawler.save(function(err){
			console.log(err);
			done();
		});
	});


	describe('Testing the get methods',function(){

		it('Should be able to get the list of offers ',function(done){
			request(app).get('/api/offers/bd/page/1/limit/10')
				.set('Accept','application/json')
				.expect('Content-Type',/json/)
					.expect(200)
				.end(function(err,res){
					res.body.total.should.be.equal(1);
					res.body.docs[0].should.have.property('merchantProductId',offer_crawler.merchantProductId);
					//res.body[0].should.have.property('content',article.content);
					done();
			});
		});


		it('Should be able to get the list of offers by ean=7895500723961',function(done){
			request(app).get('/api/offers/bd/ean/7895500723961/page/1/limit/10/')
				.set('Accept','application/json')
				.expect('Content-Type',/json/)
					.expect(200)
				.end(function(err,res){
					res.body.total.should.be.equal(1);
					res.body.docs[0].should.have.property('merchantProductId',offer_crawler.merchantProductId);
					//res.body[0].should.have.property('content',article.content);
					done();
			});
		});


		it('Should be able to find the product by query = Fogão Chef',function(done){
			request(app).get('/api/offers/bd/query/Fogão Chef/page/1/limit/10/')
				.set('Accept','application/json')
				.expect('Content-Type',/json/)
					.expect(200)
				.end(function(err,res){
					res.body.total.should.be.equal(1);
					res.body.docs[0].should.have.property('merchantProductId',offer_crawler.merchantProductId);
					//res.body[0].should.have.property('content',article.content);
					done();
			});
		});

	});


	after(function(done){
		Offer.remove(function(){
			done();
		});
	});
	
});




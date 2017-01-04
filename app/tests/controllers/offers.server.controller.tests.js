var app = require('../../../server.js'),
	request = require('supertest'),
	should = require('should'),
	mongoose = require('mongoose'),
	Offer = mongoose.model('Offer');

var offer_crawler;

describe('Offers Server Controller Unit Tests:',function(){

	it('Should be able to get the list of offers >>',function(done){
		this.timeout(4000);
		request(app).get('/api/offers/bd/page/1/limit/10')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(293);
				// res.body.docs[0].should.have.property('merchantProductId',9600910;
				// res.body.docs[0].should.have.property('price_br',"R$ 1499,00");
				done();
		});
	});


	it('Should be able to get the list of offers by ean=7896584042719',function(done){
		this.timeout(4000);
		request(app).get('/api/offers/bd/ean/7896584042719/page/1/limit/10/')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(2);
				res.body.docs[0].should.have.property('merchantProductId',148218);
				res.body.docs[0].should.have.property('price',"3449");
				res.body.docs[0].should.have.property('price_display',"R$ 3.449,00");
				//res.body[0].should.have.property('content',article.content);
				done();
		});
	});


	it('Should be able to find the product by query = Refrigerador Geladeira Electrolux Infinity Frost Free',function(done){
		this.timeout(4000);
		request(app).get('/api/offers/bd/query/Refrigerador Geladeira Electrolux Infinity Frost Free/page/1/limit/10/')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(140);
				res.body.docs[0].should.have.property('merchantProductId',148218);
				//res.body[0].should.have.property('content',article.content);
				done();
		});
	});

});






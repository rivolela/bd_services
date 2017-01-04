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
				res.body.docs[0].should.have.property('price_display',"R$ 3.449,00");
				res.body.docs[0].should.have.property('url',"http://ad.zanox.com/ppc/?31856659C46689111&ULP=[[/produto/Eletrodomesticos/Refrigerador-Geladeira-Electrolux-Frost-Free-2-Portas-553-Litros-Infinity-DF80?utm_campaign=xml_produtos&portal=4256CC361F2545F3488AFD861B38B9B6&utm_source=zanox&utm_medium=Afiliados]]&zpar9=[[43EEF0445509C7205827]]");
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






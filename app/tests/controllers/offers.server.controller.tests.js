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
				res.body.docs[0].should.have.property('_id',"586b0e7748d4552810204a50");
				res.body.docs[0].should.have.property('name',"Geladeira/Refrigerador Electrolux Infinity DF80 553L 2 portas Frost Free Branco");
				res.body.docs[0].should.have.property('ean',7896584042719);
				res.body.docs[0].should.have.property('advertiser',"Walmart BR");
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium',"https://static.wmobjects.com.br/imgres/arquivos/ids/2498101-250-250");
				res.body.docs[0].should.have.property('countSad',0);
				res.body.docs[0].should.have.property('countHappy',6);
				res.body.docs[0].should.have.property('totalReviews',6);
				res.body.docs[0].should.have.property('price_display',"R$ 2.899,90");
				res.body.docs[0].should.have.property('url',"http://ad.zanox.com/ppc/?25371034C45550273&ULP=[[33598/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[43EEF0445509C7205827]]");
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






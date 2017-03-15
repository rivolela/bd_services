var app = require('../../../server.js'),
	request = require('supertest'),
	should = require('should'),
	mongoose = require('mongoose'),
	Offer = mongoose.model('Product');

var offer_crawler;

describe('Product Server Controller Unit Tests:',function(){

	it('Should be able to get the product by EAN >>',function(done){
		this.timeout(4000);
		request(app).get('/api/products/ean/7895839235616')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(1);
				// res.body.docs[0].should.have.property('merchantProductId',9600910;
				// res.body.docs[0].should.have.property('price_br',"R$ 1499,00");
				done();
		});
	});


	it('Should be able to get product by ean=7895839235616',function(done){
		this.timeout(4000);
		request(app).get('/api/products/ean/7895839235616')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(1);
				res.body.docs[0].should.have.property('name',"Armário para Geladeira Palmeira com 1 Porta 27100");
				res.body.docs[0].should.have.property('ean',7895839235616);
				res.body.docs[0].should.have.property('manufacturer',"Palmeira Móveis");
				res.body.docs[0].should.have.property('image',"http://www.casasbahia-imagens.com.br/Control/ArquivoExibir.aspx?IdArquivo=38123187");
				res.body.docs[0].should.have.property('countSad',2);
				res.body.docs[0].should.have.property('countHappy',0);
				res.body.docs[0].should.have.property('totalReviews',2);
				res.body.docs[0].should.have.property('nameURL',"armario-para-geladeira-palmeira-com-1-porta-27100");
				res.body.docs[0].should.have.property('departamentBD',"eletrodomésticos");
				done();
		});
	});


	it('Should be able to get product by nameurl=multiprocessador-philco-all-in-one-citrus-800w-branco',function(done){
		this.timeout(4000);
		request(app).get('/api/products/nameurl/multiprocessador-philco-all-in-one-citrus-800w-branco')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(2);
				res.body.docs[0].should.have.property('name',"Multiprocessador Philco All in One Citrus 800W - Branco");
				res.body.docs[0].should.have.property('ean',7899466418121);
				res.body.docs[0].should.have.property('manufacturer',"Philco");
				res.body.docs[0].should.have.property('image',"http://www.pontofrio-imagens.com.br/Control/ArquivoExibir.aspx?IdArquivo=276347026");
				res.body.docs[0].should.have.property('countSad',2);
				res.body.docs[0].should.have.property('countHappy',8);
				res.body.docs[0].should.have.property('totalReviews',10);
				res.body.docs[0].should.have.property('departamentBD',"eletroportáteis");
				res.body.docs[0].should.have.property('nameURL',"multiprocessador-philco-all-in-one-citrus-800w-branco");
				done();
		});
	});

});





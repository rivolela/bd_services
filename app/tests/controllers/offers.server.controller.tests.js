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
				res.body.total.should.be.equal(7049);
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
				res.body.total.should.be.equal(3);
				res.body.docs[0].should.have.property('_id',"33598");
				res.body.docs[0].should.have.property('name',"Geladeira/Refrigerador Electrolux Infinity DF80 553L 2 portas Frost Free Branco");
				res.body.docs[0].should.have.property('ean',7896584042719);
				res.body.docs[0].should.have.property('advertiser',"Walmart BR");
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium',"https://static.wmobjects.com.br/imgres/arquivos/ids/2498101-250-250");
				res.body.docs[0].should.have.property('countSad',6);
				res.body.docs[0].should.have.property('countHappy',40);
				res.body.docs[0].should.have.property('totalReviews',46);
				res.body.docs[0].should.have.property('price_display',"R$ 2.998,00");
				res.body.docs[0].should.have.property('url',"http://ad.zanox.com/ppc/?41049933C87969835&ULP=[[33598/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[A3697E2455EA755B758F]]");
				done();
		});
	});


	it('Should be able to find the product by query = smartphone Motorola Moto G 2º Geração DTV',function(done){
		this.timeout(4000);
		request(app).get('/api/offers/bd/query/smartphone Motorola Moto G 2º Geração DTV/page/1/limit/30/filter/1')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(1);
				res.body.docs[0].should.have.property('name',"Smartphone Motorola Moto G 2º Geração DTV Colors Dual Chip 16GB - XT1069 Preto Bvolt");
				res.body.docs[0].should.have.property('ean',7892597336555);
				res.body.docs[0].should.have.property('advertiser',"Walmart BR");
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium',"https://static.wmobjects.com.br/imgres/arquivos/ids/9038774-250-250");
				res.body.docs[0].should.have.property('countSad',21);
				res.body.docs[0].should.have.property('countHappy',117);
				res.body.docs[0].should.have.property('totalReviews',138);
				res.body.docs[0].should.have.property('score',5.874999999999999);
				res.body.docs[0].should.have.property('price',1173.5);
				// res.body.docs[0].should.have.property('price_display',"R$ 1.299,00");
				res.body.docs[0].should.have.property('category',"Telefonia / Celulares e Smartphones / Smartphones");
				res.body.docs[0].should.have.property('minorPriceEAN',"R$ 766,99");
				done();
		});
	});


	it('Should be able to get the list of iphone offers order by higher score ( filter == 0 )',function(done){
		this.timeout(4000);
		request(app).get('/api/offers/bd/query/iphone/page/1/limit/30/filter/0')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(69);
				res.body.docs[0].should.have.property('_id',"58c8e6d31414660400bedcf6");
				res.body.docs[0].should.have.property('name',"IPhone SE Apple 64GB Dourado IOS 9 4G Touch Chip A9 e Câmera de 12MP");
				res.body.docs[0].should.have.property('ean',888462802840);
				res.body.docs[0].should.have.property('advertiser',"Girafa BR");
				res.body.docs[0].should.have.property('image_large','http://www.girafa.com.br//visao/default/img/produtos/Telefonia/Celulares/84932-1466014082-iphone-se-apple-64gb-dourado-ios-9-4g-touch-chip-a9-e-camera-de-12mp-1.jpg');
				res.body.docs[0].should.have.property('image_medium',null);
				res.body.docs[0].should.have.property('countSad',0);
				res.body.docs[0].should.have.property('countHappy',10);
				res.body.docs[0].should.have.property('totalReviews',10);
				res.body.docs[0].should.have.property('score',1.2727272727272727);
				res.body.docs[0].should.have.property('price',3379.9);
				// res.body.docs[0].should.have.property('price_display',"R$ 1.499,00");
				res.body.docs[0].should.have.property('category',"Telefonia");
				res.body.docs[0].should.have.property('minorPriceEAN',"R$ 2.299,00");
				done();
		});
	});


	it('Should be able to get the list of iphone offers order by total of reviews and after higher score ( filter == 1 )',function(done){
		this.timeout(4000);
		request(app).get('/api/offers/bd/query/iphone/page/1/limit/30/filter/1')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(69);
				res.body.docs[0].should.have.property('_id',"58c8e6c81414660400bedc30");
				res.body.docs[0].should.have.property('name','Smartphone Apple Iphone 5S 16Gb 4G iOS 8Mp Tela 4\'');
				res.body.docs[0].should.have.property('ean',885909784608);
				res.body.docs[0].should.have.property('advertiser',"Walmart BR");
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium','https://static.wmobjects.com.br/imgres/arquivos/ids/11038311-250-250');
				res.body.docs[0].should.have.property('countSad',1);
				res.body.docs[0].should.have.property('countHappy',32);
				res.body.docs[0].should.have.property('totalReviews',33);
				res.body.docs[0].should.have.property('score',1.1964285714285714);
				res.body.docs[0].should.have.property('price',2299.99);
				// res.body.docs[0].should.have.property('price_display',"R$ 2.049,00");
				res.body.docs[0].should.have.property('category',"Telefonia / Celulares e Smartphones / iPhones");
				res.body.docs[0].should.have.property('minorPriceEAN',"R$ 1.879,99");
				done();
		});
	});


	it('Should be able to get the list of iphone offers order by total of countHappy and after higher score ( filter == 2 )',function(done){
		this.timeout(4000);
		request(app).get('/api/offers/bd/query/iphone/page/1/limit/30/filter/2')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(69);
				res.body.docs[0].should.have.property('_id',"58c8e6c81414660400bedc30");
				res.body.docs[0].should.have.property('name','Smartphone Apple Iphone 5S 16Gb 4G iOS 8Mp Tela 4\'');
				res.body.docs[0].should.have.property('ean',885909784608);
				res.body.docs[0].should.have.property('advertiser',"Walmart BR");
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium','https://static.wmobjects.com.br/imgres/arquivos/ids/11038311-250-250');
				res.body.docs[0].should.have.property('countSad',1);
				res.body.docs[0].should.have.property('countHappy',32);
				res.body.docs[0].should.have.property('totalReviews',33);
				res.body.docs[0].should.have.property('score',1.1964285714285714);
				res.body.docs[0].should.have.property('price',2299.99);
				// res.body.docs[0].should.have.property('price_display',"R$ 1.549,00");
				res.body.docs[0].should.have.property('category',"Telefonia / Celulares e Smartphones / iPhones");
				res.body.docs[0].should.have.property('minorPriceEAN',"R$ 1.879,99");
				done();
		});
	});


	it('Should be able to get the list of iphone offers order by total of countSad and after higher score ( filter == 3 )',function(done){
		this.timeout(4000);
		request(app).get('/api/offers/bd/query/iphone/page/1/limit/30/filter/3')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(69);
				res.body.docs[0].should.have.property('_id',"58c8e6c31414660400bedbfe");
				res.body.docs[0].should.have.property('name',"iPhone 6s Apple 16 GB Rose Gold MKQM2BR/A");
				res.body.docs[0].should.have.property('ean',888462562331);
				res.body.docs[0].should.have.property('advertiser',"Walmart BR");
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium',"https://static.wmobjects.com.br/imgres/arquivos/ids/9641971-250-250");
				res.body.docs[0].should.have.property('countSad',2);
				res.body.docs[0].should.have.property('countHappy',6);
				res.body.docs[0].should.have.property('totalReviews',8);
				res.body.docs[0].should.have.property('score',1.2692307692307692);
				res.body.docs[0].should.have.property('price',2999);
				// res.body.docs[0].should.have.property('price_display',"R$ 2.639,12");
				res.body.docs[0].should.have.property('category','Telefonia / Celulares e Smartphones / iPhones');
				res.body.docs[0].should.have.property('minorPriceEAN',"R$ 2.999,00");
				done();
		});
	});


	it('Should be able to get the list of iphone offers order by filter by minor price_display ( filter == 4 )',function(done){
		this.timeout(4000);
		request(app).get('/api/offers/bd/query/iphone/page/1/limit/30/filter/4')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(69);
				res.body.docs[0].should.have.property('_id',"58c8e6cc1414660400bedc6b");
				res.body.docs[0].should.have.property('name','Apple iPhone 4 8GB Branco Desbloqueado, GPS, Câmera 5.0MP, Tela 3,5", MP3/MP4 Player, 3G, Wi-Fi e Bluetooth');
				res.body.docs[0].should.have.property('ean',885909524105);
				res.body.docs[0].should.have.property('advertiser',"Walmart BR");
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium','https://static.wmobjects.com.br/imgres/arquivos/ids/2461199-250-250');
				res.body.docs[0].should.have.property('countSad',0);
				res.body.docs[0].should.have.property('countHappy',1);
				res.body.docs[0].should.have.property('totalReviews',1);
				res.body.docs[0].should.have.property('score',1.15);
				res.body.docs[0].should.have.property('price',799);
				// res.body.docs[0].should.have.property('price_display',"R$ 1.489,00");
				res.body.docs[0].should.have.property('category','Telefonia / Celulares e Smartphones / iPhones');
				res.body.docs[0].should.have.property('minorPriceEAN',"R$ 799,00");
				done();
		});
	});

});






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
				res.body.total.should.be.equal(8967);
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
				res.body.docs[0].should.have.property('_id',"33598");
				res.body.docs[0].should.have.property('name',"Geladeira/Refrigerador Electrolux Infinity DF80 553L 2 portas Frost Free Branco");
				res.body.docs[0].should.have.property('ean',7896584042719);
				res.body.docs[0].should.have.property('advertiser',"Walmart BR");
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium',"https://static.wmobjects.com.br/imgres/arquivos/ids/2498101-250-250");
				res.body.docs[0].should.have.property('countSad',6);
				res.body.docs[0].should.have.property('countHappy',40);
				res.body.docs[0].should.have.property('totalReviews',46);
				res.body.docs[0].should.have.property('price_display',"R$ 3.098,00");
				res.body.docs[0].should.have.property('url',"http://ad.zanox.com/ppc/?42246922C25572714&ULP=[[33598/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[A3697E2455EA755B758F]]");
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
				res.body.docs[0].should.have.property('score',27.7);
				res.body.docs[0].should.have.property('price',1031.7);
				// res.body.docs[0].should.have.property('price_display',"R$ 1.299,00");
				res.body.docs[0].should.have.property('category',"Telefonia / Celulares e Smartphones / Smartphones");
				res.body.docs[0].should.have.property('minorPriceEAN',"R$ 1.031,70");
				// offer product
				res.body.docs[0].product.should.have.property('_id',"58c92643bcbc89ad4abf6cbf");
				res.body.docs[0].product.should.have.property('image',"https://static.wmobjects.com.br/imgres/arquivos/ids/9038774-250-250");
				res.body.docs[0].product.should.have.property('name',"Smartphone Motorola Moto G 2º Geração DTV Colors Dual Chip 16GB - XT1069 Preto Bvolt");
				res.body.docs[0].product.should.have.property('ean',7892597336555);
				res.body.docs[0].product.should.have.property('departamentBD',"smartphones");
				res.body.docs[0].product.should.have.property('countSad',21);
				res.body.docs[0].product.should.have.property('countHappy',117);
				res.body.docs[0].product.should.have.property('totalReviews',138);
				res.body.docs[0].product.should.have.property('manufacturer',"Motorola");
				res.body.docs[0].product.should.have.property('totalReviews',138);
				res.body.docs[0].product.should.have.property('nameURL', "smartphone-motorola-moto-g-2-geracao-dtv-colors-dual-chip-16gb-xt1069-preto-bvolt");
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
				res.body.docs[0].should.have.property('_id',"5909645fad18f80400d7dce6");
				res.body.docs[0].should.have.property('name',"iPhone SE Apple 64GB Prata iOS 9 4G Touch Chip A9 e Câmera de 12MP");
				res.body.docs[0].should.have.property('ean',888462735537);
				res.body.docs[0].should.have.property('advertiser','Girafa BR');
				res.body.docs[0].should.have.property('image_large','http://www.girafa.com.br//visao/default/img/produtos/Telefonia/Celulares/84927-1465851082-iphone-se-apple-64gb-prata-ios-9-4g-touch-chip-a9-e-camera-de-12mp-1.jpg');
				res.body.docs[0].should.have.property('image_medium',null);
				res.body.docs[0].should.have.property('countSad',0);
				res.body.docs[0].should.have.property('countHappy',4);
				res.body.docs[0].should.have.property('totalReviews',4);
				res.body.docs[0].should.have.property('score',9.576923076923077);
				res.body.docs[0].should.have.property('price',3399);
				res.body.docs[0].should.have.property('price_display',"R$ 2.499,00");
				res.body.docs[0].should.have.property('category','Telefonia');
				res.body.docs[0].should.have.property('minorPriceEAN','R$ 2.499,00');
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
				res.body.docs[0].should.have.property('_id',"59096447ad18f80400d7dbc9");
				res.body.docs[0].should.have.property('name','Smartphone Apple Iphone 5S 16Gb 4G iOS 8Mp Tela 4\'');
				res.body.docs[0].should.have.property('ean',885909784608);
				res.body.docs[0].should.have.property('advertiser',"Walmart BR");
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium','https://static.wmobjects.com.br/imgres/arquivos/ids/11038311-250-250');
				res.body.docs[0].should.have.property('countSad',1);
				res.body.docs[0].should.have.property('countHappy',32);
				res.body.docs[0].should.have.property('totalReviews',33);
				res.body.docs[0].should.have.property('score',8.472222222222221);
				res.body.docs[0].should.have.property('price',2299.99);
				res.body.docs[0].should.have.property('price_display',"R$ 1.399,00");
				res.body.docs[0].should.have.property('category',"Telefonia / Celulares e Smartphones / iPhones");
				res.body.docs[0].should.have.property('minorPriceEAN',"R$ 1.399,00");
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
				res.body.docs[0].should.have.property('_id',"59096447ad18f80400d7dbc9");
				res.body.docs[0].should.have.property('name','Smartphone Apple Iphone 5S 16Gb 4G iOS 8Mp Tela 4\'');
				res.body.docs[0].should.have.property('ean',885909784608);
				res.body.docs[0].should.have.property('advertiser',"Walmart BR");
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium','https://static.wmobjects.com.br/imgres/arquivos/ids/11038311-250-250');
				res.body.docs[0].should.have.property('countSad',1);
				res.body.docs[0].should.have.property('countHappy',32);
				res.body.docs[0].should.have.property('totalReviews',33);
				res.body.docs[0].should.have.property('score',8.472222222222221);
				res.body.docs[0].should.have.property('price',2299.99);
				res.body.docs[0].should.have.property('price_display',"R$ 1.399,00");
				res.body.docs[0].should.have.property('category',"Telefonia / Celulares e Smartphones / iPhones");
				res.body.docs[0].should.have.property('minorPriceEAN',"R$ 1.399,00");
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
				res.body.docs[0].should.have.property('_id',"5909645ead18f80400d7dcd2");
				res.body.docs[0].should.have.property('name','iPhone 6s Apple com 16GB e Tela 4,7” HD com 3D Touch, iOS 9, Sensor Touch ID, Câmera iSight 12MP, Wi-Fi, 4G, GPS, Bluetooth e NFC - Ouro Rosa');
				res.body.docs[0].should.have.property('ean',888462562331);
				res.body.docs[0].should.have.property('advertiser','Extra BR');
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium','http://www.extra-imagens.com.br/Control/ArquivoExibir.aspx?IdArquivo=452748678');
				res.body.docs[0].should.have.property('countSad',2);
				res.body.docs[0].should.have.property('countHappy',6);
				res.body.docs[0].should.have.property('totalReviews',8);
				res.body.docs[0].should.have.property('score',9.566666666666666);
				res.body.docs[0].should.have.property('price',2949);
				// res.body.docs[0].should.have.property('price_display',"R$ 2.639,12");
				res.body.docs[0].should.have.property('category','iOS & iPhone');
				res.body.docs[0].should.have.property('minorPriceEAN',"R$ 2.949,00");
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
				res.body.docs[0].should.have.property('_id',"59096454ad18f80400d7dc6d");
				res.body.docs[0].should.have.property('name','Apple iPhone 4 8GB Branco Desbloqueado, GPS, Câmera 5.0MP, Tela 3,5", MP3/MP4 Player, 3G, Wi-Fi e Bluetooth');
				res.body.docs[0].should.have.property('ean',885909524105);
				res.body.docs[0].should.have.property('advertiser',"Walmart BR");
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium','https://static.wmobjects.com.br/imgres/arquivos/ids/2461199-250-250');
				res.body.docs[0].should.have.property('countSad',0);
				res.body.docs[0].should.have.property('countHappy',1);
				res.body.docs[0].should.have.property('totalReviews',1);
				res.body.docs[0].should.have.property('score',8.095238095238095);
				res.body.docs[0].should.have.property('price',799);
				// res.body.docs[0].should.have.property('price_display',"R$ 1.489,00");
				res.body.docs[0].should.have.property('category','Telefonia / Celulares e Smartphones / iPhones');
				res.body.docs[0].should.have.property('minorPriceEAN',"R$ 799,00");
				done();
		});
	});



	it('Should be able to get the list of offers by categoryBD === tablet',function(done){
		this.timeout(4000);
		request(app).get('/api/offers/bd/category/ipad apple/page/1/limit/50/filter/1')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(61);
				res.body.docs[0].should.have.property('_id',"5909aa020a47465117fb7e12");
				res.body.docs[0].should.have.property('name','Tablet Android 4.1, Tela de 7", Processador 1.2GHz, 8GB, Wi-Fi, USB, HDMI – Bravva Planet Tab BV 4000RK - Preto');
				res.body.docs[0].should.have.property('ean',7898994207658);
				res.body.docs[0].should.have.property('advertiser',"Walmart BR");
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium','https://static.wmobjects.com.br/imgres/arquivos/ids/2669132-250-250');
				res.body.docs[0].should.have.property('countSad',0);
				res.body.docs[0].should.have.property('countHappy',42);
				res.body.docs[0].should.have.property('totalReviews',42);
				res.body.docs[0].should.have.property('price',229);
				// res.body.docs[0].should.have.property('price_display',"R$ 1.489,00");
				res.body.docs[0].should.have.property('category','Tablets / iPads e Tablets / Tablets');
				res.body.docs[0].should.have.property('categoryBD','ipad apple');
				res.body.docs[0].should.have.property('minorPriceEAN',"R$ 229,00");
				done();
		});
	});

});






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
				res.body.total.should.be.equal(12115);
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
				res.body.total.should.be.equal(1);
				res.body.docs[0].should.have.property('_id',"148218");
				res.body.docs[0].should.have.property('name',"Refrigerador/Geladeira Electrolux Infinity Frost Free, 2 Portas, 553 L - DF80");
				res.body.docs[0].should.have.property('ean',7896584042719);
				res.body.docs[0].should.have.property('advertiser',"Lojas Colombo BR");
				res.body.docs[0].should.have.property('image_large','https://www.colombo.com.br/produtos/148218/148218_refrigerador_DF80_electrolux_10_g.jpg');
				res.body.docs[0].should.have.property('image_medium',null);
				res.body.docs[0].should.have.property('countSad',6);
				res.body.docs[0].should.have.property('countHappy',40);
				res.body.docs[0].should.have.property('totalReviews',46);
				res.body.docs[0].should.have.property('price_display',"R$ 3.349,00");
				res.body.docs[0].should.have.property('url',"http://ad.zanox.com/ppc/?42246970C43761669&ULP=[[/produto/Eletrodomesticos/Refrigerador-Geladeira-Electrolux-Frost-Free-2-Portas-553-Litros-Infinity-DF80?utm_campaign=xml_produtos&portal=4256CC361F2545F3488AFD861B38B9B6&utm_source=zanox&utm_medium=Afiliados]]&zpar9=[[A3697E2455EA755B758F]]");
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
				res.body.docs[0].should.have.property('minorPriceEAN',"R$ 849,00");
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
				res.body.docs[0].should.have.property('_id',"590bdcd155a4b504004db51d");
				res.body.docs[0].should.have.property('name',"iPhone SE Apple com 16GB, Tela 4”, iOS 9, Sensor de Impressão Digital, Câmera iSight 12MP, Wi-Fi, 3G/4G, GPS, MP3, Bluetooth e NFC - Prateado");
				res.body.docs[0].should.have.property('ean',888462734370);
				res.body.docs[0].should.have.property('advertiser','Pontofrio BR');
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium','http://www.pontofrio-imagens.com.br/Control/ArquivoExibir.aspx?IdArquivo=385910096');
				res.body.docs[0].should.have.property('countSad',0);
				res.body.docs[0].should.have.property('countHappy',7);
				res.body.docs[0].should.have.property('totalReviews',7);
				res.body.docs[0].should.have.property('score',9.576923076923077);
				res.body.docs[0].should.have.property('price', 2249.1);
				res.body.docs[0].should.have.property('price_display',"R$ 2.249,10");
				res.body.docs[0].should.have.property('category','iOS & iPhone');
				res.body.docs[0].should.have.property('minorPriceEAN','R$ 2.249,10');
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
				res.body.docs[0].should.have.property('_id',"590bdcc455a4b504004db409");
				res.body.docs[0].should.have.property('name','iPhone 5s Apple 16GB Prata ME433BR/A');
				res.body.docs[0].should.have.property('ean',885909784608);
				res.body.docs[0].should.have.property('advertiser',"Walmart BR");
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium','https://static.wmobjects.com.br/imgres/arquivos/ids/9831753-250-250');
				res.body.docs[0].should.have.property('countSad',1);
				res.body.docs[0].should.have.property('countHappy',32);
				res.body.docs[0].should.have.property('totalReviews',33);
				res.body.docs[0].should.have.property('score',8.472222222222221);
				res.body.docs[0].should.have.property('price',1399);
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
				res.body.docs[0].should.have.property('_id',"590bdcc455a4b504004db409");
				res.body.docs[0].should.have.property('name','iPhone 5s Apple 16GB Prata ME433BR/A');
				res.body.docs[0].should.have.property('ean',885909784608);
				res.body.docs[0].should.have.property('advertiser',"Walmart BR");
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium','https://static.wmobjects.com.br/imgres/arquivos/ids/9831753-250-250');
				res.body.docs[0].should.have.property('countSad',1);
				res.body.docs[0].should.have.property('countHappy',32);
				res.body.docs[0].should.have.property('totalReviews',33);
				res.body.docs[0].should.have.property('score',8.472222222222221);
				res.body.docs[0].should.have.property('price',1399);
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
				res.body.docs[0].should.have.property('_id',"590bdcd255a4b504004db527");
				res.body.docs[0].should.have.property('name','iPhone 6s Apple com 16GB e Tela 4,7” HD com 3D Touch, iOS 9, Sensor Touch ID, Câmera iSight 12MP, Wi-Fi, 4G, GPS, Bluetooth e NFC - Ouro Rosa');
				res.body.docs[0].should.have.property('ean',888462562331);
				res.body.docs[0].should.have.property('advertiser','Pontofrio BR');
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium','http://www.pontofrio-imagens.com.br/Control/ArquivoExibir.aspx?IdArquivo=452748678');
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
				res.body.docs[0].should.have.property('_id',"590bdccb55a4b504004db492");
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
				res.body.total.should.be.equal(14);
				res.body.docs[0].should.have.property('_id',"590beabe55a4b504004db7ce");
				res.body.docs[0].should.have.property('name','iPad AIR 2 16GB WI-FI 4G Tela Retina 9.7" Câmera 8MP Prata - Apple');
				res.body.docs[0].should.have.property('ean',888462003803);
				res.body.docs[0].should.have.property('advertiser',"Walmart BR");
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium','https://static.wmobjects.com.br/imgres/arquivos/ids/5166310-250-250');
				res.body.docs[0].should.have.property('countSad',1);
				res.body.docs[0].should.have.property('countHappy',19);
				res.body.docs[0].should.have.property('totalReviews',20);
				res.body.docs[0].should.have.property('price',4873.24);
				// res.body.docs[0].should.have.property('price_display',"R$ 1.489,00");
				res.body.docs[0].should.have.property('category','Tablets / iPads e Tablets / iPads');
				res.body.docs[0].should.have.property('categoryBD','ipad apple');
				res.body.docs[0].should.have.property('minorPriceEAN',"R$ 3.425,78");
				done();
		});
	});

});






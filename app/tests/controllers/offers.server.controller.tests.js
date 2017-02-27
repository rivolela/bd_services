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
				res.body.total.should.be.equal(9333);
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
				res.body.docs[0].should.have.property('countSad',0);
				res.body.docs[0].should.have.property('countHappy',6);
				res.body.docs[0].should.have.property('totalReviews',6);
				res.body.docs[0].should.have.property('price_display',"R$ 2.998,00");
				res.body.docs[0].should.have.property('url',"http://ad.zanox.com/ppc/?41049933C87969835&ULP=[[33598/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[A3697E2455EA755B758F]]");
				done();
		});
	});


	it('Should be able to find the product by query = Ar Condicionado Split Consul, Quente e Frio, 9000 BTUS, 220 V',function(done){
		this.timeout(4000);
		request(app).get('/api/offers/bd/query/Ar Condicionado Split Consul, Quente e Frio, 9000 BTUS, 220 V - CBZ09DB/page/1/limit/30/filter/1')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(1);
				res.body.docs[0].should.have.property('name',"Ar Condicionado Split Consul, Quente e Frio, 9000 BTUS, 220 V - CBZ09DB");
				res.body.docs[0].should.have.property('ean',7891129234864);
				res.body.docs[0].should.have.property('advertiser',"Lojas Colombo BR");
				res.body.docs[0].should.have.property('image_large',"https://www.colombo.com.br/produtos/486252/486252_Split_Consug19_g.jpg");
				res.body.docs[0].should.have.property('image_medium',null);
				res.body.docs[0].should.have.property('countSad',3);
				res.body.docs[0].should.have.property('countHappy',14);
				res.body.docs[0].should.have.property('totalReviews',17);
				res.body.docs[0].should.have.property('score',8.916666666666666);
				res.body.docs[0].should.have.property('price',1379);
				res.body.docs[0].should.have.property('price_display',"R$ 1.299,00");
				res.body.docs[0].should.have.property('category',"Eletrodomesticos / Ar Condicionado / Split Quente e Frio");
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
				res.body.total.should.be.equal(70);
				res.body.docs[0].should.have.property('_id',"58b42cf14dc8a12d6018666d");
				res.body.docs[0].should.have.property('name',"iPhone 5S Apple com 16GB, Tela 4”, iOS 8, Touch ID, Câmera 8MP, Wi-Fi, 3G/4G, GPS, MP3 e Bluetooth – Cinza Espacial");
				res.body.docs[0].should.have.property('ean',885909784301);
				res.body.docs[0].should.have.property('advertiser',"Pontofrio BR");
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium',"http://www.pontofrio-imagens.com.br/Control/ArquivoExibir.aspx?IdArquivo=104670776");
				res.body.docs[0].should.have.property('countSad',1);
				res.body.docs[0].should.have.property('countHappy',16);
				res.body.docs[0].should.have.property('totalReviews',17);
				res.body.docs[0].should.have.property('score',1.2738095238095237);
				res.body.docs[0].should.have.property('price',1699);
				res.body.docs[0].should.have.property('price_display',"R$ 1.499,00");
				res.body.docs[0].should.have.property('category',"iOS & iPhone");
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
				res.body.total.should.be.equal(70);
				res.body.docs[0].should.have.property('_id',"58b42c4f4dc8a12d601865a1");
				res.body.docs[0].should.have.property('name',"Smartphone Apple Iphone 5S 16GB Desbloqueado TCDAP145");
				res.body.docs[0].should.have.property('ean',885909784608);
				res.body.docs[0].should.have.property('advertiser',"Walmart BR");
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium','https://static.wmobjects.com.br/imgres/arquivos/ids/6872905-250-250');
				res.body.docs[0].should.have.property('countSad',2);
				res.body.docs[0].should.have.property('countHappy',65);
				res.body.docs[0].should.have.property('totalReviews',67);
				res.body.docs[0].should.have.property('score',1.1964285714285714);
				res.body.docs[0].should.have.property('price',1879.99);
				res.body.docs[0].should.have.property('price_display',"R$ 1.549,00");
				res.body.docs[0].should.have.property('category',"Telefonia / Celulares e Smartphones / iPhones");
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
				res.body.total.should.be.equal(70);
				res.body.docs[0].should.have.property('_id',"58b42c4f4dc8a12d601865a1");
				res.body.docs[0].should.have.property('name',"Smartphone Apple Iphone 5S 16GB Desbloqueado TCDAP145");
				res.body.docs[0].should.have.property('ean',885909784608);
				res.body.docs[0].should.have.property('advertiser',"Walmart BR");
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium','https://static.wmobjects.com.br/imgres/arquivos/ids/6872905-250-250');
				res.body.docs[0].should.have.property('countSad',2);
				res.body.docs[0].should.have.property('countHappy',65);
				res.body.docs[0].should.have.property('totalReviews',67);
				res.body.docs[0].should.have.property('score',1.1964285714285714);
				res.body.docs[0].should.have.property('price',1879.99);
				res.body.docs[0].should.have.property('price_display',"R$ 1.549,00");
				res.body.docs[0].should.have.property('category',"Telefonia / Celulares e Smartphones / iPhones");
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
				res.body.total.should.be.equal(70);
				res.body.docs[0].should.have.property('_id',"58b42cec4dc8a12d6018665a");
				res.body.docs[0].should.have.property('name',"iPhone 6s Apple com Tela 4,7” HD, 32GB, 3D Touch, iOS 9, Sensor Touch ID, Câmera iSight 12MP, Wi-Fi, 4G, GPS, Bluetooth e NFC - Dourado");
				res.body.docs[0].should.have.property('ean',190198057792);
				res.body.docs[0].should.have.property('advertiser',"Pontofrio BR");
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium',"http://www.pontofrio-imagens.com.br/Control/ArquivoExibir.aspx?IdArquivo=595987171");
				res.body.docs[0].should.have.property('countSad',2);
				res.body.docs[0].should.have.property('countHappy',7);
				res.body.docs[0].should.have.property('totalReviews',9);
				res.body.docs[0].should.have.property('score',1.27);
				res.body.docs[0].should.have.property('price',2639.12);
				res.body.docs[0].should.have.property('price_display',"R$ 2.639,12");
				res.body.docs[0].should.have.property('category','iOS & iPhone');
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
				res.body.total.should.be.equal(70);
				res.body.docs[0].should.have.property('_id',"58b42c2d4dc8a12d6018656b");
				res.body.docs[0].should.have.property('name',"Apple iPhone 5c 8GB Azul Desbloqueado, iOS 8, 3G/4G, Câmera 8.0MP, Wi-Fi, GPS");
				res.body.docs[0].should.have.property('ean',885909940899);
				res.body.docs[0].should.have.property('advertiser',"Walmart BR");
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium','https://static.wmobjects.com.br/imgres/arquivos/ids/4277167-250-250');
				res.body.docs[0].should.have.property('countSad',0);
				res.body.docs[0].should.have.property('countHappy',6);
				res.body.docs[0].should.have.property('totalReviews',6);
				res.body.docs[0].should.have.property('score',1.15625);
				res.body.docs[0].should.have.property('price',1489);
				res.body.docs[0].should.have.property('price_display',"R$ 1.489,00");
				res.body.docs[0].should.have.property('category','Telefonia / Celulares e Smartphones / iPhones');
				done();
		});
	});

});






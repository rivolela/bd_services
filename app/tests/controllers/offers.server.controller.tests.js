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
				res.body.total.should.be.equal(12785);
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
				res.body.docs[0].should.have.property('merchantProductId',"33598");
				res.body.docs[0].should.have.property('name',"Geladeira/Refrigerador Electrolux Infinity DF80 553L 2 portas Frost Free Branco");
				res.body.docs[0].should.have.property('ean',7896584042719);
				res.body.docs[0].should.have.property('advertiser',"Walmart BR");
				res.body.docs[0].should.have.property('price_display',"R$ 3.379,00");
				res.body.docs[0].should.have.property('price',3379);
				res.body.docs[0].should.have.property('url',"http://ad.zanox.com/ppc/?42246922C25572714&ULP=[[33598/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[A3697E2455EA755B758F]]");
				done();
		});
	});


	it('Should be able to find the product by query = smartphone Motorola Moto G 2º Geração DTV',function(done){
		this.timeout(4000);
		request(app).get('/api/offers/bd/query/smartphone Motorola Moto G 2º Geração DTV/page/1/limit/30/order/1')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(1);
				res.body.docs[0].should.have.property('name',"Smartphone Motorola Moto G 2º Geração DTV Colors Dual Chip 16GB - XT1069 Preto Bvolt");
				res.body.docs[0].should.have.property('ean',7892597336555);
				res.body.docs[0].should.have.property('advertiser',"Walmart BR");
				res.body.docs[0].should.have.property('score',27.7);
				res.body.docs[0].should.have.property('price',1031.7);
				res.body.docs[0].should.have.property('price_display',"R$ 1.031,70");
				res.body.docs[0].should.have.property('category',"Telefonia / Celulares e Smartphones / Smartphones");
				res.body.docs[0].should.have.property('categoryBD',"motorola");
				res.body.docs[0].should.have.property('departamentBD',"smartphones");
				res.body.docs[0].should.have.property('url',"http://ad.zanox.com/ppc/?42246922C25572714&ULP=[[3070730/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[A3697E2455EA755B758F]]");
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


	it('Should be able to get the list of iphone offers order by higher score ( order == 0 )',function(done){
		this.timeout(4000);
		request(app).get('/api/offers/bd/query/iphone/page/1/limit/30/order/0')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(69);
				res.body.docs[0].should.have.property('_id',"590bdcd155a4b504004db51d");
				res.body.docs[0].should.have.property('name',"iPhone SE Apple com 16GB, Tela 4”, iOS 9, Sensor de Impressão Digital, Câmera iSight 12MP, Wi-Fi, 3G/4G, GPS, MP3, Bluetooth e NFC - Prateado");
				res.body.docs[0].should.have.property('ean',888462734370);
				res.body.docs[0].should.have.property('advertiser','Pontofrio BR');
				res.body.docs[0].should.have.property('score',9.576923076923077);
				res.body.docs[0].should.have.property('price', 2249.1);
				res.body.docs[0].should.have.property('price_display',"R$ 2.249,10");
				res.body.docs[0].should.have.property('category','iOS & iPhone');
				done();
		});
	});


	it('Should be able to get the list of iphone offers order by total of reviews and after higher score ( order == 1 )',function(done){
		this.timeout(4000);
		request(app).get('/api/offers/bd/query/iphone/page/1/limit/30/order/1')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(69);
				res.body.docs[0].should.have.property('_id',"590bdcd155a4b504004db51d");
				res.body.docs[0].should.have.property('name','iPhone SE Apple com 16GB, Tela 4”, iOS 9, Sensor de Impressão Digital, Câmera iSight 12MP, Wi-Fi, 3G/4G, GPS, MP3, Bluetooth e NFC - Prateado');
				res.body.docs[0].should.have.property('ean',888462734370);
				res.body.docs[0].should.have.property('advertiser',"Pontofrio BR");
				res.body.docs[0].should.have.property('score',9.576923076923077);
				res.body.docs[0].should.have.property('price',2249.1);
				res.body.docs[0].should.have.property('price_display',"R$ 2.249,10");
				res.body.docs[0].should.have.property('category',"iOS & iPhone");
				res.body.docs[0].should.have.property('departamentBD',"smartphones");
				res.body.docs[0].should.have.property('url',"http://ad.zanox.com/ppc/?42246963C91430847&ULP=[[/7990218?utm_source=zanox&utm_medium=afiliado&utm_campaign=Telefones---Celulares_iOS---iPhone&utm_content=7990218&cm_mmc=zanox_XML-_-TELE-_-Comparador-_-7990218]]&zpar9=[[A3697E2455EA755B758F]]");
				done();
		});
	});


	it('Should be able to get the list of iphone offers order by total of countHappy and after higher score ( order == 2 )',function(done){
		this.timeout(4000);
		request(app).get('/api/offers/bd/query/iphone/page/1/limit/30/order/2')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(69);
				res.body.docs[0].should.have.property('_id',"590bdcd155a4b504004db51d");
				res.body.docs[0].should.have.property('name','iPhone SE Apple com 16GB, Tela 4”, iOS 9, Sensor de Impressão Digital, Câmera iSight 12MP, Wi-Fi, 3G/4G, GPS, MP3, Bluetooth e NFC - Prateado');
				res.body.docs[0].should.have.property('ean',888462734370);
				res.body.docs[0].should.have.property('advertiser',"Pontofrio BR");
				res.body.docs[0].should.have.property('score',9.576923076923077);
				res.body.docs[0].should.have.property('price',2249.1);
				res.body.docs[0].should.have.property('price_display',"R$ 2.249,10");
				res.body.docs[0].should.have.property('category',"iOS & iPhone");
				res.body.docs[0].should.have.property('categoryBD',"iphone");
				res.body.docs[0].should.have.property('departamentBD',"smartphones");
				res.body.docs[0].should.have.property('url',"http://ad.zanox.com/ppc/?42246963C91430847&ULP=[[/7990218?utm_source=zanox&utm_medium=afiliado&utm_campaign=Telefones---Celulares_iOS---iPhone&utm_content=7990218&cm_mmc=zanox_XML-_-TELE-_-Comparador-_-7990218]]&zpar9=[[A3697E2455EA755B758F]]");
				done();
		});
	});


	it('Should be able to get the list of iphone offers order by total of countSad and after higher score ( order == 3 )',function(done){
		this.timeout(4000);
		request(app).get('/api/offers/bd/query/iphone/page/1/limit/30/order/3')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(69);
				res.body.docs[0].should.have.property('_id',"590bdcd155a4b504004db51d");
				res.body.docs[0].should.have.property('name','iPhone SE Apple com 16GB, Tela 4”, iOS 9, Sensor de Impressão Digital, Câmera iSight 12MP, Wi-Fi, 3G/4G, GPS, MP3, Bluetooth e NFC - Prateado');
				res.body.docs[0].should.have.property('ean',888462734370);
				res.body.docs[0].should.have.property('advertiser','Pontofrio BR');
				res.body.docs[0].should.have.property('score',9.576923076923077);
				res.body.docs[0].should.have.property('price',2249.1);
				res.body.docs[0].should.have.property('price_display',"R$ 2.249,10");
				res.body.docs[0].should.have.property('category','iOS & iPhone');
				res.body.docs[0].should.have.property('categoryBD',"iphone");
				res.body.docs[0].should.have.property('departamentBD',"smartphones");
				res.body.docs[0].should.have.property('url',"http://ad.zanox.com/ppc/?42246963C91430847&ULP=[[/7990218?utm_source=zanox&utm_medium=afiliado&utm_campaign=Telefones---Celulares_iOS---iPhone&utm_content=7990218&cm_mmc=zanox_XML-_-TELE-_-Comparador-_-7990218]]&zpar9=[[A3697E2455EA755B758F]]");
				done();
		});
	});


	it('Should be able to get the list of iphone offers order by order by minor price_display ( order == 4 )',function(done){
		this.timeout(4000);
		request(app).get('/api/offers/bd/query/iphone/page/1/limit/30/order/4')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(69);
				res.body.docs[0].should.have.property('_id',"590bdccb55a4b504004db492");
				res.body.docs[0].should.have.property('name','Apple iPhone 4 8GB Branco Desbloqueado, GPS, Câmera 5.0MP, Tela 3,5", MP3/MP4 Player, 3G, Wi-Fi e Bluetooth');
				res.body.docs[0].should.have.property('ean',885909524105);
				res.body.docs[0].should.have.property('advertiser',"Walmart BR");
				res.body.docs[0].should.have.property('score',8.095238095238095);
				res.body.docs[0].should.have.property('price',799);
				res.body.docs[0].should.have.property('price_display',"R$ 799,00");
				res.body.docs[0].should.have.property('category','Telefonia / Celulares e Smartphones / iPhones');
				res.body.docs[0].should.have.property('categoryBD','iphone');
				res.body.docs[0].should.have.property('departamentBD','smartphones');
				res.body.docs[0].should.have.property('url',"http://ad.zanox.com/ppc/?42246922C25572714&ULP=[[35036/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[A3697E2455EA755B758F]]");
				done();
		});
	});


	it('Should be able to get the list of offers by categoryBD === tablet',function(done){
		this.timeout(4000);
		request(app).get('/api/offers/bd/category/ipad apple/page/1/limit/50/order/1')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(14);
				res.body.docs[0].should.have.property('_id',"590beaee55a4b504004dbb0c");
				res.body.docs[0].should.have.property('name','Estojo Reversível Philips / Para iPad / Neoprene / Dois em Um / Preto e Vermelho');
				res.body.docs[0].should.have.property('ean',7897712102190);
				res.body.docs[0].should.have.property('advertiser',"Girafa BR");
				res.body.docs[0].should.have.property('price',54.9);
				res.body.docs[0].should.have.property('price_display',"R$ 54,90");
				res.body.docs[0].should.have.property('category','Informática');
				res.body.docs[0].should.have.property('categoryBD','ipad apple');
				res.body.docs[0].should.have.property('departamentBD','informática');
				done();
		});
	});


	it('Should be able to get the list of offers by departamentBD === smartphones',function(done){
		this.timeout(4000);
		request(app).get('/api/offers/bd/departament/smartphones/page/1/limit/50/order/0')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(333);
				res.body.docs[0].should.have.property('_id',"590bdccd55a4b504004db4ce");
				res.body.docs[0].should.have.property('name','iPhone 6s Apple com Tela 4,7” HD, 32GB, 3D Touch, iOS 9, Sensor Touch ID, Câmera iSight 12MP, Wi-Fi, 4G, GPS, Bluetooth e NFC - Prateado');
				res.body.docs[0].should.have.property('ean',190198057396);
				res.body.docs[0].should.have.property('advertiser',"Extra BR");
				res.body.docs[0].should.have.property('score',null);
				res.body.docs[0].should.have.property('price',2999);
				res.body.docs[0].should.have.property('price_display',"R$ 2.999,00");
				res.body.docs[0].should.have.property('category','iOS & iPhone');
				res.body.docs[0].should.have.property('categoryBD','iphone');
				res.body.docs[0].should.have.property('departamentBD','smartphones');
					// offer product
				res.body.docs[0].product.should.have.property('_id',"58c926acbcbc89ad4abf6dda");
				done();
		});
	});


	it('Should be able to get the list of offers by brand === brastemp',function(done){
		this.timeout(4000);
		request(app).get('/api/offers/bd/brand/brastemp/page/1/limit/50/order/0')
			.set('Accept','application/json')
			.expect('Content-Type',/json/)
				.expect(200)
			.end(function(err,res){
				res.body.total.should.be.equal(141);
				res.body.docs[0].should.have.property('_id',"593aca8c6709619657191307");
				res.body.docs[0].should.have.property('name','Fogão Piso 5 Bocas Brastemp Ative! Top Glass Duplo Forno Inox - BFD5VAR');
				res.body.docs[0].should.have.property('ean',7891129233843);
				res.body.docs[0].should.have.property('advertiser',"Ricardo Eletro BR");
				res.body.docs[0].should.have.property('score',null);
				res.body.docs[0].should.have.property('price',3134.05);
				res.body.docs[0].should.have.property('price_display',"R$ 2.999,00");
				res.body.docs[0].should.have.property('category','Fogão');
				res.body.docs[0].should.have.property('categoryBD','fogão');
				res.body.docs[0].should.have.property('url','http://ad.zanox.com/ppc/?42246964C80714839&ULP=[[Fogao-Piso-5-Bocas-Brastemp-Ative-Top-Glass-Duplo-Forno-Inox-BFD5VAR/256-280-283-518888/?utm_source=Zanox&prc=8803&utm_medium=CPC_Eletrodomesticos_Zanox&utm_campaign=Fogao&utm_content=Fogao_Piso_5_Bocas&cda=E198-E863-BA87-DC80]]&zpar9=[[A3697E2455EA755B758F]]');
				// offer product
				res.body.docs[0].product.should.have.property('_id',"58c91ecabcbc89ad4abf58a3");
				done();
		});
	});

});

 
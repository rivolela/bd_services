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
				res.body.total.should.be.equal(969);
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
				res.body.docs[0].should.have.property('_id',"58738fa246ee6dfe219640a2");
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
				res.body.docs[0].should.have.property('price_display',"R$ 1.379,00");
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
				res.body.total.should.be.equal(17);
				res.body.docs[0].should.have.property('_id',"58ab0b3e6a44de9c33413cf1");
				res.body.docs[0].should.have.property('name',"iPhone SE 16GB Apple Dourado MLXM2 - 4G, Tela IPS LCD 4\" Câmera 12 MP + Frontal 1.2MP, Gravação de vídeos em 4K, A9,iOS 9");
				res.body.docs[0].should.have.property('ean',888462801768);
				res.body.docs[0].should.have.property('advertiser',"Ricardo Eletro BR");
				res.body.docs[0].should.have.property('image_large',"http://parceiroimg.maquinadevendas.com.br/produto/680770_5029426_20161017150919.jpg");
				res.body.docs[0].should.have.property('image_medium',null);
				res.body.docs[0].should.have.property('countSad',0);
				res.body.docs[0].should.have.property('countHappy',1);
				res.body.docs[0].should.have.property('totalReviews',1);
				res.body.docs[0].should.have.property('score',1.25);
				res.body.docs[0].should.have.property('price',2099);
				res.body.docs[0].should.have.property('price_display',"R$ 2.099,00");
				res.body.docs[0].should.have.property('category',"Smartphones IOS");
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
				res.body.total.should.be.equal(17);
				res.body.docs[0].should.have.property('_id',"58ab0b3c6a44de9c33413cee");
				res.body.docs[0].should.have.property('name',"iPhone 5S Apple, 4G, 16GB, 8MP, Single Chip - Prata");
				res.body.docs[0].should.have.property('ean',885909784608);
				res.body.docs[0].should.have.property('advertiser',"Lojas Colombo BR");
				res.body.docs[0].should.have.property('image_large',"https://www.colombo.com.br/produtos/779804/779804_iphone_5s_prata_3_g.jpg");
				res.body.docs[0].should.have.property('image_medium',null);
				res.body.docs[0].should.have.property('countSad',1);
				res.body.docs[0].should.have.property('countHappy',33);
				res.body.docs[0].should.have.property('totalReviews',34);
				res.body.docs[0].should.have.property('score',1.1964285714285714);
				res.body.docs[0].should.have.property('price',1599);
				res.body.docs[0].should.have.property('price_display',"R$ 1.599,00");
				res.body.docs[0].should.have.property('category',"Smartphones / Apple / iPhone 5S");
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
				res.body.total.should.be.equal(17);
				res.body.docs[0].should.have.property('_id',"58ab0b3c6a44de9c33413cee");
				res.body.docs[0].should.have.property('name',"iPhone 5S Apple, 4G, 16GB, 8MP, Single Chip - Prata");
				res.body.docs[0].should.have.property('ean',885909784608);
				res.body.docs[0].should.have.property('advertiser',"Lojas Colombo BR");
				res.body.docs[0].should.have.property('image_large',"https://www.colombo.com.br/produtos/779804/779804_iphone_5s_prata_3_g.jpg");
				res.body.docs[0].should.have.property('image_medium',null);
				res.body.docs[0].should.have.property('countSad',1);
				res.body.docs[0].should.have.property('countHappy',33);
				res.body.docs[0].should.have.property('totalReviews',34);
				res.body.docs[0].should.have.property('score',1.1964285714285714);
				res.body.docs[0].should.have.property('price',1599);
				res.body.docs[0].should.have.property('price_display',"R$ 1.599,00");
				res.body.docs[0].should.have.property('category',"Smartphones / Apple / iPhone 5S");
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
				res.body.total.should.be.equal(17);
				res.body.docs[0].should.have.property('_id',"58ab0b166a44de9c33413cd5");
				res.body.docs[0].should.have.property('name',"iPhone 6s Apple 32GB Dourado MN112BR/A");
				res.body.docs[0].should.have.property('ean',190198057792);
				res.body.docs[0].should.have.property('advertiser',"Walmart BR");
				res.body.docs[0].should.have.property('image_large',null);
				res.body.docs[0].should.have.property('image_medium',"https://static.wmobjects.com.br/imgres/arquivos/ids/9869307-250-250");
				res.body.docs[0].should.have.property('countSad',1);
				res.body.docs[0].should.have.property('countHappy',1);
				res.body.docs[0].should.have.property('totalReviews',2);
				res.body.docs[0].should.have.property('score',1.2083333333333335);
				res.body.docs[0].should.have.property('price',2799);
				res.body.docs[0].should.have.property('price_display',"R$ 2.799,00");
				res.body.docs[0].should.have.property('category',"Telefonia / Celulares e Smartphones / iPhones");
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
				res.body.total.should.be.equal(17);
				res.body.docs[0].should.have.property('_id',"58ab0b3c6a44de9c33413cee");
				res.body.docs[0].should.have.property('name',"iPhone 5S Apple, 4G, 16GB, 8MP, Single Chip - Prata");
				res.body.docs[0].should.have.property('ean',885909784608);
				res.body.docs[0].should.have.property('advertiser',"Lojas Colombo BR");
				res.body.docs[0].should.have.property('image_large',"https://www.colombo.com.br/produtos/779804/779804_iphone_5s_prata_3_g.jpg");
				res.body.docs[0].should.have.property('image_medium',null);
				res.body.docs[0].should.have.property('countSad',1);
				res.body.docs[0].should.have.property('countHappy',33);
				res.body.docs[0].should.have.property('totalReviews',34);
				res.body.docs[0].should.have.property('score',1.1964285714285714);
				res.body.docs[0].should.have.property('price',1599);
				res.body.docs[0].should.have.property('price_display',"R$ 1.599,00");
				res.body.docs[0].should.have.property('category',"Smartphones / Apple / iPhone 5S");
				done();
		});
	});

});






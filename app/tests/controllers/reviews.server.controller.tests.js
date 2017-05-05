var app = require('../../../server.js'),
	request = require('supertest'),
	should = require('should'),
	mongoose = require('mongoose'),
	Review = mongoose.model('Review');

var review;

describe('Reviews Controller Unit Tests:',function(){

	describe('Testing the get methods',function(){

		it('Should be able to get the list of reviews',function(done){
			request(app).get('/api/reviews/ean/7891129246515/page/1/limit/10/filter/0')
				.set('Accept','application/json')
				.expect('Content-Type',/json/)
					.expect(200)
				.end(function(err,res){
					console.log(res.body.total);
					res.body.total.should.be.equal(10);
					res.body.docs[0].should.have.property('_id','581b368f8c409c7acb39a2f7');
					res.body.docs[0].should.have.property('advertiser','Pontofrio BR');
					res.body.docs[0].should.have.property('author','Karla');
					res.body.docs[0].should.have.property('date','1476835200000');
					res.body.docs[0].should.have.property('ean','7891129246515');
					res.body.docs[0].should.have.property('manufacturer','Consul');
					// res.body.docs[0].should.have.property('category','Frost Free');
					res.body.docs[0].should.have.property('rating','4');
					res.body.docs[0].should.have.property('location','Rj');
					res.body.docs[0].should.have.property('description','Geladeira de pequeno porte, entretanto me atende. Supriu minhas necessidades. Embora a empresa que tenha feito a logistica tenha sido a Top Cargas, que nao possui rastreio, o produto chegou antes do prazo informado.');
					res.body.docs[0].should.have.property('title','Gostei. Recomendo!');
					res.body.docs[0].should.have.property('dateBR','19/10/2016');
					done();
			});
		});


		it('Should be able to get review summary by ean',function(done){
			request(app).get('/api/reviews/summary/ean/888462341479')
				.set('Accept','application/json')
				.expect('Content-Type',/json/)
					.expect(200)
				.end(function(err,res){
					console.log(res.body.total);
					res.body.total.should.be.equal(1);
					res.body.docs[0].should.have.property('ean','888462341479');
					res.body.docs[0].should.have.property('countSad',1);
					res.body.docs[0].should.have.property('countHappy',5);
					res.body.docs[0].should.have.property('totalReviews',6);
					done();
			});
		});

	});
	
});




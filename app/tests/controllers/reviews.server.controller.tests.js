var app = require('../../../server.js'),
	request = require('supertest'),
	should = require('should'),
	mongoose = require('mongoose'),
	Review = mongoose.model('Review');

var review;

describe('Reviews Controller Unit Tests:',function(){

	describe('Testing the get methods',function(){

		it('Should be able to get the list of reviews',function(done){
			request(app).get('/api/reviews/ean/7891129246515/page/1/limit/10')
				.set('Accept','application/json')
				.expect('Content-Type',/json/)
					.expect(200)
				.end(function(err,res){
					console.log(res.body.total);
					res.body.total.should.be.equal(4);
					res.body.docs[0].should.have.property('_id','58656a9930ffc4570836986d');
					res.body.docs[0].should.have.property('advertiser','Pontofrio BR');
					res.body.docs[0].should.have.property('author','Selma');
					res.body.docs[0].should.have.property('date','1482112800000');
					res.body.docs[0].should.have.property('ean','7891129246515');
					res.body.docs[0].should.have.property('manufacturer','Consul');
					res.body.docs[0].should.have.property('category','Frost Free');
					res.body.docs[0].should.have.property('rating','5');
					res.body.docs[0].should.have.property('location','São Paulo');
					res.body.docs[0].should.have.property('description','Designe lindo lindo lindo, ah e mto fácil realizar limpeza rsrs');
					res.body.docs[0].should.have.property('title','Excelente produto, especialmente pra cozinha pequena');
					res.body.docs[0].should.have.property('dateBR','19/12/2016');
					done();
			});
		});

	});
	
});




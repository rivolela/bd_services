var app = require('../../../server.js'),
	request = require('supertest'),
	should = require('should');


describe('Zanox Controller Unit Tests:',function(){

	describe('Testing the get methods',function(){

		it('Should be able to get the list of zanox offers',function(done){

			this.timeout(4000);

			request(app).get('/api/offers/zn/query/fogao/page/0/items/50')
				.set('Accept','application/json')
				.expect('Content-Type',/json/)
					.expect(200)
				.end(function(err,res){
					//console.log(res);
					res.body.total.should.be.above(30);
					res.body.productItems.productItem[0].should.have.property('currency','BRL');
					done();
			});
		});

	});

});


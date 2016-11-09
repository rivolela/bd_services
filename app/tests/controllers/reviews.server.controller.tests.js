var app = require('../../../server.js'),
	request = require('supertest'),
	should = require('should'),
	mongoose = require('mongoose'),
	Review = mongoose.model('Review');

var review;

describe('Reviews Controller Unit Tests:',function(){


	before(function(done){
		review = new Review ({
        	title: "Indicação 100% para Walmart ",
        	description: "Comprei esse fogão com o prazo de entrega para dia 19/08/2016 foi entreguei no dia 04/08/2016 sobre a entrega perfeito deixou no 1º andar e o pessoal da entrega muito educado o fogão muito lindo superou todas minha espectativas. Parabéns Walmart ",
        	author: 'thalita ',
        	location: 'Curitiba',
        	ean: 88888888888888,
        	date: '1470366041000',
        	category: "Eletrodomésticos / Fogões / Embutir 5 Bocas",
        	advertiser:"walmart",
        	url:"http://ad.zanox.com/ppc/?25371034C45550273&ULP=[[1109777/sk?utm_medium=afiliados&utm_source=zanox&utm_campaign=xml_zanox&utm_term=zanox]]&zpar9=[[43EEF0445509C7205827]]",
        	advertiser:"walmart",
        	manufacturer: "brastemp",
        	rating:3,
    	});

		review.save(function(err){
        	console.log(err);
			done();
      	});
	});


	describe('Testing the get methods',function(){

		it('Should be able to get the list of reviews',function(done){
			request(app).get('/api/reviews/ean/88888888888888/page/1/limit/10')
				.set('Accept','application/json')
				.expect('Content-Type',/json/)
					.expect(200)
				.end(function(err,res){
					console.log(res.body.total);
					res.body.total.should.be.equal(1);
					res.body.docs[0].should.have.property('advertiser',review.advertiser);
					done();
			});
		});

	});


	after(function(done){
		Review.remove(function(){
			done();
		});
	});
	
});




var app = require('../../../server.js'),
    should = require('should'),
    mongoose = require('mongoose'),
    Review = mongoose.model('Review');

var review;

describe('Review Model Unit Tests:',function(done){

  before(function(){

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
  });


  describe('Testing the save method',function(){

    it('Should be able to save without problems',function(){
      review.save(function(err){
        should.not.exist(err);
      });
    });
  })


  describe('Testing the list method',function(){

    it('Should not be able to get the review pre-saved',function(){
      Review.find({},function(err,reviews){
        reviews.length.should.be.equal(1);
      });
    });
  });


  after(function(done){
    Review.remove(function(){
      done();
    });
  });
});
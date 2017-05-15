var app = require('../../../server.js'),
    should = require('should'),
    mongoose = require('mongoose'),
    Review = mongoose.model('Review');

var review;

describe('Review Model Unit Tests:',function(){

    it('Should not be able to get the review list == 28464 reviews',function(done){
      this.timeout(30000);
      Review.find({},function(err,reviews){
        reviews.length.should.be.equal(28464);
        done();
      });
    });
});


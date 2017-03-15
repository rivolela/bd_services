var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

var ProductSchema = new Schema({
  name: {
    type:String,
    trim: true,
    index: true 
  },
  ean: Number,
  image: String,
  // category: {
  //   type:String,
  //   index: true 
  // },
  // merchantProductId: String,
  manufacturer:{
    type:String,
    index: true
  },
  // advertiser: String,
  created:{
    type:Date,
    default: Date.now
  },
  countSad: Number,
  countHappy: Number,
  totalReviews: Number,
  departamentBD: String,
  updated:{
    type:Date,
    default: Date.now
  },
  nameURL: {
    type:String,
  }
});

// pagination
ProductSchema.plugin(mongoosePaginate);

ProductSchema.plugin(mongooseAggregatePaginate);

mongoose.model('Product',ProductSchema);




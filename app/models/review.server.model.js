var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var ReviewSchema = new Schema({
	 ean: {
    type:String,
    trim: true,
  },
  title: {
    type:String,
    trim: true,
  },
  description:{
    type:String,
    trim: true,
  },
  author: {
    type:String,
    trim: true,
  },
  location: {
    type:String,
    trim: true,
  },
  date: String,
  advertiser: String,
  category: String,
  manufacturer: String,
  rating:Number,
  created:{
    type:Date,
    default: Date.now
  },
});


ReviewSchema.plugin(mongoosePaginate);

mongoose.model('Review',ReviewSchema);


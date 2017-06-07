var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

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

// virtuals
ReviewSchema.virtual('dateBR').get(function(){
  var data = new Date(Number(this.date));
  var dataFormatada = ("0" + data.getDate()).substr(-2) + "/" 
    + ("0" + (data.getMonth() + 1)).substr(-2) + "/" + data.getFullYear();
  return dataFormatada;
});

// virtuals
ReviewSchema.virtual('datePublished').get(function(){
  var data = new Date(Number(this.date));
  var dataFormatada = ("0" + data.getDate()).substr(-2) + "-" + ("0" + (data.getMonth() + 1)).substr(-2) + "-" + data.getFullYear(); 
  return dataFormatada;
});

ReviewSchema.set('toJSON',{
  getters:true,
  virtuals:true
});

ReviewSchema.set('toObject',{
  getters:true,
  virtuals:true
});

ReviewSchema.plugin(mongoosePaginate);

ReviewSchema.plugin(mongooseAggregatePaginate);

mongoose.model('Review',ReviewSchema);


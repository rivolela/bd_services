var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

var OfferSchema = new Schema({
  name: {
    type:String,
    trim: true,
    index: true 
  },
  ean: Number,
  image_medium: String,
  image_large: String,
  price: String,
  category: {
    type:String,
    index: true 
  },
  categoryBD: String,
  merchantProductId: String,
  manufacturer:{
    type:String,
    index: true
  },
  url: {
    type:String,
  },
  urlOffer: String,
  advertiser: String,
  created:{
    type:Date,
    default: Date.now
  },
  countSad: Number,
  countHappy: Number,
  totalReviews: Number
});

// middleware to handle attributes before to save
OfferSchema.pre('save',function(next){
  
  // split merchant url offer thal will be used in crawler
  var url_01 = this.url.split('[[');
  console.log(url_01);
  var url_02 = url_01[1].split('?');
  console.log(url_02);

  this.urlOffer = url_02[0];
  
  next();
});


// virtuals
OfferSchema.virtual('price_br').get(function(){
    
    // config
    var valor = Number(this.price);
    var casas = 2;
    var separdor_decimal = ',';
    var separador_milhar = '.';


    var valor_total = parseInt(valor * (Math.pow(10,casas)));
    var inteiros =  parseInt(parseInt(valor * (Math.pow(10,casas))) / parseFloat(Math.pow(10,casas)));
    var centavos = parseInt(parseInt(valor * (Math.pow(10,casas))) % parseFloat(Math.pow(10,casas)));
   
    if(centavos%10 == 0 && centavos+"".length<2 ){
      centavos = centavos+"0";
    }else if(centavos<10){
      centavos = "0"+centavos;
    }
  
    var milhares = parseInt(inteiros/1000);
    inteiros = inteiros % 1000; 
   
    var retorno = "";
   
    if(milhares>0){
      retorno = milhares+""+separador_milhar+""+retorno
    if(inteiros == 0){
      inteiros = "000";
    } else if(inteiros < 10){
      inteiros = "00"+inteiros; 
    } else if(inteiros < 100){
      inteiros = "0"+inteiros; 
    }
  }

  retorno += inteiros+""+separdor_decimal+""+centavos;
 
  return 'R$ ' + retorno;
});


OfferSchema.set('toJSON',{
  getters:true,
  virtuals:true
});


OfferSchema.set('toObject',{
  getters:true,
  virtuals:true
});


// inxdex text search
OfferSchema.index({name: 'text',manufacturer:'text',category:'text'},
  {name: 'My text index', weights: {category: 10, name: 4, manufacturer: 2}});
  
// pagination
OfferSchema.plugin(mongoosePaginate);

OfferSchema.plugin(mongooseAggregatePaginate);


mongoose.model('Offer',OfferSchema);
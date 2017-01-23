var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var schema= new Schema(
    {
   imageUrl:{type:String , required:true},
    title: {type:String , required:true},
    description: {type:String , required:true},
    price: {type:Number , required:true}
},
    {collection : 'products'}
);

module.exports= mongoose.model('Product' , schema);
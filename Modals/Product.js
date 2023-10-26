const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
   NameOfProdut:String,
   Description:String,
   Images: [{
    imgname: String,
    imgdata: String
  }],
  Category:String,
  Price:String
});

const ProductDetails = mongoose.model('Product', ProductSchema);

module.exports = ProductDetails;
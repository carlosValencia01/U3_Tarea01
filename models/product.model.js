const mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  brand: {
    type: String,
    required:true
  },
  price: {
    type: String,
    required: true
  }
});

const productModel = mongoose.model('ProductSchema', productSchema, 'products');

module.exports = productModel;
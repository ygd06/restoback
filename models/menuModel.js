const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');

const menuSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  itemtype: {
    type: String,
    required: true
  },
  itemname: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

module.exports.Menu = model('Menu', menuSchema);

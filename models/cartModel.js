const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');
const {User} = require('../models/userModel');
const {Menu} = require('../models/menuModel');

const cartSchema = Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Menu',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
 });

 module.exports.Cart = model('Cart', cartSchema);
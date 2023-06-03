const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    id_hotel: {
      type: String,
      required: true
    },
    hotel_name: {
      type: String,
      required: true
    },
    avg_time: {
      type: String,
      required: true
    },
    distance: {
      type: String,
      required: true
    },
    item_name: {
      type: String,
      required: true
    },
    favourites: {
      type: Number,
      required: true
    },
    img_url: {
      type: String,
      required: true
    },
    total_items: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
 });

 module.exports.Hotel = model('Hotel', hotelSchema);

const {Schema, model} = require('mongoose');

const usernameSchema = Schema({
     name: {
        type: String,
        required: true
     } 
}, 
 {
    timestamps: true
 }
 );

 module.exports.Username = model('Username', usernameSchema);
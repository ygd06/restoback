const {Schema, model} = require('mongoose');

const flutterfestUserSchema = Schema({
     username: {
        type: String,
        required: true,
        unique: true
     } ,
     email : {
        type: String, 
        required: true,
     },
     password: {
        type: String,
        required: true
     }
}, 
 {
    timestamps: true
 }
 );

 module.exports.FestUser = model('FestUser', flutterfestUserSchema);
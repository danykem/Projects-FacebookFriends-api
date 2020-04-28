const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
     nom : {type : String},
     prenom : {type : String },
     login : {type : String },
     pass : {type : String},
     email : { type : String }
})


module.exports = mongoose.model('User', userSchema)
// Create mongoose schema for service discovery. We're going to have a model that is used to store and retrieve data
const mongoose = require('mongoose')
const { Schema } = mongoose;


const UserSchema = new Schema({
 name :{
    type : String,
    require: true,
     },
 email :{
    type : String,
    require: true,
    unique :true
     },
 password :{
    type : String,
    require: true,

     }
});

module.exports = mongoose.model('user', UserSchema)
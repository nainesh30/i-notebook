const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
 user :{
 //ek user k notes dusre dusre se alag rkhnne padenge uske liye
   type : mongoose.Schema.Types.ObjectId,
   ref : 'user'//iske reference me hoga sb 
 },
 title :{
    type : String,
    require: true,
     },
 description :{
    type : String,
    require: true,
     },
 tag :{
    type : String,
    default:'General'

     },
});

module.exports = mongoose.model('notes', NotesSchema)
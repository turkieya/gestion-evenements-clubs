const mongoose = require('mongoose');
var Schema =mongoose.Schema;
const SalleSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
num: {
    type: String,
    unique: true
},
locale:{
    type: String
},

description: {
    type: String
}}, {
  collection: 'salles'
})
 
 var SalleModel = mongoose.model("Salle",SalleSchema);
module.exports = SalleModel;
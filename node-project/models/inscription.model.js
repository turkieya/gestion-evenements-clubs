const mongoose = require('mongoose');
var Schema =mongoose.Schema;
const InscriptionSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nom:  String,
prenom: String,
  numtel: Number,
email: String,
 pays :String,  
  adresse: String,
  password: String,
  date_inscrip:String,
  role:String
});
 var InscriptionModel = mongoose.model("Inscription",InscriptionSchema );
module.exports = InscriptionModel;
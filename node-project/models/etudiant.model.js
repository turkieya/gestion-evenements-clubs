const mongoose = require('mongoose');
var crypto = require('crypto');
var Schema =mongoose.Schema;
const EtudiantSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nom:  String,
prenom: String,
  numtel: Number,
email: String,
 pays :String,  
  adresse: String,
  password: String,
  confirmPassword:String,
});
 var EtudiantModel = mongoose.model("Etudiant", EtudiantSchema);
module.exports = EtudiantModel;
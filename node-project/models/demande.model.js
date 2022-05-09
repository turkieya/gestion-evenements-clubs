const mongoose = require('mongoose');
var Schema =mongoose.Schema;
const DemandeSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
    title: String,
    email:String,
    date: String,
    debut:String,
    fin:String,
    salle:String,
    materiels:String,
    qtemat:Number,
    nom_club:String,
    etat:String,
});
 var DemandeModel = mongoose.model("Demande",DemandeSchema );
module.exports = DemandeModel;
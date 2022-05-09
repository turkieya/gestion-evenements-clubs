const mongoose = require('mongoose');
var Schema =mongoose.Schema;
const MaterielSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  libelle: {
    type: String,
    unique: true
},
  quantite: {
    type: Number
},
description: {
  type: String
}}, {
  collection: 'materiels'
})
 
 var MaterielModel = mongoose.model("Materiel",MaterielSchema);
module.exports = MaterielModel;
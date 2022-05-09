const mongoose = require('mongoose');
var Schema =mongoose.Schema;
const eventSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
    title: String,
    date: String,
    debut:String,
    fin:String,
    salle:String,
    materiels:String,
    qtemat:Number,
    nom_club:String,
    etat:String,
});

var EventModel = mongoose.model('Event', eventSchema);

module.exports = EventModel;
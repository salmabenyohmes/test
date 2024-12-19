var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Batiment = new Schema({
    msg : String,
    date : Date,
})
module.exports = mongoose.model('chats', Batiment)

/*
const mongoose = require('mongoose');

const BatimentSchema = new mongoose.Schema({
    nom: String,
    nbr_niveau: { type: Number, default: 0 },
    description: String,
    adresse: String,
});

module.exports = mongoose.model('Batiment', BatimentSchema);
*/

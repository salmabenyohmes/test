const mongoose = require('mongoose');

const NiveauSchema = new mongoose.Schema({
    nom: String,
    nbr_chambre: Number,
    etat_construction: { type: Boolean, default: false },
    id_batiment: { type: mongoose.Schema.Types.ObjectId, ref: 'Batiment' },
});

module.exports = mongoose.model('Niveau', NiveauSchema);

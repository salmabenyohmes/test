var Batiment = require('./batimentModel')
var socketIo = require('socket.io')

function socketIO(server){
    const io = socketIo(server)
    io.on('connection',(socket)=>{
        console.log("user connected !");
        socket.broadcast.emit("msg","A new user is connected !")
    })
    return io;
}



function batimentView(req, res, next) {
    res.render('batiment')
}

async function list(req,res,next){
    await Batiment.find()
              .then((data,err)=>{
                if(err){
                    res.status(500).json(err)
                }
                    res.status(200).json(data)
              })
    //res.end('Batiment List')
}

const create =async (req,res,next)=>{
    const { msg } = req.body 
    console.log(req.body.msg);
    await new Batiment({
        msg: msg,
        date: new Date()
    }).save()
      .then((data, err)=>{
          if(err){
              res.status(500).json(err)
            }
            console.log(data);
      })
    
res.json('Batiment added ! msg : '+ msg + ' date : '+ new Date())
}

const update = async (req, res, next)=>{
    await Batiment.findByIdAndUpdate(req.params.id, req.body)
              .then((data, err)=>{
                res.json(data)
              })
}

async function deleteU(req, res, next) {
    await Batiment.findByIdAndDelete(req.params.id)
              .then((data, err)=>{
                if(err){
                    res.status(500).json(err)
                }
                    res.status(200).json(data)
              })
}

module.exports = { socketIO, batimentView, create, list, update, deleteU };

/*
const express = require('express');
const Batiment = require('../models/Batiment');
const Niveau = require('../models/Niveau');

const router = express.Router();

// Ajouter un bâtiment
router.post('/', async (req, res) => {
    try {
        const { nom, description, adresse } = req.body;
        const batiment = new Batiment({ nom, description, adresse });
        await batiment.save();
        res.status(201).json(batiment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Lister les bâtiments
router.get('/', async (req, res) => {
    try {
        const batiments = await Batiment.find();
        res.json(batiments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer un bâtiment via son ID
router.get('/:id', async (req, res) => {
    try {
        const batiment = await Batiment.findById(req.params.id);
        if (!batiment) return res.status(404).json({ message: 'Bâtiment non trouvé' });
        res.json(batiment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Supprimer un bâtiment
router.delete('/:id', async (req, res) => {
    try {
        const batiment = await Batiment.findByIdAndDelete(req.params.id);
        if (!batiment) return res.status(404).json({ message: 'Bâtiment non trouvé' });
        res.json({ message: 'Bâtiment supprimé' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ajouter un niveau
router.post('/:id/niveaux', async (req, res) => {
    try {
        const { nom, nbr_chambre } = req.body;
        const niveau = new Niveau({
            nom,
            nbr_chambre,
            id_batiment: req.params.id,
        });
        await niveau.save();
        res.status(201).json(niveau);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Construire un niveau
router.put('/niveaux/:id/construction', async (req, res) => {
    try {
        const niveau = await Niveau.findById(req.params.id);
        if (!niveau) return res.status(404).json({ message: 'Niveau non trouvé' });

        if (niveau.etat_construction) {
            return res.status(400).json({ message: 'Niveau déjà construit' });
        }

        niveau.etat_construction = true;
        await niveau.save();

        const batiment = await Batiment.findById(niveau.id_batiment);
        batiment.nbr_niveau += 1;
        await batiment.save();

        res.json({ niveau, batiment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
*/
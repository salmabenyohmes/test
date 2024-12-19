// ordinateur/controller.js
var express = require('express');
var router = express.Router();
const { list, create, update, deleteU, rechercherselonprix , Viewordinateur } = require('./ordinateurService');

router.get('/list', list);
router.post('/create', create);
router.put('/update/:id', update);
router.delete('/delete/:id', deleteU);
router.get('/chercher', rechercherselonprix);
router.get('/afficher', Viewordinateur);

module.exports = router;
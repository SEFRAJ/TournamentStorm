'use strict'

var express = require('express');
var VersusController = require('../controllers/versusController');
var Tor = require('../controllers/torneoController');
var md_auth = require('../middlewares/authenticated');

//SUBIR IMAGEN
var multiparty = require('connect-multiparty');
var md_subir = multiparty({ uploadDir: './src/uploads/users' })


//Rutas
var api = express.Router();
api.post('/crear-versus', md_auth.ensureAuth, VersusController.addVersus);
api.post('/add-retador1-paga/:id', md_auth.ensureAuth, VersusController.addRetador1Paga);
api.post('/add-retador2-paga/:id', md_auth.ensureAuth, VersusController.addRetador2Paga);
api.post('/add-retador2-libre/:id', md_auth.ensureAuth, VersusController.addRetador2Libre);
api.post('/add-resultado-paga/:id', md_auth.ensureAuth, VersusController.addResultadoPaga);
api.post('/add-resultado-libre/:id', md_auth.ensureAuth, VersusController.addResultadoLibre);

api.delete('/del-versus/:id', md_auth.ensureAuth, VersusController.delVersus);

api.get('/versus', md_auth.ensureAuth,VersusController.getVersus);
api.get('/versus-Creadror', md_auth.ensureAuth, VersusController.getVersusCreador);
api.get('/un-versus/:id',  VersusController.getUnVersus);
api.get('/versus-participando', md_auth.ensureAuth, VersusController.getVersusParticipando);
api.get('/versus-libre',  VersusController.getVersusLibre);
api.get('/versus-paga',  VersusController.getVersusPaga);

//Torneos

api.post('/add-torneo' ,md_auth.ensureAuth, Tor.addTorneo);
api.post('/add-user-torneo/:id', md_auth.ensureAuth, Tor.addUser);
api.post('/add-resultado-torneo/:id',  md_auth.ensureAuth, Tor.addResultado);
api.get('/init-torneo/:id', md_auth.ensureAuth, Tor.initTorneo);
api.get('/ava-torneo/:id',  md_auth.ensureAuth, Tor.avaTorneo);
api.get('/end-torneo/:id',  md_auth.ensureAuth, Tor.endTorneo);

api.get('/torneo/:id', md_auth.ensureAuth, Tor.getTorneo);
api.post('/fase/:id',  md_auth.ensureAuth, Tor.getFase);
api.get('/torneos',  md_auth.ensureAuth, Tor.getTorneos);
api.get('/codigo/:id', Tor.getCodigo);
api.get('/me-torneos/:id', Tor.getMisTorneos);
api.get('/me-torneos-privados/:id', Tor.getTorneosPrivados);


module.exports = api;
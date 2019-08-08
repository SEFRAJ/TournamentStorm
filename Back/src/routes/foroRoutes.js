'use strict'

var express = require('express');
var ForoController = require('../controllers/foroController');
var md_auth = require('../middlewares/authenticated');

//SUBIR IMAGEN
var multiparty = require('connect-multiparty');
var md_subir = multiparty({ uploadDir: './src/uploads/users' })


//Rutas
var api = express.Router();
api.post('/registrar-foro',md_auth.ensureAuth, ForoController.registrarForo);
api.put('/editar-foro/:id', md_auth.ensureAuth, ForoController.editarForo )
api.delete('/eliminar-foro/:id',md_auth.ensureAuth, ForoController.eliminarForo)
api.get('/foro/:id', ForoController.getForo);
api.get('/foros', ForoController.getForos)
api.get('/mis-foros', md_auth.ensureAuth, ForoController.misForos)
module.exports = api;
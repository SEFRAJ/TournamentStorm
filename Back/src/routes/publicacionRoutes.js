'use strict'

var express = require('express');
var PublicacionController = require('../controllers/publicacionController');
var md_auth = require('../middlewares/authenticated');

//SUBIR IMAGEN
var multiparty = require('connect-multiparty');
var md_subir = multiparty({ uploadDir: './src/uploads/users' })


//Rutas
var api = express.Router();
api.post('/registrar-publicacion/:id',md_auth.ensureAuth, PublicacionController.registrarPublicacion);
/* api.put('/editar-foro/:id', md_auth.ensureAuth, ForoIdController.editarForo )
api.delete('/eliminar-foro/:id',md_auth.ensureAuth, ForoIdController.eliminarForo)
api.get('/publicacion/:id', ForoIdController.getPublicacion); */
api.get('/publicaciones/:id', PublicacionController.getPublicaciones)
module.exports = api;
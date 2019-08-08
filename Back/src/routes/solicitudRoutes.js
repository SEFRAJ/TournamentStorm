'use strict'

var express = require('express');
var SolicitudController = require('../controllers/solicitudController');
var md_auth = require('../middlewares/authenticated');

//Rutas
var api = express.Router();

api.post('/solicitud/:id' , md_auth.ensureAuth, SolicitudController.solicitud);

api.post('/agregar-amigo/:idSolicitud', md_auth.ensureAuth, SolicitudController.agregarAmigos); 

api.delete('/eliminar-solicitud/:idSolicitud', SolicitudController.eliminarSolicitud); 

api.get('/solicitudes', md_auth.ensureAuth, SolicitudController.misSolicitudes); 

module.exports = api;
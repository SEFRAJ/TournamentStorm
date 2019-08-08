'use strict'

var express = require('express');
var UserController = require('../controllers/userController');
var md_auth = require('../middlewares/authenticated');

//SUBIR IMAGEN
var multiparty = require('connect-multiparty');
var md_subir = multiparty({ uploadDir: './src/uploads/users' })


//Rutas
var api = express.Router();
api.post('/registrar-usuario', UserController.registrarUsuario);

api.put('/addComprar/:id', UserController.addComprar);

api.post('/login', UserController.login);

api.put('/editar-usuario/:id', md_auth.ensureAuth, UserController.editarUsuario);

api.get('/usuarios-disponibles', md_auth.ensureAuth, UserController.usuariosDisponibles);

api.get('/amigos', md_auth.ensureAuth, UserController.amigos);

api.post('/subir-imagen-usuario/:id', [md_auth.ensureAuth, md_subir], UserController.subirImagen);

api.get('/obtener-imagen-usuario/:nombreImagen', UserController.obtenerImagen);

api.get('/buscar-usuario', UserController.buscarUsuario );

api.delete('/eliminar-amigo/:amigoId', md_auth.ensureAuth, UserController.eliminarAmigo );

api.get('/usuarios', UserController.usuarios );

api.post('/add-monedas', md_auth.ensureAuth, UserController.addMonedas);

api.post('/restar-monedas', md_auth.ensureAuth, UserController.restarMonedas);

module.exports = api;
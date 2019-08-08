'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublicacionSchema = Schema({
    idForo: String,
    comentario: String,
    nombreUsuario: String,
    fecha: String,
});

module.exports = mongoose.model('Publicacion', PublicacionSchema);
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SolicitudSchema = Schema({
    emisorId: String,
    emUsuario: String,
    emImage: String,
    receptorId: String,
    estado: String
});

module.exports = mongoose.model('Solicitud',SolicitudSchema);
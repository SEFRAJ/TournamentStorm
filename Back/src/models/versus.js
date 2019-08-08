'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VersusSchema = Schema({
    idCreador: String,
    nombreCreador: String,
    idRetador1: String,
    nombreRetador1: String,
    idRetador2: String,
    nombreRetador2: String,
    nombreVersus: String,
    tipoJuego: String,
    tipoVersus: String,
    valorEntrada: Number,
    puntosRetador1: Number,
    puntosRetador2: Number,
    resultado: String,
    nombreGanador: String,
    estado: String
});

module.exports = mongoose.model('Versus', VersusSchema);
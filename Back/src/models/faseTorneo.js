'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FaseTorneoSchema = Schema({
    idTorneo: String,
    fase: Number,
    jugadores:[],
    resultados:[],
    ganadores:[],
    perdedores:[],


});

module.exports = mongoose.model('FaseTorneo', FaseTorneoSchema);
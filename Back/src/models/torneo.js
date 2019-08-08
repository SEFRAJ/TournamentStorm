'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TorneoSchema = Schema({
    idUser: String,
    nameUser: String,
    nameTorneo: String,
    descripcion: String,
    tipo: Boolean,
    costo: Number,
    horario: Date,
    juego: String,
    cantidad: Number,
    fase: Number,
    faseI: Number,
    faseA: String,  
    premioFinal: Number,
    jugadores: [{id:String,nombre:String, puntosA: Number,puntosE: Number, go:Boolean}],
    go: Boolean,
    creativo: Boolean
});

module.exports = mongoose.model('Torneo', TorneoSchema);
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GananciaSchema = Schema({
    nombre: String,
    fondo: Number
});

module.exports = mongoose.model('Ganancia',GananciaSchema);
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ForoSchema = Schema({
    titulo: String,
    descripcion: String,
    idCreador: String
});

module.exports = mongoose.model('Foro', ForoSchema);
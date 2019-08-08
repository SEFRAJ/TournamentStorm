'use strict'

//VARIABLES GLOBALES
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//CARGAR RUTAS
var user_routes = require('./routes/userRoutes');
var solicitud_routes = require('./routes/solicitudRoutes');
var versus_routes = require('./routes/versusRoutes');
var foro_routes = require('./routes/foroRoutes');
var publicacion_routes = require('./routes/publicacionRoutes')


//MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//CABEZERAS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
});

//RUTAS
app.use('/api', user_routes);
app.use('/api', solicitud_routes);
app.use('/api', versus_routes);
app.use('/api', foro_routes);
app.use('/api', publicacion_routes);

//EXPORTAR
module.exports = app;
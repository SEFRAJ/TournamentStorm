'use strict'

const mongoose = require("mongoose");
const app = require("./app");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Proyecto-Final', { useNewUrlParser: true }).then(()=>{
    console.log('Se encuentra conectado a la Base de Datos');

    app.set('port', process.env.PORT || 3000 );
    app.listen(app.get('port'), ()=>{
        console.log(`EL SERVIDOR ESTA CORRIENDO EN EL PUERTO: '${app.get('port')}'`);
    });
}).catch(err => console.log(err));
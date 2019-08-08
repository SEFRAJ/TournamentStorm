'use strict'

var Versus = require('../models/versus');
var User = require('../models/user');
var Ganancia = require('../models/Ganancia');
var jwt = require('../services/jwt');
var path = require('path');
var fs = require('fs');

//--------------------------------------------------------------------------------------------------------
function crearTablaGanancia(callback){
    callback();
}

crearTablaGanancia(function tablaGanancia(res){
    var ganancia = new Ganancia();
   ganancia.nombre = 'Porcentaje10';
   ganancia.fondo = 0;

   Ganancia.find((err, users)=>{
    if(users && users.length <1){
        ganancia.save((err, tablaGuardada)=>{
        })    
    }
})
});

//--------------------------------------------------------------------------------------------------------

function addVersus(req, res) {
    var params = req.body;
    var creadorId = req.user.sub;
    var versus = new Versus();
    var cantidadDeMoneda;
    var cantidadDeMonedaFinal;

    if (params.nombreVersus && params.tipoJuego && params.tipoVersus) {

        if(params.tipoVersus == 'Paga'){

            if( params.valorEntrada){

                versus.idCreador = creadorId;
                versus.nombreCreador = req.user.nombre;
                versus.idRetador1 = 'VACANTE';
                versus.nombreRetador1 = 'VACANTE';
                versus.idRetador2 = 'VACANTE';
                versus.nombreRetador2 = 'VACANTE';
                versus.nombreVersus = params.nombreVersus;
                versus.tipoJuego = params.tipoJuego;
                versus.tipoVersus = params.tipoVersus;
                versus.valorEntrada = params.valorEntrada;
                versus.puntosRetador1 = 0;
                versus.puntosRetador2 = 0;
                versus.resultado = 'Aun sin decidir';
                versus.nombreGanador = 'Nadie';
                versus.estado = 'ACTIVO'


                User.findOne({ _id: creadorId }, (err, busqueda) => {
                    if (err) return res.status(500).send({ message: 'Error en la peticiion' })
                    if (busqueda) {
                        cantidadDeMoneda = busqueda.moneda;

                        if(cantidadDeMoneda < params.valorEntrada){
                            res.status(200).send({
                                message: 'No tiene monedas suficientes'
                            });
                        }else{
                            cantidadDeMonedaFinal = cantidadDeMoneda - 0; //params.valorEntrada  se lo quite porque grillo no quiso cobrar
                            User.findByIdAndUpdate(creadorId,{moneda: cantidadDeMonedaFinal},{new : true},(err, descuento)=>{
                                if(err) return res.status(500).send({message: 'Error en la peticion'});
                                if(descuento){

                                    versus.save((err, versusGuardado) => {
                                        if (err) return res.status(500).send({ message: 'Error al guardar el versus' });
                                        if (versusGuardado) {
                                            res.status(200).send({ Versus: versusGuardado })
                                        } else {
                                            res.status(404).send({ message: 'no se ha registrado el versus' });
                                        }
                                    });


                                }
                            })
                        }

                    }
                })


            }else {
            res.status(200).send({
                message: 'No ingreso el valor de entrada'
            });
            }

        } else{

            versus.idCreador = creadorId;
            versus.nombreCreador = req.user.nombre;
            versus.idRetador1 = creadorId;
            versus.nombreRetador1 = req.user.nombre;
            versus.idRetador2 = 'VACANTE';
            versus.nombreRetador2 = 'VACANTE';
            versus.nombreVersus = params.nombreVersus;
            versus.tipoJuego = params.tipoJuego;
            versus.tipoVersus = 'Libre';
            versus.valorEntrada = 0;
            versus.puntosRetador1 = 0;
            versus.puntosRetador2 = 0;
            versus.resultado = 'Aun sin decidir';
            versus.nombreGanador = 'Nadie';
            versus.estado = 'ACTIVO'

                versus.save((err, versusGuardado) => {
                    if (err) return res.status(500).send({ message: 'Error al guardar el versus' });
                    if (versusGuardado) {
                         res.status(200).send({ Versus: versusGuardado })
                    } else {
                        res.status(404).send({ message: 'no se ha registrado el versus' });
                    }
                });
        }

    } else {
        res.status(200).send({
            message: 'Rellene todos los campos necesarios'
        });
    }
}

//--------------------------------------------------------------------------------------------------------
function addRetador1Paga(req, res) {
    var idVersus = req.params.id;
    var retadorId = req.user.sub;
    var valor;
    var cantidadDeMoneda;
    var cantidadDeMonedaFinal;
    var nombreR;
    

    Versus.findOne({ _id: idVersus }, (err, busqueda) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (busqueda) {
            valor = busqueda.valorEntrada;
            if (retadorId === busqueda.idCreador) {
                res.status(200).send({
                    message: 'Usted no puede particirpar en su propio versus'
                });
            } else {


                User.findOne({ _id: retadorId }, (err, busquedaU) => {
                    if (err) return res.status(500).send({ message: 'Error en la peticion' })
                    if (busquedaU) {
                        nombreR = busquedaU.nombre;
                        cantidadDeMoneda = busquedaU.moneda;

                        if(cantidadDeMoneda < valor){
                            res.status(200).send({
                                message: 'No tiene monedas suficientes para participar'
                            });
                        }else{


                            Versus.findOne({ _id: idVersus }, (err, rep) => {
                                if (err) return res.status(500).send({ message: 'Error en la peticion' })
                                if (rep) {
                                    if (retadorId == rep.idRetador1 || retadorId == rep.idRetador2) {
                                        return res.status(200).send({ message: 'Usted ya esta inscrito en este Versus' })
                                    } else {
                                        cantidadDeMonedaFinal = cantidadDeMoneda - valor;
                                        User.findByIdAndUpdate(retadorId,{moneda: cantidadDeMonedaFinal},{new : true},(err, descuento)=>{
                                            if(err) return res.status(500).send({message : 'Erro en la peticion'})
                                            if(descuento){  
                                                Versus.findByIdAndUpdate(idVersus, { idRetador1: retadorId, nombreRetador1: nombreR }, { new: true }, (err, versusActualizado) => {
                                                    if (err) return res.status(500).send({ message: 'Error en la peticion' })
                                                    if (versusActualizado) {
                                                        return res.status(200).send({ Retador1: versusActualizado })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
    })
}


//--------------------------------------------------------------------------------------------------------
function addRetador2Paga(req, res) {
    var idVersus = req.params.id;
    var retadorId = req.user.sub;
    var valor;
    var cantidadDeMoneda;
    var cantidadDeMonedaFinal;
    var nombreR;
    

    Versus.findOne({ _id: idVersus }, (err, busqueda) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (busqueda) {
            valor = busqueda.valorEntrada;
            if (retadorId === busqueda.idCreador) {
                res.status(200).send({
                    message: 'Usted no puede particirpar en su propio versus'
                });
            } else {


                User.findOne({ _id: retadorId }, (err, busquedaU) => {
                    if (err) return res.status(500).send({ message: 'Error en la peticion' })
                    if (busquedaU) {
                        nombreR = busquedaU.nombre;
                        cantidadDeMoneda = busquedaU.moneda;

                        if(cantidadDeMoneda < valor){
                            res.status(200).send({
                                message: 'No tiene monedas suficientes para participar'
                            });
                        }else{
                            Versus.findOne({ _id: idVersus }, (err, rep) => {
                                if (err) return res.status(500).send({ message: 'Error en la peticion' })
                                if (rep) {
                                    if (retadorId == rep.idRetador1 || retadorId == rep.idRetador2) {
                                        return res.status(200).send({ message: 'Usted ya esta inscrito en este Versus' })
                                    } else {
                                        cantidadDeMonedaFinal = cantidadDeMoneda - valor;
                                        User.findByIdAndUpdate(retadorId,{moneda: cantidadDeMonedaFinal},{new : true},(err, descuento)=>{
                                            if(err) return res.status(500).send({message : 'Erro en la peticion'})
                                            if(descuento){  
                                                Versus.findByIdAndUpdate(idVersus, { idRetador2: retadorId, nombreRetador2: nombreR }, { new: true }, (err, versusActualizado) => {
                                                    if (err) return res.status(500).send({ message: 'Error en la peticion' })
                                                    if (versusActualizado) {
                                                        return res.status(200).send({ Retador2: versusActualizado })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
    })
}


//--------------------------------------------------------------------------------------------------------
function addRetador2Libre(req, res) {
    var idVersus = req.params.id;
    var retadorId = req.user.sub;
    var nombreR;

    Versus.findOne({ _id: idVersus }, (err, busqueda) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (busqueda) {
            if (retadorId === busqueda.idCreador) {
                res.status(200).send({
                    message: 'Ya esta participando'
                });
            } else {
                User.findOne({ _id: retadorId }, (err, busquedaU) => {
                    if (err) return res.status(500).send({ message: 'Error en la peticion' })
                    if (busquedaU) {
                        nombreR = busquedaU.nombre;
                        Versus.findOne({ _id: idVersus }, (err, rep) => {
                            if (err) return res.status(500).send({ message: 'Error en la peticion' })
                            if (rep) {
                                if ( retadorId == rep.idRetador2) {
                                    return res.status(200).send({ message: 'Usted ya esta inscrito en este Versus' })
                                } else {
                                    Versus.findByIdAndUpdate(idVersus, { idRetador2: retadorId, nombreRetador2: nombreR }, { new: true }, (err, versusActualizado) => {
                                        if (err) return res.status(500).send({ message: 'Error en la peticion' })
                                        if (versusActualizado) {
                                            return res.status(200).send({ Retador2: versusActualizado })
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            }
        }
    })
}

//--------------------------------------------------------------------------------------------------------
function addResultadoPaga(req, res) {
    var idVersus = req.params.id;
    var creadorId = req.user.sub;
    var params = req.body;
    var id1;
    var id2;
    var pRetador1;
    var pRetador2;
    var nombre1;
    var nombre2;
    var resultadoV;
    var ganador;
    var premio;
    var cantidadGanador;
    var cantidadCreador;
    var cantidadGanancia;
    var esta = 'FINALIZADO';
    var fondoNuevo;
    var monNueva;
    var monNuevaCreador;

    if (params.puntosRetador1 && params.puntosRetador2) {

            pRetador1 = params.puntosRetador1;
            pRetador2 = params.puntosRetador2;

        Versus.findOne({ _id: idVersus }, (err, busqueda) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion' })
            if (busqueda) {
                if (creadorId === busqueda.idCreador) {

                    if(busqueda.nombreRetador1 != 'VACANTE' && busqueda.nombreRetador2 != 'VACANTE'){
                        id1 = busqueda.idRetador1;
                        id2 = busqueda.idRetador2;
                        nombre1 = busqueda.nombreRetador1;
                        nombre2 = busqueda.nombreRetador2;
                        premio = busqueda.valorEntrada * 2;
    
                        //GANA EL RETADOR2
                    if((params.puntosRetador1*10) < (params.puntosRetador2*10)){
                        cantidadGanador = (premio * 80)/100 ; 
                        cantidadCreador = (premio * 15)/100 ;
                        cantidadGanancia = (premio * 5)/100 ;
                        resultadoV = pRetador1 + '-' + pRetador2
                        ganador = nombre2;
                        
                    Versus.findByIdAndUpdate(idVersus, { puntosRetador1: pRetador1, puntosRetador2: pRetador2, resultado: resultadoV,nombreGanador:ganador, estado: esta }, { new: true }, (err, versusActualizado) => {
                        if (err) return res.status(500).send({ message: 'Error en la peticion' })
                        if (versusActualizado) {


                            Ganancia.findOne({nombre:'Porcentaje10'},(err,resBG)=>{
                                if(err) return res.status(500).send({message: 'Error en la peticion'})
                                if(resBG){
                                    fondoNuevo = resBG.fondo + cantidadGanancia;
                                    Ganancia.findOneAndUpdate({nombre:'Porcentaje10'},{fondo:fondoNuevo},{new :true},(err,gananciaActualizada)=>{
                                        if(err) return res.status(500).send({message: 'Error en la peticion'})
                                        if(gananciaActualizada){
                                            
                                            User.findById(id2,(err,mon2)=>{
                                                if(err) return res.status(500).send({message: 'Error en la peticion'})
                                                if(mon2){
                                                    monNueva = mon2.moneda + cantidadGanador;
                                                    User.findByIdAndUpdate(id2, { moneda: monNueva }, { new: true }, (err, premioAdd)=>{
                                                        if(err) return res.status(500).send({message:'Error en la peticion'})
                                                        if(premioAdd){

                                                            User.findById(creadorId,(err,monCreador)=>{
                                                                if(err) return res.status(500).send({message: 'Error en la peticion'})
                                                                if(monCreador){
                                                                    monNuevaCreador = monCreador.moneda + cantidadCreador;
                                                                    User.findByIdAndUpdate(creadorId, { moneda: monNuevaCreador }, { new: true }, (err, gananciaCreador)=>{
                                                                        if(err) return res.status(500).send({message:'Error en la peticion'})
                                                                        if(gananciaCreador){
                                                                            /////
                                                                            return res.status(200).send({ Resultao: versusActualizado })
                                                                            /////
                                                                        }
                                                                    })
                                                                }
                                                            }) 

                                                        }
                                                    })
                                                }
                                            })               
                                        }
                                    })
                                }
                            })



                
                        }
                    })
    
                    }else if ((params.puntosRetador1*10) == (params.puntosRetador2*10)){  
                        ganador = "Empate";
                        res.status(200).send({message: 'Empate, tendra que haber un desempate'})
                    }else{
                        //GANA EL RETADOR1
                        cantidadGanador = (premio * 80)/100 ; 
                        cantidadCreador = (premio * 15)/100 ;
                        cantidadGanancia = (premio * 5)/100 ;
                        resultadoV = pRetador1 + '-' + pRetador2
                        ganador = nombre1;
                    Versus.findByIdAndUpdate(idVersus, { puntosRetador1: pRetador1, puntosRetador2: pRetador2, resultado: resultadoV,nombreGanador:ganador, estado: esta }, { new: true }, (err, versusActualizado) => {
                        if (err) return res.status(500).send({ message: 'Error en la peticion' })
                        if (versusActualizado) {

                            Ganancia.findOne({nombre:'Porcentaje10'},(err,resBG)=>{
                                if(err) return res.status(500).send({message: 'Error en la peticion'})
                                if(resBG){
                                    fondoNuevo = resBG.fondo + cantidadGanancia;
                                    Ganancia.findOneAndUpdate({nombre:'Porcentaje10'},{fondo:fondoNuevo},{new :true},(err,gananciaActualizada)=>{
                                        if(err) return res.status(500).send({message: 'Error en la peticion'})
                                        if(gananciaActualizada){
                                            
                                            User.findById(id1,(err,mon1)=>{
                                                if(err) return res.status(500).send({message: 'Error en la peticion'})
                                                if(mon1){
                                                    monNueva = mon1.moneda + cantidadGanador;
                                                    User.findByIdAndUpdate(id1, { moneda: monNueva }, { new: true }, (err, premioAdd)=>{
                                                        if(err) return res.status(500).send({message:'Error en la peticion'})
                                                        if(premioAdd){

                                                            User.findById(creadorId,(err,monCreador)=>{
                                                                if(err) return res.status(500).send({message: 'Error en la peticion'})
                                                                if(monCreador){
                                                                    monNuevaCreador = monCreador.moneda + cantidadCreador;
                                                                    User.findByIdAndUpdate(creadorId, { moneda: monNuevaCreador }, { new: true }, (err, gananciaCreador)=>{
                                                                        if(err) return res.status(500).send({message:'Error en la peticion'})
                                                                        if(gananciaCreador){
                                                                            /////
                                                                            return res.status(200).send({ Resultao: versusActualizado })
                                                                            /////
                                                                        }
                                                                    })
                                                                }
                                                            }) 

                                                        }
                                                    })
                                                }
                                            })               
                                        }
                                    })
                                }
                            })
                        }
                    })         
                    }  
                    } else{
                        res.status(200).send({
                            message: 'No puede agregar resultado sin tener todos los participante'
                        });
                    }
                } else {
                    res.status(200).send({
                        message: 'Solo el creador del Versus puede agregar los resultados'
                    });
                }
            }
        })
    } else {
        res.status(200).send({
            message: 'Rellene todos los campos necesarios'
        });
    }
}

//--------------------------------------------------------------------------------------------------------
function addResultadoLibre(req, res) {
    var idVersus = req.params.id;
    var creadorId = req.user.sub;
    var params = req.body;
    var pRetador1;
    var pRetador2;
    var resultadoV;
    var ganador;
    var esta = 'FINALIZADO'


     if (params.puntosRetador1 && params.puntosRetador2) {

        Versus.findOne({ _id: idVersus }, (err, busqueda) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion' })
            if (busqueda) {
                if (creadorId === busqueda.idCreador) {
                    if(busqueda.nombreRetador1 != 'VACANTE' && busqueda.nombreRetador2 != 'VACANTE'){
                        pRetador1 = params.puntosRetador1;
                        pRetador2 = params.puntosRetador2;
                        //GANA EL RETADOR2
                    if((params.puntosRetador1*10) < (params.puntosRetador2*10)){
                        resultadoV = pRetador1 + '-' + pRetador2
                        ganador = busqueda.nombreRetador2;

                        Versus.findByIdAndUpdate(idVersus,{puntosRetador1:pRetador1,puntosRetador2:pRetador2,resultado:resultadoV,nombreGanador:ganador,estado:esta},{new:true},(err,final)=>{
                            if (err) return res.status(500).send({message:'Error en la peticon'})
                            if(final){
                                res.status(200).send({Resultado:final})
                            }
                        })
                    }else if((params.puntosRetador1*10) == (params.puntosRetador2*10)){
                        ganador = "Empate";
                        res.status(200).send({message: 'Empate, tendra que haber un desempate'})
                    }else{
                        //GANA EL RETADOR1
                        resultadoV = pRetador1 + '-' + pRetador2
                        ganador = busqueda.nombreRetador1;
                        Versus.findByIdAndUpdate(idVersus,{puntosRetador1:pRetador1,puntosRetador2:pRetador2,resultado:resultadoV,nombreGanador:ganador,estado:esta},{new:true},(err,final)=>{
                            if (err) return res.status(500).send({message:'Error en la peticon'})
                            if(final){
                                res.status(200).send({Resultado:final})
                            }
                        })
                    }
                    }else{
                        res.status(200).send({
                            message: 'No puede agregar resultado sin tener todos los participante'
                        });
                    }
                } else {
                    res.status(200).send({
                        message: 'Solo el creador del Versus puede agregar los resultados '
                    });
                }
            }
        })
    }else {
        res.status(200).send({
            message: 'Rellene todos los campos necesarios'
        });
    }


}
//--------------------------------------------------------------------------------------------------------
function delVersus(req, res) {
    var idVersus = req.params.id;
    var creadorId = req.user.sub;

    Versus.findOne({ _id: idVersus }, (err, busqueda) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (busqueda) {
            if (creadorId === busqueda.idCreador) {
                Versus.findByIdAndRemove(idVersus, (err, versusEliminado) => {
                    if (err) return res.status(500).send({ message: 'Erro en la peticion' })
                    if (versusEliminado) {
                        res.status(200).send({
                            message: 'Se ha eliminado correctamente'
                        });
                    }
                })
            } else {
                res.status(200).send({
                    message: 'Solo el creador puede eliminar un Versus'
                });
            }
        }
    })

}
//--------------------------------------------------------------------------------------------------------

function getVersus(req, res) {
    var creadorId = req.user.sub;

    Versus.find({idCreador:{$ne:creadorId},estado:{$ne:'FINALIZADO'}},(err, listadoV) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion de usuarios' })
        if (listadoV.length >= 1) {
            return res.status(200).send({ lista: listadoV })
        } else {
            res.status(200).send({
                message: 'No se han agregado versus'
            });
        }

    })
    /*
    Versus.find({}, (err, listadoV) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (listadoV.length >= 1) {
            return res.status(200).send({ lista: listadoV })
        } else {
            res.status(200).send({
                message: 'No se han agregado versus'
            });
        }
    })*/
}
//--------------------------------------------------------------------------------------------------------
function getVersusCreador(req, res) {
    var creadorId = req.user.sub;

    Versus.find({ idCreador: creadorId }, (err, busqueda) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (busqueda.length >=1) {
            res.status(200).send({Listado: busqueda})
        }else{
            res.status(200).send({message: 'No ha creado ningun Versus'})
        }
    })

}

//--------------------------------------------------------------------------------------------------------
function getUnVersus(req, res) {
    var idVersus = req.params.id;
    Versus.findById(idVersus, (err, busqueda) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' },err)

        if (busqueda) {
        res.status(200).send({Resultado: busqueda});
        }
    })

}

//--------------------------------------------------------------------------------------------------------

function getVersusParticipando(req, res) {
    var creadorId = req.user.sub;

    Versus.find({$or: [
        { idRetador1: creadorId },
        { idRetador2: creadorId }
    ]},(err,busqueda)=>{
        if(err) return res.status(500).send({message: 'Error en la peticon'})
        if(busqueda.length >=1){
            res.status(200).send({Lista:busqueda})
        }else{
            res.status(200).send({message: 'No esta participando en ningun Versus'})
        }
    })

}

//--------------------------------------------------------------------------------------------------------

function getVersusLibre(req, res) {

Versus.find({tipoVersus:'Libre'},(err,busqueda)=>{
    if(err) return res.status(500).send({message:'Error en la peticion'})
    if(busqueda.length >=1){
        res.status(200).send({Lista:busqueda})
    }else{
        res.status(200).send({message: 'No hay versus de tipo libre'})
    }
})

}

//--------------------------------------------------------------------------------------------------------

function getVersusPaga(req, res) {

    Versus.find({tipoVersus:'Paga'},(err,busqueda)=>{
        if(err) return res.status(500).send({message:'Error en la peticion'})
        if(busqueda.length >=1){
            res.status(200).send({Lista:busqueda})
        }else{
            res.status(200).send({message: 'No hay versus de tipo paga'})
        }
    })
    
    }
//--------------------------------------------------------------------------------------------------------

module.exports = {
    addVersus,
    addRetador1Paga,
    addRetador2Paga,
    addRetador2Libre,
    addResultadoPaga,
    addResultadoLibre,
    
    delVersus,
    getVersus,
    getVersusCreador,
    getUnVersus,
    getVersusParticipando,
    getVersusLibre,
    getVersusPaga
}
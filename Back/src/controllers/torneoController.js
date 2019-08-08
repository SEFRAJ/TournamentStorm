'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var Torneo = require('../models/torneo');
var FaseTorneo = require('../models/faseTorneo');
var Ganancia = require('../models/Ganancia');
var jwt = require('../services/jwt');
var path = require('path');
var fs = require('fs');

function addTorneo(req, res) {
    var torneo = new Torneo();
    var params = req.body;
    var init;
    
    torneo.idUser = req.user.sub;
    torneo.nameUser = req.user.nombre;
    torneo.nameTorneo = params.nameTorneo;
    torneo.descripcion = params.descripcion;
    torneo.tipo = params.tipo;
    torneo.costo = params.costo;
    torneo.horario = params.horario;
    torneo.juego = params.juego;
    torneo.cantidad = params.cantidad;
    torneo.fase = 0;
    torneo.faseI = 0;
    torneo.faseA = 0;
    torneo.premioFinal = params.costo * params.cantidad;
    torneo.jugadores = [],
    torneo.go = false;
    torneo.creativo = params.creativo;

    Torneo.find({
        $or: [
            { nameTorneo: torneo.nameTorneo}
        ]
    }).exec((err, users) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion de usuarios' },err);

        if (users && users.length >= 1) {
            return res.status(200).send({ message: 'El torneo ya existe' });
        } else {
                torneo.save((err, torneoS) => {
                    if (err) return res.status(500).send({ message: 'Error al guardar el torneo' });

                    if (torneoS) {
                        switch(torneoS.cantidad){
                            case 4:
                                addFase(torneoS._id, 2);
                                addFase(torneoS._id, 1);
                                init = 2;
                                break;
                            case 8:
                                addFase(torneoS._id, 3);
                                addFase(torneoS._id, 2);
                                addFase(torneoS._id, 1);
                                init = 3;
                                break;
                            case 16:
                                addFase(torneoS._id, 4);
                                addFase(torneoS._id, 3)
                                addFase(torneoS._id, 2);
                                addFase(torneoS._id, 1);
                                init = 4;
                                break;
                        }
                        torneo.fase = init;
                        torneo.faseI = init;
                        torneo.faseA = init;
                        torneo.save();
                        res.status(200).send({ torneoS })
                    } else {
                        res.status(200).send({ message: 'no se ha crear el torneo' });
                    }
                });
        }
    });
}
function addFase(id, fase) {
    var faseTorneo = new FaseTorneo();    
    faseTorneo.idTorneo = id;
    faseTorneo.fase= fase;
    faseTorneo.jugadores = [];
    faseTorneo.resultados = [];
    faseTorneo.ganadores = [];
    faseTorneo.perdedores = [];

        faseTorneo.save();
}
function addUser(req, res){
    var params = req.body;
    var ver = false;
    var jugador = { id: params.idj, nombre: params.jugador, puntosA: 0,puntosE: 0, go: false}


    Torneo.findById( req.params.id, (err,found)=>{
        if(err) return res.status(500).send({ message: 'Error al guardar el torneo 1' });
        if(found){
            for (let x = 0; x < found.jugadores.length; x++) {
                const element = found.jugadores[x].id;
                    if(params.idj === element){
                        ver= true;
                    }       
            }
            if(ver==false){
                found.jugadores.push(jugador);
                console.log(found);
                found.save((err, torneoS) => {
                    if (err) return res.status(500).send({ message: 'Error al guardar el torneo 2' });
            
                    if (torneoS){
                        console.log(found.costo);
                        User.findById(params.idj, (err,u)=>{
                            if(u){
                                u.moneda = u.moneda - found.costo;
                                console.log(u.moneda);
                                u.save();
                            }
                        });
                     res.status(200).send({ torneoS });}
                    
                });   
            }else{
               res.status(200).send({ message: 'Usuario ya registrado'});
            }
        }
    });
}
function initTorneo(req, res){
    var params = req.body;

    Torneo.findById( req.params.id, (err,found)=>{
        if(err) return res.status(500).send({ message: 'Error al guardar el torneo' });
        if(found){
            found.go = true;
                if(found.cantidad == found.jugadores.length){
                FaseTorneo.findOne({$and: [{idTorneo: found._id}, {fase:found.faseA}]}).exec((err,founda)=>{
                    if(err) return res.status(500).send({ message: 'Error al guardar el torneo 2' });
                    if(founda){

                            
                            founda.jugadores = found.jugadores;
                            
     
                            founda.resultados = [];
                            found.save();
                            founda.save((err, torneoS) => {
                                if (err) return res.status(500).send({ message: 'Error al guardar el torneo' });
                        
                                if (torneoS) 
                                
                                res.status(200).send({ torneoS });
                            });  
                    }
                });
                
            }else{
                res.status(200).send({ message: 'Participantes incompletos' });
            }
        }
    });
}
function addResultado(req, res){
    var params = req.body;
    var uno;
    var dos;
    var uno1;
    var dos2;
    var jugador1 = { id: params.j1, nombre: params.n1, puntosA: 0, puntosE: 0, go: false}
    var jugador2 = { id: params.j2, nombre: params.n2, puntosA: 0, puntosE: 0, go: false}
    var jugador11 = { id: params.j1, nombre: params.n1, puntosA: params.p1, puntosE: params.p2, go: true}
    var jugador22 = { id: params.j2, nombre: params.n2, puntosA: params.p2, puntosE: params.p1, go: true}

    Torneo.findById( req.params.id, (err,found)=>{
        if(err) return res.status(500).send({ message: 'Error al guardar el torneo' });
        if(found){

                FaseTorneo.findOne({$and: [{idTorneo: found._id}, {fase:found.faseA}]}).exec((err,founda)=>{
                    if(err) return res.status(500).send({ message: 'Error al guardar el torneo 2' });
                    if(founda){
                        console.log()
                        for (let index = 0; index < found.jugadores.length; index++) {
                            const element = found.jugadores[index].id ;
                            if(params.j1 === element){
                                uno= index;
                            }   
                            if(params.j2 === element){
                                dos= index;
                            }     
                        }                            
                            found.jugadores[uno].puntosA = found.jugadores[uno].puntosA + params.p1;
                            found.jugadores[dos].puntosA = found.jugadores[dos].puntosA + params.p2;

                            found.jugadores[uno].puntosE = found.jugadores[uno].puntosE + params.p2;
                            found.jugadores[dos].puntosE = found.jugadores[dos].puntosE + params.p1;

                            found.save();

                            for (let index = 0; index < founda.jugadores.length; index++) {
                                const element = founda.jugadores[index].id ;
                                if(params.j1 === element){
                                    uno1= index;
                                }   
                                if(params.j2 === element){
                                    dos2= index;
                                }     
                            }  
                            founda.jugadores[uno1] = jugador11;
                            founda.jugadores[dos2] = jugador22;
                            

                            if(params.p1>params.p2){
                                founda.ganadores.push(jugador1);
                                founda.perdedores.push(jugador2);
                            }
                            if(params.p1<params.p2){
                                founda.ganadores.push(jugador2);
                                founda.perdedores.push(jugador1);
                            }
                            console.log(founda);
                            FaseTorneo.findOneAndUpdate({$and: [{idTorneo: found._id}, {fase:found.faseA}]}, founda, { new: true }, (err, fase) => {
                                if (err) return res.status(500).send({ message: 'Error al guardar el torneo' });
                        
                                if (fase) res.status(200).send({ fase });
                            });  
                    }
                });
        }
    });
}
function avaTorneo(req, res){
    var params = req.body;
    var fase;
    Torneo.findById( req.params.id, (err,found)=>{
        if(err) return res.status(500).send({ message: 'Error al guardar el torneo' });
        if(found){
            fase= found.faseA - 1;
            FaseTorneo.findOne({$and: [{idTorneo: found._id}, {fase:found.faseA}]}).exec((err,founds)=>{
                if(err) return res.status(500).send({ message: 'Error al guardar el torneo 2' });
                if(founds){
                    
                    console.log(fase)
                    FaseTorneo.findOne({$and: [{idTorneo: found._id}, {fase:fase}]}).exec((err,founda)=>{
                        if(err) return res.status(500).send({ message: 'Error al guardar el torneo 3' });
                        if(founda){
               
                                founda.jugadores = founds.ganadores;
                                
                                founda.resultados = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                                console.log(founda)
                                founda.save((err, torneo) => {
                                    if (err) return res.status(500).send({ message: 'Error al guardar el torneo' });
                                });  
                        }
                    });
                }});
            found.faseA = fase;
            found.save((err, torneoS) => {
                if (err) return res.status(500).send({ message: 'Error al guardar el torneo' });
                if(torneoS) return res.status(200).send({ torneoS }); 
            });
        }
    });
}
function endTorneo(req, res){
    var params = req.body;
    var premio;
    var premio2;
    var ganancia = new Ganancia();
    Torneo.findById( req.params.id, (err,found)=>{
        if(err) return res.status(500).send({ message: 'Error al guardar el torneo' });
        if(found){
            if(found.faseA == 1){
                FaseTorneo.findOne({$and: [{idTorneo: found._id}, {fase:found.faseA}]}).exec((err,founds)=>{
                    if(err) return res.status(500).send({ message: 'Error al guardar el torneo 2' });
                    if(founds){
                        if(found.tipo == true){
                            premio = found.premioFinal * 0.75;
                            premio2 = found.premioFinal * 0.05;
    
                            User.findById(founds.ganadores[0], (err,us)=>{
                                if(us){

                                    us.moneda = us.moneda + premio;
    
                                    us.save();
                                }
                            });
                            User.findById(found.idUser, (err,uss)=>{
                                if(uss){
                                    uss.moneda = uss.moneda + premio2;
                                    uss.save();
                                }
                            });
                            Ganancia.findById('5d41a1ad72b0e813f0f863a1', (err,u)=>{
                                if(u){
                                    u.fondo = u.fondo + found.premioFinal * 0.10;
                                    console.log(u.fondo);
                                    u.save();
                                    if(u) return res.status(200).send({ u });
                                }
                            });
                        }
                    }
                });
            }
        }
    });
}
function getTorneo(req, res) {
    Torneo.findById(req.params.id, (err, torneos) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
         if(torneos){ return res.status(200).send({ torneos })
        }
    })
}
function getFase(req, res) {
    var params = req.body;
    FaseTorneo.findOne({$and: [{idTorneo: req.params.id} , {fase: params.fase}]}, (err, torneos) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
         if(torneos){ return res.status(200).send({ torneos })
        }
    })
}
function getTorneos(req, res) {
    Torneo.find({}, (err, torneos) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (torneos.length >= 1) {
            return res.status(200).send({ torneos })
        } else {
            res.status(200).send({
                message: 'No se han agregado torneos'
            });
        }
    })
}
function getMisTorneos(req, res) {
    Torneo.find({idUser: req.params.id}, (err, torneos) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
         if(torneos){ return res.status(200).send({ torneos })
        }
    })
}
function getCodigo(req, res){

    Torneo.findById(req.params.id, (err, torneos) => {
        if (err) return res.status(200).send({ message: 'Codigo Invalido' })
         if(torneos){ 
             return res.status(200).send({ torneos })
            }
        
    })
}
function getTorneosPrivados(req, res){
    var retur = [];
   
    User.findById(req.params.id, (err, user) => {
        if (err) return res.status(200).send({ message: 'Codigo Invalido' })
        if(user){
        
            for (let index = 0; index < user.amigos.length; index++) {
                const element = user.amigos[index];
                Torneo.find({idUser: element}, (err, torneo) => {
                    if (err) return res.status(500).send({ message: 'Error en la peticion' })
                     if(torneo.length >= 1){ 
                         
                         retur.unshift(torneo);
                         console.log(retur) 
                         return res.status(200).send({torneo}) 
                                    
                    }
                })      
            }
            
        }else
        return res.status(200).send({message: 'Agrega amigos o no hay torneos de tus amigos'})   
    })
}

module.exports = {
    addTorneo,
    addUser,
    initTorneo,
    addResultado,
    avaTorneo,
    endTorneo,
    getTorneo,
    getTorneos,
    getFase,
    getCodigo,
    getMisTorneos,
    getTorneosPrivados
}
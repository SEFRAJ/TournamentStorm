'use strict'

var bcrypt = require('bcrypt-nodejs');
var Foro = require('../models/foro');
var jwt = require('../services/jwt');
var path = require('path');
var fs = require('fs');

//--------------------------------------------------------------------------------------------------------

function registrarForo(req, res) {
    var foro = new Foro();
    var params = req.body;

    if (params.titulo && params.descripcion ) {
        foro.titulo = params.titulo;
        foro.descripcion = params.descripcion;
        foro.idCreador = req.user.sub
       
        Foro.find({
            $or: [
                { titulo: foro.titulo.toLowerCase() },
                { titulo: foro.titulo.toUpperCase() },
            ]
        }).exec((err, forums) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion de usuarios' },err);

            if (forums && forums.length >= 1) {
                return res.status(500).send({ message: 'Ya existe un foro con el mismo titulo' });
            } else {
                

                    foro.save((err, foroCreated) => {
                        if (err) return res.status(500).send({ message: 'Error al guardar el foro' });

                        if (foroCreated) {
                            res.status(200).send({ foro: foroCreated })
                        } else {
                            res.status(404).send({ message: 'no se ha registrado el foro' });
                        }
                    });
            }
        });
    } else {
        res.status(200).send({
            message: 'Rellene todos los campos necesarios'
        });
    }

}

//--------------------------------------------------------------------------------------------------------


function editarForo(req, res) {
    var userId = req.user.sub;
    var params = req.body;
    var foroId = req.params.id


    if (userId != req.user.sub) {
    return res.status(500).send({ message: 'no tiene los permisos para actualizar los datos de este foro' })
    }

    Foro.findByIdAndUpdate(foroId, params, { new: true }, (err, foroActualizado) => {
        if (err) return res.status(500).send({ message: 'error en la peticion' })

        if (!foroActualizado) return res.status(404).send({ message: 'no se a podido actualizar los datos del foro' })

        return res.status(200).send({ foro: foroActualizado })
    })
}

//--------------------------------------------------------------------------------------------------------

function eliminarForo(req, res){
    var foroId = req.params.id

    Foro.findByIdAndDelete(foroId,(err, foroDeleted)=>{
        if (err) return res.status(500).send({ message: 'error en la peticion' })

        if (!foroDeleted) return res.status(404).send({ message: 'no se a podido eliminar el registro' })

        return res.status(200).send({message: 'Se ha eliminado correctamente el foro' })
    })

}

//-----------------------------------------------------------------------------------------------------------------

function getForos(req, res) {
    Foro.find({}, (err, listadoF) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (listadoF.length >= 1) {
            return res.status(200).send({ foros: listadoF })
        } else {
            res.status(200).send({
                message: 'No se han agregado foros'
            });
        }
    })
}

//---------------------------------------------------------------------------------------------------------------

function getForo(req,res){

    var foroId = req.params.id

    Foro.findById(foroId,(err, foro)=>{
        if (err) return res.status(500).send({ message: 'error en la peticion' })

        if (!foro) return res.status(404).send({ message: 'no se a podido encontrar el registro' })

        return res.status(200).send({foro: foro })
    })

}

//-----------------------------------------------------------------------------------------------------------------
function buscarUsuario(req, res) {

    var dato = req.body.dato;
    User.find({usuario: {$regex:dato, $options:"i"}}, (err, users) => {
        if (err) return res.status(404).send({ message: 'Error al buscar usuarios', err });
         
        if (users.length >= 1) {
            return res.status(200).send({ User:users });
            
        }else{
          return res.status(404).send({message:'No hay coincidencias'});
        }   
         
    });
}

function misForos(req,res){

    var myId = req.user.sub

    Foro.find({idCreador: myId},(err, foro)=>{
        if (err) return res.status(500).send({ message: 'error en la peticion' })

        if (!foro) return res.status(404).send({ message: 'no se a podido encontrar el registro' })

        return res.status(200).send({foro: foro })
    })

}
//--------------------------------------------------------------------------------------------------------


module.exports = {
    registrarForo,
    editarForo,
    eliminarForo,
    getForo,
    getForos,
    misForos
    
}
'use strict'

var bcrypt = require('bcrypt-nodejs');
var Publicacion = require('../models/publicacion');
var moment = require('moment')

var User = require('../models/user')
var jwt = require('../services/jwt');
var path = require('path');
var fs = require('fs');

//--------------------------------------------------------------------------------------------------------

function registrarPublicacion(req, res) {
    var publicacion = new Publicacion();
    var params = req.body;

    if (params.comentario ) {
        publicacion.comentario = params.comentario;
        publicacion.idForo = req.params.id;
        publicacion.nombreUsuario = req.user.nombre
        publicacion.fecha = moment().unix()

                    publicacion.save((err, publicacionCreada) => {
                        if (err) return res.status(500).send({ message: 'Error al guardar la publicacion' });

                        if (publicacionCreada) {
                            res.status(200).send({ publicacion: publicacionCreada })
                        } else {
                            res.status(404).send({ message: 'no se ha registrado la publicacion' });
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

    Publicacion.findByIdAndUpdate(foroId, params, { new: true }, (err, foroActualizado) => {
        if (err) return res.status(500).send({ message: 'error en la peticion' })

        if (!foroActualizado) return res.status(404).send({ message: 'no se a podido actualizar los datos del foro' })

        return res.status(200).send({ foro: foroActualizado })
    })
}

//--------------------------------------------------------------------------------------------------------

function eliminarForo(req, res){
    var foroId = req.params.id

    Publicacion.findByIdAndDelete(foroId,(err, foroDeleted)=>{
        if (err) return res.status(500).send({ message: 'error en la peticion' })

        if (!foroDeleted) return res.status(404).send({ message: 'no se a podido eliminar el registro' })

        return res.status(200).send({message: 'Se ha eliminado correctamente el foro' })
    })

}

//-----------------------------------------------------------------------------------------------------------------

function getPublicaciones(req, res) {
    var idForo = req.params.id
    Publicacion.find({idForo:idForo}, (err, listadoP) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (listadoP.length >= 1) {
            return res.status(200).send({ publicaciones: listadoP })
        } else {
            res.status(200).send({
                message: 'No se han agregado publicaciones'
            });
        }
    })
}



//---------------------------------------------------------------------------------------------------------------

function getForo(req,res){

    var foroId = req.params.id

    Publicacion.findById(foroId,(err, foro)=>{
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

//--------------------------------------------------------------------------------------------------------


module.exports = {
    registrarPublicacion,
    editarForo,
    eliminarForo,
    getForo,
    getPublicaciones
    
}
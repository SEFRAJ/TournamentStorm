'use strict'

var Solicitud = require('../models/solicitud');
var User = require('../models/user');

//---------------------------------------------------------------------------------

function solicitud(req,res) {
    var miId = req.user.sub;
    var idReceptor = req.params.id;
    var solicitud = new Solicitud();

    User.findById( miId, (err, user) =>{
        if(err) return res.status(500).send({message:'error en la peticion', err})

        if(user){
            solicitud.emisorId = miId;
            solicitud.emUsuario = user.usuario;
            solicitud.emImage = user.image;
            solicitud.receptorId = idReceptor;
            solicitud.estado = null;

            Solicitud.find({ emisorId: miId, receptorId: idReceptor },(err, solicitudes) => {

                if (err) return res.status(500).send({ message: 'Error en la peticion de solicitudes',err });
    
                if (solicitudes.length >= 1) {
                    console.log(solicitudes);
                    return res.status(200).send({ message: 'Ya se ha enviado una solicitud' });
                } else {

                    solicitud.save((err, solicitudStored) => {

                        if (err) return res.status(500).send({ message: 'Error al guardar la solicitud' });
    
                        if (solicitudStored) {
                            res.status(200).send({ message: 'solicitud enviada - creada CORRECTAMENTE' })
                        } else {
                                res.status(404).send({ message: 'no se ha podido guardar la colicitud' });
                        }
                    });

                }
            });
        }
    })
}

//---------------------------------------------------------------------------------

function agregarAmigos(req,res){
    var miId = req.user.sub;
    var solicitud = req.params.idSolicitud;
    var emisor;

        User.findById( miId , (err, user) =>{   //se hace el find para lograr entrar al arreglo de amigos
            if(err) return res.status(500).send({message:'error en la peticion - agregar amigos 1', err})
    
            if(user){
 
                Solicitud.findById( solicitud, (err,found)=>{

                    if(err) return res.status(500).send({message: 'error en la peticion de envio DS',err})

                    if(found){
                        emisor = found.emisorId;

                        console.log(emisor)
                        User.findById(emisor, (err,applicant)=>{
                            if(err) return res.status(500).send({message:'error en la peticion - agregar amigos 2', err})
            
                            if(applicant){

                                user.amigos.push(emisor);
                                user.save();
                                applicant.amigos.push(miId);
                                applicant.save();

                                Solicitud.findByIdAndDelete( solicitud, (err, deleted)=>{
                                    if(err) return res.status(500).send({message: 'error en la peticion - descarte',err})
                        
                                    if(deleted){
                                        return res.status(200).send({message:'amigo agregado correctamente'})
                                    }else{
                                        return res.status(404).send({message:'error al eliminar la solicitud-1'})
                                    }
                                })

                            }
                        })

                    }else{

                        return res.status(404).send({message: 'no se encontro la solicitud, Existe?'})

                    }
                })
    
            }else{
                return res.status(404).send({message: 'no se ha podido agregar el amigo XD'})
            }
    
        })

}
//---------------------------------------------------------------------------------

function eliminarSolicitud(req,res) {

    var solicitud = req.params.idSolicitud;

    Solicitud.findByIdAndDelete( solicitud, (err, deleted)=>{
        if(err) return res.status(500).send({message: 'error en la peticion - descarte',err})

        if(deleted){
            return res.status(200).send({message:'Solicitud eliminada correctamente'})
        }else{
            return res.status(404).send({message:'error al eliminar la solicitud-2'})
        }
    })

}

//---------------------------------------------------------------------------------

function misSolicitudes(req,res) {
    var miId = req.user.sub;
    
    Solicitud.find( {receptorId:miId}, (err,solicitudes) =>{

        if(err) return res.status(500).send({message: 'error en la peticion - listarS',err})

        if(solicitudes.length >= 1){
            return res.status(200).send({Solicitud:solicitudes})
        }else{
            return res.status(500).send({message:'No hay solicitudes de amistad'})
        }
    })
}

//---------------------------------------------------------------------------------

module.exports = {
 
    solicitud,
    agregarAmigos,
    eliminarSolicitud,
    misSolicitudes
}
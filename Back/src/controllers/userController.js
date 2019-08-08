'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');
var path = require('path');
var fs = require('fs');

//--------------------------------------------------------------------------------------------------------

function registrarUsuario(req, res) {
    var user = new User();
    var params = req.body;

    if (params.nombre && params.email && params.password) {
        user.nombre = params.nombre;
        user.usuario = params.usuario;
        user.email = params.email;
        user.password = params.password;
        user.amigos = [];
        user.image = null;
        user.moneda = 300;

        User.find({
            $or: [
                { email: user.email.toLowerCase() },
                { email: user.email.toUpperCase() },
                { usuario: user.usuario.toUpperCase() },
                { usuario: user.usuario.toLowerCase() }
            ]
        }).exec((err, users) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion de usuarios' },err);

            if (users && users.length >= 1) {
                return res.status(500).send({ message: 'El usuario ya existe' });
            } else {
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash;

                    user.save((err, userStored) => {
                        if (err) return res.status(500).send({ message: 'Error al guardar el usuario' });

                        if (userStored) {
                            res.status(200).send({ user: userStored })
                        } else {
                            res.status(404).send({ message: 'no se ha registrado el usuario' });
                        }
                    });
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

//--------------------------------------------------------------------------------------------------------
function addComprar(req, res){
    var params = req.body;

        User.findOne({            $and: [
            { id: params.id },
            { usuario: params.usuario }
        ]},(err, user) => {
            if (err) return res.status(500).send({ message: 'error en la peticion' })
    
            if (!user) return res.status(404).send({ message: 'no se a podido actualizar los datos del usuario1' })
            console.log(user.moneda)
            if((user.moneda + 25) < monedas){
                console.log(user)
                return res.status(200).send({ user })
            }
            User.findOneAndUpdate({$and: [
                { od: params.id },
                { usuario: params.usuario }
            ]}, { moneda: user.moneda + 25}, { new: true }, (err, moneda) => {
                if (err) return res.status(500).send({ message: 'error en la peticion' })
        
                if (!moneda) return res.status(404).send({ message: 'no se a podido actualizar los datos del usuario2' })
        })
    })
}

//--------------------------------------------------------------------------------------------------------

function login(req, res) {
    var params = req.body;
    var email2 = params.email;
    var password = params.password;

    User.findOne({ email: email2 }, (err, user) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })

        if (user) {
            bcrypt.compare(password, user.password, (err, check) => {
                if (check) {
                    if (params.gettoken) {
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        })
                    } else {
                        user.password = undefined;
                        return res.status(200).send({ user })
                    }
                } else {
                    return res.status(404).send({ message: 'el usuario no se a podido identificar',err })
                }
            });
        } else {
            return res.status(404).send({ message: 'el usuairo no se a podido logear' })
        }
    });
}

//--------------------------------------------------------------------------------------------------------
// para buscar y agregar amigos---------------------------

//{age:{$ne:30}}

function usuariosDisponibles(req, res) {

    var miId = req.user.sub;

    User.find({_id:{$ne:miId}},(err, usuarioencontrado) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion de usuarios' });


        if (usuarioencontrado.length >= 1) {
            return res.status(200).send({ usuariosDisponibles: usuarioencontrado })           
        } else {
            return res.status(400).send({ message: 'No se han encontrado usuarios' });
        }

    })
}

//--------------------------------------------------------------------------------------------------------

function amigos(req,res){
    var miId = req.user.sub;

    User.find({amigos:miId}, (err,amigos) =>{
            if (err) return res.status(500).send({ message: 'Error en la peticion de listar Ami', err });
            
            if(amigos.length >=1){
                return res.status(200).send({Amigos:amigos})
            }else{
                return res.status(404).send({message:'No hay amigos agregados'})
            }
        })

}

//--------------------------------------------------------------------------------------------------------

function subirImagen(req, res) {
    var userId = req.params.id;

    if (req.files) {
        var file_path = req.files.image.path;
        console.log(file_path);

        var file_split = file_path.split('\\');
        console.log(file_split);

        var file_name = file_split[3];
        console.log(file_name);

        var ext_split = file_name.split('\.');
        console.log(ext_split);

        var file_ext = ext_split[1];
        console.log(file_ext);

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            User.findByIdAndUpdate(userId, { image: file_name }, { new: true }, (err, usuarioActualizado) => {
                if (err) return res.status(500).send({ message: ' no se a podido actualizar el usuario' })

                if (!usuarioActualizado) return res.status(404).send({ message: 'error en los datos del usuario, no se pudo actualizar' })

                return res.status(200).send({ user: usuarioActualizado });
            })
        } else {
            return removeFilesOfUploads(res, file_path, 'extension no valida')
        }

    }
}

//--------------------------------------------------------------------------------------------------------

function removeFilesOfUploads(res, file_path, message) {
    fs.unlink(file_path, (err) => {
        return res.status(200).send({ message: message })
    })
}

//--------------------------------------------------------------------------------------------------------

function obtenerImagen(req, res) {
    var image_file = req.params.nombreImagen;
    var path_file = './src/uploads/users/' + image_file;

    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'no existe la imagen' })
        }
    });
}

//--------------------------------------------------------------------------------------------------------

function editarUsuario(req, res) {
    var userId = req.user.sub;
    var params = req.body;

    delete params.password;

    if (userId != req.user.sub) {
    return res.status(500).send({ message: 'no tiene los permisos para actualizar los datos de este usuario' })
    }

    User.findByIdAndUpdate(userId, params, { new: true }, (err, usuarioActualizado) => {
        if (err) return res.status(500).send({ message: 'error en la peticion' })

        if (!usuarioActualizado) return res.status(404).send({ message: 'no se a podido actualizar los datos del usuario' })

        return res.status(200).send({ user: usuarioActualizado })
    })
}

//--------------------------------------------------------------------------------------------------------
function eliminarAmigo(req, res) {

    var miId = req.user.sub;
    var amigoId = req.params.amigoId;

    User.findById(miId, (err, deletedFriend)=>{
        if(err) return res.status(500).send({message:'error en la peticion - eliminarAm', err});

        if(deletedFriend){
            var misAmigos = deletedFriend.amigos;

            for (let i = 0; i < misAmigos.length; i++) {
                if(misAmigos[i] == amigoId){
                    misAmigos.splice(i,1);
                }                
            }

            User.findById(amigoId, (err,deleted)=>{
                if(err) return res.status(500).send({message:'error en la peticion - eliminarAm-2', err});

                if(deleted){
                    var amigos = deleted.amigos;

                    for (let i = 0; i < amigos.length; i++) {
                        if(amigos[i] == miId){
                            amigos.splice(i,1);
                        }       
                    }

                    deletedFriend.save();
                    deleted.save();

                    return res.status(200).send({message:'Amigo eliminado CORRECTAMENTE'})

                }
            })
        }else{
            return res.status(404).send({message:'no se pudo gestionar la eliminacion en los Arreglos - AMIGOS'})
        }
    })

    
}

//--------------------------------------------------------------------------------------------------------

function usuarios(req,res) {

    User.find({}, (err, users)=>{
        if(err) return res.status(500).send({message:'error en la peticion de listar Usaurios'});

        if(users.length >=1 ){
            return res.status(200).send({Users:users})
        }else{
            return res.status(404).send({message:'No hay usuarios'});
        }
    })
    
}

//--------------------------------------------------------------------------------------------------------


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

function addMonedas(req, res) {
    var idUsuario =  req.user.sub;
    var params = req.body;
    var sumaMoneda = parseInt( params.moneda);
    var monedaActual
    var cantidadDeMonedaFinal

    User.findOne({_id:idUsuario},(err,busqueda)=>{
        if(err) return res.status(500).send({message:'Error en la peticion'})
        if(busqueda){
            monedaActual = busqueda.moneda;
            cantidadDeMonedaFinal =  monedaActual + sumaMoneda ;
            User.findByIdAndUpdate(idUsuario,{moneda: cantidadDeMonedaFinal},{new : true},(err, userActualizado)=>{
                if(err) return res.status(500).send({message: 'Error en la peticion'})
                if (userActualizado) {
                    return res.status(200).send({ MonedasAgregadas: userActualizado })
                }
            })
        }
    })
}

//--------------------------------------------------------------------------------------------------------
function restarMonedas(req, res) {
    var idUsuario =  req.user.sub;
    var params = req.body;
    var restaMoneda = parseInt( params.moneda);
    var monedaActual
    var cantidadDeMonedaFinal

    User.findOne({_id:idUsuario},(err,busqueda)=>{
        if(err) return res.status(500).send({message:'Error en la peticion'})
        if(busqueda){
            monedaActual = busqueda.moneda;
            if(restaMoneda > monedaActual){
                res.status(200).send({message:'No tiene monedas Suficientes'})
            }else{
                cantidadDeMonedaFinal =  monedaActual - restaMoneda ;
                User.findByIdAndUpdate(idUsuario,{moneda: cantidadDeMonedaFinal},{new : true},(err, userActualizado)=>{
                    if(err) return res.status(500).send({message: 'Error en la peticion'})
                    if (userActualizado) {
                        return res.status(200).send({ MonedasRestadas: userActualizado })
                    }
                })
            }
        }
    })
}

//--------------------------------------------------------------------------------------------------------

module.exports = {
    registrarUsuario,
    addComprar,
    login,

    editarUsuario,
    usuariosDisponibles,
    usuarios,

    amigos,

    subirImagen,
    obtenerImagen,
 
    buscarUsuario,

    eliminarAmigo,
    
    addMonedas,
    restarMonedas
}
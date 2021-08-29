const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require('../model/usuario')

const validarJwt = async (req = request, res = response, next) =>{
    const  TOKEN = req.header('x-token')

    if(!TOKEN){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {

        //Obtengo el uid del payload
        const {uid} = jwt.verify(TOKEN, process.env.SECRET_KEY)

        //Leer el usuario que corresponde al uid

        const usuario = await Usuario.findById(uid)
        
        
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido - El usuario no existe en DB'
            })
        }
        
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido - usuario inactivo'
            })
        }


        req.usuario = usuario

        //Continuo con el siguiente middleware
        next()
        
    } catch (error) {

        console.log(error)

        return res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = { validarJwt}
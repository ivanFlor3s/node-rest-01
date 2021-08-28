const { request, response } = require("express");
const jwt = require('jsonwebtoken');

const validarJwt = (req = request, res = response, next) =>{
    const  TOKEN = req.header('x-token')

    if(!TOKEN){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {

        //Obtengo el uid del payload
        const {uid} = jwt.verify(TOKEN, process.env.SECRET_KEY)

        //Agrego uid en la request
        req.uid = uid

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
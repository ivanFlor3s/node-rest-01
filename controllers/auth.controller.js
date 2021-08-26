const { response, request } = require("express");
const Usuario = require('../model/usuario')
const bcryptjs = require('bcryptjs');

const login = async ( req = request, res = response) => {
    const {correo, password} = req.body

    const usuario = await Usuario.findOne({correo})
    
    //Verificar que el correo exista
    if(!usuario){
        return res.status(404).json({
            msg: 'Usuario not found - correo'
        })
    }

    //Validar que el usuario este ctivo
    if(!usuario.estado){
        return res.status(400).json({
            msg: 'El usuario esta inactivo - estado'
        })
    }

    // Validar que la contrasenia coincida
    const validPassword = bcryptjs.compareSync(password, usuario.password )
    if(!validPassword){
        return res.status(400).json({
            msg:'Error en usaurio - password'
        })
    }

    res.json({
        msg: 'Login OK'
    })
}

module.exports = {
    login
}

const { response, request } = require("express");
const { isValidObjectId } = require("mongoose");
const { Usuario } = require("../model");

const coleccionPermitidas = [
    'categoria',
    'usuarios',
    'productos',
    'roles'
]

const buscarUsuario = async (termino= '', res = response) =>{

    const esMongoId = isValidObjectId(termino)

    if(esMongoId){
        const usuario = await Usuario.findById(termino)
        res.json({
            results: usuario ? [usuario] : []
        })
    }
}

const buscar = (req = request, res = response) => {

    const {coleccion, termino} = req.params

    if(!coleccionPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las correcciones permitidas son: ${coleccionPermitidas}`
        })
    }

    switch (coleccion){
        case 'categoria':

        break;

        case 'usuarios':
            buscarUsuario(termino, res)
        break;

        case 'productos':

        break;

        default: 
            res.status(400).json({
                msg: 'Coleccion busqueda Not implemented'
            })

    }
}

module.exports = {
    buscar
}
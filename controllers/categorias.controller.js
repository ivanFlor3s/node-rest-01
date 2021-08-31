const { request, response } = require("express");
const Categoria = require('../model/categoria')

const crearCategoria = async(req = request, resp = response) =>{
    const nombre = req.body.nombre.toUpperCase()

    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB){
        return resp.status(400).json({
            msg: 'La categoria ya existe'
        })
    }

    //generar la data a guardar

    const data = {
        nombre, 
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data)
    
    //Guardar en DB
    await categoria.save()

    resp.status(201).json(categoria)
}

module.exports = {
    crearCategoria
}
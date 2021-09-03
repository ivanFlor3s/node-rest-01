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

const obtenerCategorias = async (req = request, resp = response) => {

    const {desde = 0, limite = 5 } = req.query

    const query = { estado: true }

    const categorias = await Categoria.find(query)
        .skip(Number(desde))
        .limit(Number(limite))

    return resp.json({
        categorias
    })

}

//TODO  OBTENER CATEGORIA - populate

const obtenerCategoria = async (req = request, res = response) => {
    const id = req.params.id
    
    const categoria = await Categoria.findById(id)
        .populate('usuario')

   

    return res.json({
        categoria
    })

}

//TODO  ACTUALIZAR CATEGORIA 

//TODO BORRAR CATEGORIA - cambiar estado

module.exports = {
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias,
}
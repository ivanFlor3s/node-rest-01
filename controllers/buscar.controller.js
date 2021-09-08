
const { response, request } = require("express");
const { isValidObjectId } = require("mongoose");
const { Usuario, Categoria, Producto } = require("../model");

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
    
    const regex = new RegExp(termino, 'i')

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and:[{ estado: true }]
    } )

    res.json({
        results: usuarios
    })
}


const buscarProductos = async (termino= '', res = response) =>{

    const esMongoId = isValidObjectId(termino)

    if(esMongoId){
        const producto = await Producto.findById(termino).populate('categoria', 'nombre')
        res.json({
            results: producto ? [producto] : []
        })
    }
    
    const regex = new RegExp(termino, 'i')

    const productos = await Producto.find({
        $or: [{ nombre: regex }, { descripcion: regex }, {precio: regex}],
        $and:[{ estado: true }]
    } ) .populate('categoria', 'nombre')

    res.json({
        results: productos
    })
}

const buscarCategoria = async (termino= '', res = response) =>{

    const esMongoId = isValidObjectId(termino)

    if(esMongoId){
        const categoria = await Categoria.findById(termino)
        res.json({
            results: categoria ? [categoria] : []
        })
    }
    
    const regex = new RegExp(termino, 'i')

    const categorias = await Categoria.find({
        $or: [{ nombre: regex }],
        $and:[{ estado: true }]
    } )

    res.json({
        results: categorias
    })
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
            buscarCategoria(termino,res)
        break;

        case 'usuarios':
            buscarUsuario(termino, res)
        break;

        case 'productos':
            buscarProductos(termino, res)
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
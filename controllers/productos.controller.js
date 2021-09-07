const { request, response, json } = require("express");
const { Producto, Categoria } = require("../model");

const crearProducto = async (req = request, resp = response) => {
  const { nombre, precio, descripcion, disponible } = req.body;
  const { usuario, categoria } = req;

  const productoDB = await Producto.findOne({ nombre });
  if (productoDB) {
    return resp.status(400).json({
      msg: "El producto ya existe",
    });
  }

  const producto = new Producto({
    nombre: nombre.toUpperCase(),
    usuario: usuario._id,
    estado: true,
    precio,
    categoria: categoria._id,
    descripcion,
    disponible,
  });
  await producto.save();

  resp.status(201).json(producto
  );
};

const actualizarProducto = async (req = request, resp = response) => {
  
  const {id} = req.params
  const {estado, usuario, ...data} = req.body

  if (data.nombre){
    //Solo actualizo cuando tengo un nombre en el body
    data.nombre = data.nombre.toUpperCase()
  }

  data.usuario = req.usuario._id

  const producto = await Producto.findByIdAndUpdate(id, data,{new: true})

  resp.json(producto)
};

const borrarProducto = async (req = request, resp = response) => {

    const {id} = req.params
    const producto = await Producto.findByIdAndUpdate(id,{estado: false },{new: true})

    return resp.json({
        producto
    })

};

const obtenerProducto = async (req = request, resp = response) => {

    const {id} = req.params
    
    const producto = await Producto.findById(id)

    return resp.json({
        producto
    })
};

const obtenerAllProductos = async (req = request, resp = response) => {
    const query = {estado: true}
    const {limite = 5, base = 0} = req.query

    const productos = await Producto.find(query)

    .populate('usuario')
    .populate('categoria')
    .skip(Number(base))
    .limit(Number(limite))

    return resp.json({
        productos
    })
    

    
};

module.exports = {
  crearProducto,
  obtenerAllProductos,
  borrarProducto,
  obtenerProducto,
  actualizarProducto
};

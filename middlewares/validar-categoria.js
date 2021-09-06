const { request, response } = require("express");
const Categoria = require("../model/categoria");

const existeCategoria = async (id = "") => {
  const categoriaExist = await Categoria.findById(id);

  if (!categoriaExist) {
    throw new Error(`No existe la categoria de id: ${id} en la base de datos`);
  }
};

const validarNombreCategoria = async (req = request, res = response, next) => {
  const categoria = req.body.categoria.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre: categoria });

  if (!categoriaDB) {
    return res.status(404).json({
      msg: "La categoria " + categoria + " no existe",
    });
  }

  req.categoria = categoriaDB

  next()

};

module.exports = {
  existeCategoria,
  validarNombreCategoria
};

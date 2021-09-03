const Categoria = require("../model/categoria");

const existeCategoria = async (id = "") => {
  const categoriaExist = await Categoria.findById(id);

  if (!categoriaExist) {
    throw new Error(`No existe la categoria de id: ${id} en la base de datos`);
  }
};

module.exports = {
  existeCategoria,
};

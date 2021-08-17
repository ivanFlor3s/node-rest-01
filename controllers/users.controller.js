const { response } = require("express");

const usuariosGet = (req, res) => {
  res.json({
    msg: "GET en API - controlador",
  });
};

const usuariosPost = (req, res) => {
  const {nombre, edad} = req.body;
  res.json({
    msg: "post en API - controlador",
    nombre,
    edad
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    msg: "delete en API - controlador",
  });
};

const usuariosPut = (req, res) => {

  const {id} = req.params;

  res.json({
    msg: "put en API - controlador",
    id
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosDelete,
  usuariosPut,
};

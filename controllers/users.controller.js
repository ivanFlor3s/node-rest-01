const { response } = require("express");

const usuariosGet = (req, res) => {
  res.json({
    msg: "GET en API - controlador",
  });
};

const usuariosPost = (req, res) => {
  res.json({
    msg: "post en API - controlador",
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    msg: "delete en API - controlador",
  });
};

const usuariosPut = (req, res) => {
  res.json({
    msg: "put en API - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosDelete,
  usuariosPut,
};

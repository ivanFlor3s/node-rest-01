const { response, request } = require("express");

const usuariosGet = (req = request, res=response) => {

  const { query, nombre, apikey } = req.query;

  res.json({
    msg: "GET en API - controlador",
    query,
    nombre,
    apikey
  });
};

const usuariosPost = (req, res) => {
  //Desestructuracion para trabajar mejor
  const {nombre, edad} = req.body;
  res.json({
    msg: "post en API - controlador",
    nombre,
    edad
  });
  //EJEMPLO http://localhost:3000/api/usuarios?query=roman&nombre=riquelme&apikey=19318931713
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

const { response, request } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../model/usuario')


const usuariosGet = (req = request, res=response) => {

  const body = req.query;
 
  res.json({
    msg: "GET en API - controlador",
    body
  });
};

const usuariosPost = async (req=request, res) => {
  //Desestructuracion para trabajar mejor
  const {nombre, correo, password, rol} = req.body;
  const usuario = new Usuario({nombre,correo,password, rol})

  //Verificar si el correo existe

  //Encriptar la pass
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt)

  //guardar en DB
 await usuario.save()

  res.json({
    usuario
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

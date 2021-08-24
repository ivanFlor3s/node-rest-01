const { response, request } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../model/usuario');


const usuariosGet = async (req = request, res=response) => {

  const {desde = 0, limite = 5 } = req.query

  const usuarios = await Usuario.find()
    .skip(Number(desde))
    .limit(Number(limite));
 
  const total = await Usuario.countDocuments()
  res.json({
    total,
    usuarios
  });
};

const usuariosPost = async (req=request, res=request) => {

  //Desestructuracion para trabajar mejor
  const {nombre, correo, password, rol} = req.body;
  const usuario = new Usuario({nombre,correo,password, rol})

  //Verificar si el correo existe
  //const existeMail = Usuario.findOne({correo})
  // if(existeMail){
  //   return res.status(400).json({
  //     msg: 'El correo ya esta registrados'
  //   })
  // }

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

const usuariosPut = async (req=request, res=response) => {

  const {id} = req.params;

  const {_id, password, google, correo, ...resto} = req.body

  //TODO validar contra DB
  if(password){
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt)
  }

  const usuarioDB = await Usuario.findByIdAndUpdate(id, resto)

  res.json(
    usuarioDB
  );
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosDelete,
  usuariosPut,
};

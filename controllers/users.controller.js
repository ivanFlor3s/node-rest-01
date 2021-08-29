const { response, request } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../model/usuario');


const usuariosGet = async (req = request, res=response) => {

  const {desde = 0, limite = 5 } = req.query

  const query = {estado: true}

  const usuariosPromise = Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite));
 
  const totalPromise = Usuario.countDocuments(query)

  // Desestructuracion del arreglo
  // Promis all, en caso de un error en alguna promesa, fallan ambas
  const [total, usuarios] = await Promise.all(
    [
      totalPromise, 
      usuariosPromise
    ]
  )
  res.json({
    total,
    usuarios
  });
};

const usuariosPost = async (req=request, res=request) => {

  //Desestructuracion para trabajar mejor
  const {nombre, correo, password, rol} = req.body;
  const usuario = new Usuario({nombre,correo,password, rol})

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

const usuariosDelete = async (req = request, res = response) => {

  const {id}  = req.params
  //Delete fisico de usuario
  //const usuario = await Usuario.findByIdAndDelete(id)
  const usuarioResponsable = req.usuario

  const usuario = await Usuario.findByIdAndUpdate(id,{estado: false})
  res.json({
    usuario,
    usuarioResponsable
  });
};

const usuariosPut = async (req=request, res=response) => {

  const {id} = req.params;

  const {_id, password, google, correo, ...resto} = req.body

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

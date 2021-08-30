const { response, request } = require("express");
const Usuario = require("../model/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  const usuario = await Usuario.findOne({ correo });

  //Verificar que el correo exista
  if (!usuario) {
    return res.status(404).json({
      msg: "Usuario not found - correo",
    });
  }

  //Validar que el usuario este ctivo
  if (!usuario.estado) {
    return res.status(400).json({
      msg: "El usuario esta inactivo - estado",
    });
  }

  // Validar que la contrasenia coincida
  const validPassword = bcryptjs.compareSync(password, usuario.password);
  if (!validPassword) {
    return res.status(400).json({
      msg: "Error en usaurio - password",
    });
  }

  //Generar TOKEN
  const token = await generarJWT(usuario.id);

  res.json({
    msg: "Login OK",
    usuario,
    token,
  });
};

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const googleUser = await googleVerify(id_token);

    console.log(googleUser);

    res.json({
      msg: "Todo ok, google sign in",
      googleUser
    });
  } catch (error) {
    res.status(400).json({
      msg: "Token de Google no es Valido",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};

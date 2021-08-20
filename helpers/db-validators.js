const Role = require("../model/role");
const Usuario = require("../model/usuario");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la DB`);
  }
};

const emailExiste = async (correo = "") => {
  const existeMail = await Usuario.findOne({ correo });
  
  if (existeMail) {
    throw new Error(`El correo ${correo}, ya esta registrados`);
  }
};

module.exports = {
  esRolValido,
  emailExiste,
};

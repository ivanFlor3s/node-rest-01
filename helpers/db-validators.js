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
const usuarioIdExiste = async (id) => {
  const usaurioExist = await Usuario.findById(id);
  
  if (!usaurioExist) {
    throw new Error(`El usuario con id ${id}, NO existe en la DB`);
  }
};

module.exports = {
  esRolValido,
  emailExiste,
  usuarioIdExiste
};

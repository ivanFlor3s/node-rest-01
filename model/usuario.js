const { Schema, model } = require("mongoose");
const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "La pass es obligatorio"],
  },
  imagen: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: true,
  },
});

UsuarioSchema.methods.toJSON = function () {
  //Saco la version, la password y todo lo demas lo dejo en usuario
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
};

module.exports = model("Usuario", UsuarioSchema);

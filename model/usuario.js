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
    default:'USER_ROLE' ,
    enum: ['ADMIN_ROLE','USER_ROLE']
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
  const { __v, password, _id , ...usuario } = this.toObject();
  usuario.uid = _id
  return usuario;
};

module.exports = model("Usuario", UsuarioSchema);

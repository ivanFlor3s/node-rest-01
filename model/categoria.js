const { Schema, model } = require("mongoose");
const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

CategoriaSchema.methods.toJSON = function () {
  //Saco la version, la password y todo lo demas lo dejo en usuario
  const { __v, estado  ,...data } = this.toObject();
  return data;
};

module.exports = model("Categoria", CategoriaSchema);

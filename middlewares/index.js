const validaCampos = require("../middlewares/validar-campos");
const validaJWT = require("../middlewares/validar-jwt");
const validaRoles = require("../middlewares/validar-roles");
const validaExisteCategoria = require('../middlewares/validar-categoria')

module.exports = { 
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
    ...validaExisteCategoria
}
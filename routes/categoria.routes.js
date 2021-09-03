const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos, validarJwt, existeCategoria, esAdminRole } = require("../middlewares");

const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  updateCategoria,
  borrarCategoria,
} = require("../controllers/categorias.controller");

const router = Router();

//Obtener todas las categorias - publico
router.get("/", obtenerCategorias);

//Obtener categoria por ID - publico
router.get("/:id", [
  check('id','No es un Id valido').isMongoId(),
  check("id").custom(existeCategoria),
  validarCampos
], obtenerCategoria);

//Crear categoria - private (cualquier perona con token valido)
router.post(
  "/",
  [
    validarJwt,
    check("nombre", "El nombre debe ser obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

//Actualizar una categoria - privado
router.put("/:id",[
  validarJwt,
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  check('id','No es un Id valido').isMongoId(),
  check("id").custom(existeCategoria),
  validarCampos
] , updateCategoria);

//Borrar una categoria - Admin
router.delete("/:id", [
  validarJwt,
  esAdminRole,
  check('id','No es un Id valido').isMongoId(),
  check("id").custom(existeCategoria),
  validarCampos
], borrarCategoria);

module.exports = router;

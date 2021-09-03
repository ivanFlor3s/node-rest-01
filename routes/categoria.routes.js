const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos, validarJwt, existeCategoria } = require("../middlewares");

const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
} = require("../controllers/categorias.controller");

const router = Router();

//Obtener todas las categorias - publico
router.get("/", obtenerCategorias);

//Obtener categoria por ID - publico
router.get("/:id", [
  check("id").custom(existeCategoria),
  check('id','No es un Id valido').isMongoId(),
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
router.put("/:id", (req, resp) => {
  resp.json("PUT - id");
});

//Borrar una categoria - Admin
router.delete("/:id", (req, resp) => {
  resp.json("DELETE - id");
});

module.exports = router;

//Para desustructurar y sacar algo del paquete
const { Router } = require("express");
const { check, query } = require("express-validator");
const {
  crearProducto,
  obtenerAllProductos,
  obtenerProducto,
  borrarProducto,
  actualizarProducto,
} = require("../controllers/productos.controller");

const { productoIdExiste } = require("../helpers/db-validators");

const {
  validarCampos,
  validarJwt,
  esAdminRole,
  tieneRol,
  validarNombreCategoria,
} = require("../middlewares");

const router = Router();

router.post(
  "/",
  [
    validarJwt,
    validarNombreCategoria,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("categoria", "La categoria es obligatoria").notEmpty(),
    validarCampos,
  ],
  crearProducto
);

router.get("/", [validarCampos], obtenerAllProductos);

router.get(
  "/:id",
  [
    check("id", "No es un Id valido").isMongoId(),
    check("id").custom(productoIdExiste),
    validarCampos,
  ],
  obtenerProducto
);

router.delete(
  "/:id",
  [
    validarJwt,
    esAdminRole,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(productoIdExiste),
    validarCampos,
  ],
  borrarProducto
);

router.put('/:id', [
  validarJwt,
  check('id','No es un Mongo Id').isMongoId(),
  check('id').custom(productoIdExiste),
  validarCampos
], actualizarProducto)

module.exports = router;

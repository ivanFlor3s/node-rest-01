//Para desustructurar y sacar algo del paquete
const { Router } = require("express");
const { check } = require("express-validator");
const { usuariosGet,
        usuariosPost, 
        usuariosDelete, 
        usuariosPut } = require("../controllers/users.controller");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", usuariosGet );

router.post("/",[
    check('correo', "El correo no es valido").isEmail(),
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('password', "La contrasena es obligatoria y mas de 6 letras").isLength({min: 6}),
    check('rol', "No es un rol permitido").isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
]  , usuariosPost);

router.delete("/", usuariosDelete);

router.put("/:id", usuariosPut);


module.exports = router;

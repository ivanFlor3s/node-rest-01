//Para desustructurar y sacar algo del paquete
const { Router } = require("express");
const { check } = require("express-validator");
const { usuariosGet,
        usuariosPost, 
        usuariosDelete, 
        usuariosPut } = require("../controllers/users.controller");
const { esRolValido, emailExiste, usuarioIdExiste } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", usuariosGet );

router.post("/",[
    check('correo', "El correo no es valido").isEmail(),
    check('nombre', "El nombre es obligatorio").not().isEmpty(),
    check('password', "La contrasena es obligatoria y mas de 6 letras").isLength({min: 6}),
    //check('rol', "No es un rol permitido").isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRolValido),
    check('correo').custom(emailExiste),
    validarCampos
]  , usuariosPost);

router.delete("/:id",[
    check('id').custom(usuarioIdExiste),
    check('id','No es un Id valido').isMongoId()
], usuariosDelete);

router.put("/:id",[
    check('id','No es un Id valido').isMongoId(),
    check('id').custom(usuarioIdExiste),
    check('rol').custom( esRolValido),
    validarCampos
], usuariosPut);


module.exports = router;

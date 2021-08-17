//Para desustructurar y sacar algo del paquete
const { Router } = require("express");
const { usuariosGet,
        usuariosPost, 
        usuariosDelete, 
        usuariosPut } = require("../controllers/users.controller");

const router = Router();

router.get("/", usuariosGet );
router.post("/", usuariosPost);
router.delete("/", usuariosDelete);
router.put("/:id", usuariosPut);


module.exports = router;

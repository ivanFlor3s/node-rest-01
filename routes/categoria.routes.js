const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//Obtener todas las categorias - publico
router.get('/', (req, resp) => {
    resp.json('GET Ok')
})

//Obtener categoria por ID - publico
router.get('/:id', (req, resp) => {
    resp.json('GET Ok')
})

//Crear categoria - private (cualquier perona con token valido)
router.post('/', (req, resp) => {
    resp.json('post - id')
})


//Actualizar una categoria - privado
router.put('/:id', (req, resp) => {
    resp.json('PUT - id')
})

//Borrar una categoria - Admin
router.delete('/:id', (req, resp) => {
    resp.json('DELETE - id')
})


module.exports = router
const { response } = require("express");

const cargarArchivo = (req, res = response) => {
    res.json({
        msg: 'cargando upload'
    })
}

module.exports = {
    cargarArchivo
}
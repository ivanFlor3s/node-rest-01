const { request, response } = require("express");


const esAdminRole = (req = request, res = response, next) =>{

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar primero el Token'
        })
    }

    const {rol, nombre} = req.usuario

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre}: Se necesita un rol de administrador para esta accion`
        })
    }
    next( )
}


const tieneRol = (...roles)=>{

  

    return (req, res, next)=> {
        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar primero el Token'
            })
        }

        if (!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            })
        }
        next()
    }
}
module.exports = { esAdminRole, tieneRol}
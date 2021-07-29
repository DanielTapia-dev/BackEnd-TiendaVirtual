const { response } = require("express");
const jwt = require('jsonwebtoken')
const Usuario = require('../models/User');

const validarAdministrador = async (req, res = response, next) => {
    const token = req.header('token');

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_SWT_SEED);

        let dbUser = await Usuario.findById(uid);
        if (dbUser.role === "administrador") {
            next();
        } else {
            return res.status(401).json({
                ok: false,
                msg: 'Usted no tiene los permisos correspondientes'
            })
        }
    } catch (error) {
        console.log('token global')
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }


}

module.exports = {
    validarAdministrador
}
const { response } = require("express");
const jwt = require('jsonwebtoken')

const validarJWT = (req, res = response, next) => {
    const token = req.header('token');

    if (!token) {
        return res.status(401).json({
            ok: true,
            msg: 'Error en el token',
        });
    }

    try {
        const { uid, nombre_1 } = jwt.verify(token, process.env.SECRET_SWT_SEED);
        req.uid = uid;
        req.nombre_1 = nombre_1;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    next();
}

module.exports = {
    validarJWT
}
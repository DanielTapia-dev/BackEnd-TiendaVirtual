const { response } = require('express');
const HistorialCompra = require('../models/HistorialCompra');

const obtenerHistoriales = async (req, res = response) => {
    const usuario = req.params.usuario;
    try {
        const historiales = await HistorialCompra.find({ usuario: usuario })
            .populate('usuario', 'email nombre_1 apellido_1').populate('compra', 'total fecha');
        return res.status(200).json({
            ok: true,
            historiales
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error
        });
    }
}

module.exports = {
    obtenerHistoriales
}
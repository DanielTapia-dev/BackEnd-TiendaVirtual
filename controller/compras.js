const Compra = require('../models/Compra');
const Usuario = require('../models/User');
const Historial = require('../models/HistorialCompra');
const moment = require('moment');

const crearCompra = async (req, res = response) => {
    const uid = req.body.usuario;
    let dbUser = await Usuario.findById(uid);
    if (!dbUser) {
        return res.status(404).json({
            ok: true,
            msg: 'No existe un usuario con ese ID'
        });
    }
    try {
        let currentDate = moment();
        const dbCompra = new Compra(req.body);
        dbCompra.fecha = currentDate.format('DD/MM/YYYY hh:mm:ss');
        dbCompra.usuario = uid;
        await dbCompra.save();
        const dbHistorial = new Historial({ compra: dbCompra.id, usuario: dbCompra.usuario });
        console.log(dbHistorial)
        //Cuando se agrega una compra automaticamente guardamos un historial de compra
        await dbHistorial.save();
        return res.status(400).json({
            ok: false,
            dbCompra
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error en la compra"
        });
    }
}

const obtenerCompras = async (req, res = response) => {
    try {
        const compras = await Compra.find();
        return res.status(400).json({
            ok: false,
            compras
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error contactese con soporte"
        });
    }
}

module.exports = {
    crearCompra,
    obtenerCompras
}
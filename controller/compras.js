const Compra = require('../models/Compra');
const Usuario = require('../models/User');
const Historial = require('../models/HistorialCompra');
const moment = require('moment');
const CarritoCompras = require('../models/CarritoCompras');
const Producto = require('../models/Producto');

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
        let dbCarrito = await CarritoCompras.find({ usuario: { _id: uid } }).populate('producto', 'nombre precioUnitario');;
        let total = 0;
        for (let i = 0; i < dbCarrito.length; i++) {
            const element = dbCarrito[i];
            total = total + (element.producto.precioUnitario * element.cantidad);
            let dbProducto = await Producto.findById(element.producto._id);
            const productoActualizado = await Producto.findByIdAndUpdate(element.producto._id, { stock: dbProducto.stock - element.cantidad });
            await CarritoCompras.findByIdAndDelete(element.id);
        }
        let currentDate = moment();
        let dbCompra = new Compra(req.body);
        dbCompra.fecha = currentDate.format('DD/MM/YYYY hh:mm:ss');
        dbCompra.usuario = uid;
        dbCompra.total = total.toFixed(2);
        await dbCompra.save();
        const dbHistorial = new Historial({ compra: dbCompra.id, usuario: dbCompra.usuario, total: dbCompra.total });
        console.log(dbHistorial)
        //Cuando se agrega una compra automaticamente guardamos un historial de compra
        await dbHistorial.save();

        return res.status(200).json({
            ok: true,
            msg: "Compra exitosa"
        });
    } catch (error) {
        console.log(error)
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
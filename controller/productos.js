const { response } = require('express');
const Producto = require('../models/Producto');

const crearProducto = async (req, res = response) => {
    const { nombre, precioUnitario, stock, estado } = req.body;
    try {
        const dbProducto = new Producto(req.body);
        if (!isNaN(precioUnitario) && parseFloat(precioUnitario) > 0) {
            dbProducto.precioUnitario = parseFloat(precioUnitario).toFixed(2);
        } else {
            return res.status(500).json({
                ok: false,
                msg: "Error el precio tiene que ser un numero mayor a cero"
            });
        }

        if (!isNaN(stock) && parseFloat(stock) >= 0) {
            dbProducto.precioUnitario = parseFloat(precioUnitario).toFixed(2);
        } else {
            return res.status(500).json({
                ok: false,
                msg: "Error el precio tiene que ser un numero mayor a cero"
            });
        }

        //Guardar el producto en la base de datos
        await dbProducto.save();

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            nombre: dbProducto.nombre
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error contactese con soporte"
        });
    }
}

const editarProducto = async (req, res = response) => {
    const { nombre, precioUnitario, stock, estado } = req.body;
    try {
        const dbProducto = new Producto(req.body);

        
    } catch (error) {
        
    }
}

module.exports = {
    crearProducto,
    editarProducto
}
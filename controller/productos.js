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

const actualizarProducto = async (req, res = response) => {
    const uid = req.params.id;
    try {
        let dbProducto = await Producto.findById(uid);

        if (!dbProducto) {
            return res.status(404).json({
                ok: true,
                msg: 'No existe un producto con ese ID'
            });
        }

        //Actualizaciones del producto
        const campos = req.body;

        if (campos.stock >= 0) {
            if (campos.precioUnitario > 0) {
                campos.precioUnitario = parseFloat(campos.precioUnitario).toFixed(2);
                const productoActualizado = await Producto.findByIdAndUpdate(uid, campos);
                dbProducto = await Producto.findById(uid);
                //Respuesta del servicio
                res.json({
                    ok: true,
                    dbProducto
                });
            } else {
                return res.status(404).json({
                    ok: true,
                    msg: 'No puede ingresar un precio menor o igual a cero'
                });
            }

        } else {
            return res.status(404).json({
                ok: true,
                msg: 'No puede ingresar un stock menor a cero'
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error contactese con soporte"
        });
    }
}

const obtenerProductos = async (req, res = response) => {
    try {
        const productos = await Producto.find();
        return res.status(400).json({
            ok: true,
            productos
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error contactese con soporte"
        });
    }
}

const obtenerProducto = async (req, res = response) => {
    const id = req.params.id;
    try {
        const productos = await Producto.findById(id);
        return res.status(400).json({
            ok: false,
            productos
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error contactese con soporte"
        });
    }
}

const borrarProductos = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const dbProducto = await Producto.findById(uid);

        if (!dbProducto) {
            return res.status(400).json({
                ok: false,
                msg: "El producto no existe"
            });
        }

        await Producto.findByIdAndDelete(uid);
        return res.status(400).json({
            ok: false,
            msg: "Producto eliminado"
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error contactese con soporte"
        });
    }
}

const activateProducto = async (req, res = response) => {
    const uid = req.params.id;
    try {
        let dbProducto = await Producto.findById(uid);

        if (!dbProducto) {
            return res.status(404).json({
                ok: true,
                msg: 'No existe un producto con ese ID'
            });
        }

        //Actualizaciones del producto
        if (dbProducto.estado == true) {
            dbProducto.estado = false;
            const productoActualizado = await Producto.findByIdAndUpdate(uid, dbProducto);
            dbProducto = await Producto.findById(uid);
            //Respuesta del servicio
            res.json({
                ok: true,
                dbProducto
            });
        } else {
            dbProducto.estado = true;
            const productoActualizado = await Producto.findByIdAndUpdate(uid, dbProducto);
            dbProducto = await Producto.findById(uid);
            //Respuesta del servicio
            res.json({
                ok: true,
                dbProducto
            });
        }

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error contactese con soporte"
        });
    }
}

module.exports = {
    crearProducto,
    actualizarProducto,
    obtenerProductos,
    borrarProductos,
    activateProducto,
    obtenerProducto
}
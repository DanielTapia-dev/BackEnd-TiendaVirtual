const { response } = require('express');
const Carrito = require('../models/CarritoCompras');
const Producto = require('../models/Producto');

const crearCarrito = async (req, res = response) => {
    try {
        const dbCarrito = new Carrito(req.body);
        if (!isNaN(dbCarrito.cantidad) && parseInt(dbCarrito.cantidad) > 0) {
            let carritoRepetido = await Carrito.find({ usuario: dbCarrito.usuario, producto: dbCarrito.producto });

            if (carritoRepetido.length > 0) {
                carritoRepetido[0].cantidad = carritoRepetido[0].cantidad + dbCarrito.cantidad;
                await Carrito.findByIdAndUpdate(carritoRepetido[0].id, carritoRepetido[0]);
                dbRespuesta = await Carrito.findById(carritoRepetido[0].id);
                //Respuesta del servicio
                return res.json({
                    ok: true,
                    dbRespuesta
                });
            }
            //Guardar el producto en la base de datos
            await dbCarrito.save();

            // Generar respuesta exitosa
            return res.status(201).json({
                ok: true,
                dbCarrito
            });

        } else {
            return res.status(500).json({
                ok: false,
                msg: "Error la cantidad tiene que ser mayor a cero"
            });
        }
    } catch (error) {
        console.log('Estamos en carrito')
        return res.status(500).json({
            ok: false,
            msg: "Error contactese con soporte"
        });
    }
}

const actualizarCarrito = async (req, res = response) => {
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

//Funcion que obtiene los productos de un carrito de un cliente en especifico
const obtenerCarritos = async (req, res = response) => {
    const usuario = req.params.usuario
    try {
        const carritos = await Carrito.find({ usuario: usuario });
        return res.status(200).json({
            ok: false,
            carritos
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error contactese con soporte"
        });
    }
}

//Funcion que borra el producto de un carrito
const borrarCarrito = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const dbCarrito = await Carrito.findById(uid);

        if (!dbCarrito) {
            return res.status(400).json({
                ok: false,
                msg: "El producto no existe"
            });
        }

        await Carrito.findByIdAndDelete(uid);
        return res.status(400).json({
            ok: false,
            msg: "Producto eliminado del carrito"
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error contactese con soporte"
        });
    }
}

module.exports = {
    crearCarrito,
    obtenerCarritos,
    actualizarCarrito,
    borrarCarrito,
}
const { response } = require("express");
const Producto = require("../models/Producto");
const Carrito = require("../models/CarritoCompras");

//Este middleware valida que el usuario siempre agrege al carrito un producto dentro del stock correspondiente en ese momento.
const validarStock = async (req, res = response, next) => {
    const uid = req.body.producto;
    const dbCarrito = new Carrito(req.body);
    try {
        let carritoRepetido = await Carrito.find({ usuario: dbCarrito.usuario, producto: dbCarrito.producto });
        if (carritoRepetido.length > 0) {
            carritoRepetido[0].cantidad = carritoRepetido[0].cantidad + dbCarrito.cantidad;
            let dbProducto = await Producto.findById(uid);
            if (dbProducto.stock >= carritoRepetido[0].cantidad) {
                next();
            } else {
                return res.status(401).json({
                    ok: false,
                    msg: 'La cantidad del producto supera el stock'
                })
            }
        } else {
            let dbProducto = await Producto.findById(uid);
            if (dbProducto.stock >= req.body.cantidad) {
                next();
            } else {
                console.log('La cantidad es incorrecta')
                return res.status(401).json({
                    ok: false,
                    msg: 'La cantidad del producto supera el stock'
                })
            }
        }
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Error contacte con soporte'
        })
    }
}

module.exports = {
    validarStock
}
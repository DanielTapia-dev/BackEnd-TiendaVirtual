const { response } = require("express");
const CarritoCompras = require("../models/CarritoCompras");
const Producto = require("../models/Producto");
const Usuario = require("../models/User");

//Este middleware es el encargado de crear la lista de producto que exceden el stock y enviarlos con su ID y nombre al FrontEnd
const validarStockGeneral = async (req, res = response, next) => {
    let listaErrores = [];
    let listaCarritosFinales = [];
    var productoFaltante = {
        id: '',
        nombre: '',
        cantidadRestante: 0
    };
    const usuario = req.params.usuario;
    let carritos = await CarritoCompras.find({ usuario: usuario });
    for (let i = 0; i < carritos.length; i++) {
        const element = carritos[i];
        let dbProducto = await Producto.findById(element.producto);
        if (!(dbProducto.stock >= element.cantidad)) {
            productoFaltante = {
                id: element.producto,
                nombre: dbProducto.nombre,
                cantidadRestante: dbProducto.stock
            };
            listaErrores.push(productoFaltante);
            if (dbProducto.stock > 0) {
                carritos[i].cantidad = dbProducto.stock;
                const carrtoActualizado = await CarritoCompras.findByIdAndUpdate(carritos[i].id, carritos[i]);
            } else {
                dbProducto.estado = false;
                await CarritoCompras.findByIdAndDelete(carritos[i].id);
                await Producto.findByIdAndUpdate(carritos[i].producto, dbProducto);
            }
        }
    };
    if (listaErrores.length > 0) {
        return res.status(401).json({
            ok: false,
            msg: 'Existen productos fuera de stock - Se han actualizado las existencias en el carrito',
            listaErrores
        })
    }
    next();

}

module.exports = {
    validarStockGeneral
}
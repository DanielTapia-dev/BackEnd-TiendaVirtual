const { response } = require("express");
const CarritoCompras = require("../models/CarritoCompras");
const Producto = require("../models/Producto");
const Usuario = require("../models/User");

//Este middleware es el encargado de crear la lista de producto que exceden el stock y enviarlos con su ID y nombre al FrontEnd
const validarStockGeneral = async (req, res = response, next) => {
    let listaErrores = [];
    var productoFaltante = {
        id: '',
        nombre: '',
        cantidadRestante: 0
    };
    const usuario = req.params.usuario;
    const carritos = await CarritoCompras.find({ usuario: usuario });
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
        }
    };
    for (let i = 0; i < listaErrores.length; i++) {
        const element = listaErrores[i];
        console.log(element)
    }

    next();

}

module.exports = {
    validarStockGeneral
}
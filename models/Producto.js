const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    precioUnitario: {
        type: String,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    estado: {
        type: Boolean,
        require: true
    },
    img: {
        type: String,
        require: true
    },
});

module.exports = model('Producto', ProductoSchema);
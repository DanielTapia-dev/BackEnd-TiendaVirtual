const { Schema, model } = require("mongoose");

const CarritoSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    },
    cantidad: {
        type: Number,
        require: true
    },
});

module.exports = model('Carrito', CarritoSchema);
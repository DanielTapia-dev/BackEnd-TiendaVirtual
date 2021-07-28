const { Schema, model } = require("mongoose");

//Se utilizara como identificador el email para que sea mas facil logearse para el usuario ademas Mongo ya nos crea un UID que serviria como el ID
const HistorialCompraSchema = Schema({
    compra: {
        id: {
            type: String,
            require: true
        },
        total: {
            type: Number,
            require: true
        },
        fecha: {
            type: Date,
            require: true
        },
    },
    user: {
        id: {
            type: String,
            require: true
        },
        email: {
            type: Number,
            require: true
        }
    },
});

module.exports = model('HistorialCompra', HistorialCompraSchema);
const { Schema, model } = require("mongoose");

//Se utilizara como identificador el email para que sea mas facil logearse para el usuario ademas Mongo ya nos crea un UID que serviria como el ID
const CompraSchema = Schema({
    fecha: {
        type: Date,
        require: true
    },
    total: {
        type: Number,
        require: true
    },
    user: {
        id: {
            type: String,
            require: true
        },
        email: {
            type: Number,
            require: true
        },
        nombre_1: {
            type: String,
            require: true
        },
        apellido_1: {
            type: String,
            require: true
        }
    },
});

module.exports = model('Compra', CompraSchema);
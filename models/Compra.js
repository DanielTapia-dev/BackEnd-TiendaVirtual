const { Schema, model } = require("mongoose");

//Se utilizara como identificador el email para que sea mas facil logearse para el usuario ademas Mongo ya nos crea un UID que serviria como el ID
const CompraSchema = Schema({
    fecha: {
        type: String,
        require: true
    },
    total: {
        type: Number,
        require: true
    },
    usuario: {
        type: String,
        require: true
    },
});

module.exports = model('Compra', CompraSchema);
const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

//Se utilizara como identificador el email para que sea mas facil logearse para el usuario ademas Mongo ya nos crea un UID que serviria como el ID
const UsuarioSchema = Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    nombre_1: {
        type: String,
        require: true
    },
    nombre_2: {
        type: String
    },
    apellido_1: {
        type: String,
        require: true
    },
    apellido_2: {
        type: String
    },
    password: {
        type: String,
        require: true
    },
    direccion: {
        type: String
    },
    role: {
        type: String,
        require: true
    }
});

module.exports = model('Usuario', UsuarioSchema);
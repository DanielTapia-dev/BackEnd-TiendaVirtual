const { Schema, model } = require("mongoose");

const HistorialCompraSchema = Schema({
    compra: {
        type: Schema.Types.ObjectId,
        ref: 'Compra'
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
});

/* HistorialCompraSchema.method('toJSON',function(){
    const{__v,...object} = this.toObject();
    return object;
}) */

module.exports = model('HistorialCompra', HistorialCompraSchema);
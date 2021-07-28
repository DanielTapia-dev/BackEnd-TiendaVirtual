const Router = require('express');
const { check } = require('express-validator');
const { crearProducto, editarProducto } = require('../controller/productos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//Crear un nuevo producto
const router = new Router();
router.post('/producto', [
    check('nombre', 'La nombre es obligatoria').not().isEmpty(),
    check('precioUnitario', 'El precio es obligatorio y tiene que ser un numero mayor a cero').not().isEmpty(),
    check('stock', 'El stock es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(), validarJWT,
    validarCampos,
], crearProducto);

router.put('/producto', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    validarCampos
], editarProducto);

module.exports = router;
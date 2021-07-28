//Rutas de compras
const { Router } = require('express');
const { check } = require('express-validator');
const { crearCompra } = require('../controller/compras');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//Crear una nueva compra 
const router = Router();
router.post('/compra', [
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('total', 'El total es obligatorio').not().isEmpty(),
    check('user', 'El usuario es obligatorio').not().isEmpty(),
    validarCampos
], validarJWT, crearCompra);


module.exports = router;

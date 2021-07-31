//Rutas de compras
const { Router } = require('express');
const { check } = require('express-validator');
const { crearCompra, obtenerCompras, borrarCompra } = require('../controller/compras');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//Crear una nueva compra 
const router = Router();
router.post('/compra', [
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('usuario', 'El id de usuario tiene que ser valido').isMongoId(),
    validarCampos
], validarJWT, crearCompra);

router.get('/compras', [validarJWT, validarCampos], obtenerCompras);

module.exports = router;

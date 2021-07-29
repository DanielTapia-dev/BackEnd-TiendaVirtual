const Router = require('express');
const { check } = require('express-validator');
const { crearHistorial, obtenerHistoriales } = require('../controller/historialCompra');
const { validarAdministrador } = require('../middlewares/validar-administrador');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = new Router();

//Obtener historiales por usuario
router.get('/historiales/:usuario', [validarJWT, validarCampos], obtenerHistoriales);

module.exports = router;
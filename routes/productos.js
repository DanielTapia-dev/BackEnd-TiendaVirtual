const Router = require('express');
const { check } = require('express-validator');
const { crearProducto, actualizarProducto, obtenerProductos, obtenerProducto, borrarProductos, activateProducto, obtenerProductosActivos } = require('../controller/productos');
const { validarAdministrador } = require('../middlewares/validar-administrador');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//Crear un nuevo producto
const router = new Router();
router.post('/producto', [
    check('nombre', 'La nombre es obligatoria').not().isEmpty(),
    check('precioUnitario', 'El precio es obligatorio y tiene que ser un numero mayor a cero').not().isEmpty(),
    check('stock', 'El stock es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(), validarJWT, validarAdministrador,
    validarCampos,
], crearProducto);

router.put('/producto/:id', [validarJWT, validarAdministrador, validarCampos], actualizarProducto);

router.get('/productos', obtenerProductos);

router.get('/productos', obtenerProductosActivos);

router.get('/producto/:id', [validarJWT, validarCampos], obtenerProducto);

//Servicio utilizado por el FrontEnd para borrar productos el mismo solo cambia su estado a False o viceversa
router.put('/desactivarProducto/:id', [validarJWT, validarAdministrador, validarCampos], activateProducto);

//Servicio para borrar producto este sevicio no esta siendo utilizado por el FrontEnd ya que no se recomienda borrar campos es mejor solo cambiar el estado a false
router.delete('/producto/:id', [validarJWT, validarAdministrador, validarCampos], borrarProductos);

module.exports = router;
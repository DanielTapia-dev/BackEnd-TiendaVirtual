const Router = require('express');
const { check } = require('express-validator');
const { crearCarrito, actualizarCarrito, obtenerCarritos, borrarCarrito } = require('../controller/carritoCompras');
const { validarAdministrador } = require('../middlewares/validar-administrador');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarStock } = require('../middlewares/validar-stock');
const { validarStockGeneral } = require('../middlewares/validar-stockGeneral');

//Crear un nuevo producto
const router = new Router();
router.post('/carrito', [
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('producto', 'El producto es obligatorio').not().isEmpty(),
    check('cantidad', 'La cantidad es obligatoria').not().isEmpty(),
    validarStock,
    validarCampos,
], crearCarrito);

//Obtener las compras de un cliente, aqui se verifica si aun existe stock de ese producto antes de listar y si ya no hay stock se actualizan los valores o se borra esa compra-carrito
router.get('/carritos/:usuario', [
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    validarJWT, validarStockGeneral, validarCampos
], obtenerCarritos);

//Servicio para borrar producto este sevicio no esta siendo utilizado por el FrontEnd ya que no se recomienda borrar campos es mejor solo cambiar el estado a false
router.delete('/carrito/:id', [validarJWT, validarAdministrador, validarCampos], borrarCarrito);

module.exports = router;
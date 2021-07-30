//Rutas de autentificacion
const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, renewToken, actualizarUsuario, obtenerDatos } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//Crear un nuevo usuario
const router = Router();
router.post('/new', [
    check('role', 'El rol es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email es incorrecto').isEmail(),
    check('nombre_1', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido_1', 'El apellido es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña debe tener más de 6 caracteres').isLength({ min: 6 }),
    validarCampos
], crearUsuario);

//Login de usuario
router.post('/', [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email es incorrecto').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña debe tener más de 6 caracteres').isLength({ min: 6 }),
    validarCampos
], loginUsuario);

//Actualizar usuario
router.put('/:id', [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email es incorrecto').isEmail(),
    validarCampos
], actualizarUsuario);

//Validar y revalidar token
router.get('/renew', validarJWT, renewToken);

//obtener datos del usuario por id
router.get('/datosUsuario/:id', validarJWT, obtenerDatos);

module.exports = router;
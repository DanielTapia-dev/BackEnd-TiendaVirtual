//Rutas de autentificacion
const { Router } = require('express');
const { crearUsuario, loginUsuario, renewToken } = require('../controller/auth');

//Crear un nuevo usuario
const router = Router();
router.post('/new', crearUsuario);

//Login de usuario
router.post('/', loginUsuario);

//Validar y revalidar token
router.get('/renew', renewToken);

module.exports = router;
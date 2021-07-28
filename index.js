const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

//Servidor de aplicacion express
const app = express();

//Conexion a la base de datos
dbConnection();

//CORS - De momento la configuracion acepta cualquier peticion pero por seguridad aca se puede configurar la direccion del dominio exacta que tiene acceso a la API
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Rutas de la aplicacion - middlewares
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/compras'));
app.use('/api', require('./routes/productos'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
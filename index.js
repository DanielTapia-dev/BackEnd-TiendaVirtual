const express = require('express');
const cors = require('cors');
require('dotenv').config();

//Servidor de aplicacion express
const app = express();

//CORS - De momento la configuracion acepta cualquier peticion pero por seguridad aca se puede configurar la direccion del dominio exacta que tiene acceso a la API
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Rutas de la aplicacion - middlewares
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
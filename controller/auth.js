const { response } = require("express");
const Usuario = require('../models/User');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { email, nombre_1, nombre_2, apellido_1, apellido_2, password } = req.body;

    try {
        //Verificar si el email existe en la base de datos
        const usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        //Crear usuario segun el modelo y el body
        const dbUser = new Usuario(req.body);

        // Encriptar la contraseña mediante HASH
        const salt = bcrypt.genSaltSync(10);
        dbUser.password = bcrypt.hashSync(password, salt);

        // Generar el JWT
        const token = await generarJWT(dbUser.id, dbUser.nombre_1);

        //Guardar el usuario en la base de datos
        await dbUser.save();

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            email,
            token
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Contactese con soporte"
        });
    }
}

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const dbUser = await Usuario.findOne({ email });

        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: "Las credenciales no son validas"
            });
        }

        //Confirmando si el password hace match
        const validPassword = bcrypt.compareSync(password, dbUser.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Las credenciales no son validas"
            });
        }

        //Generando el JWT
        const token = await generarJWT(dbUser.id, dbUser.nombre_1);

        //Respuesta del servicio
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.nombre_1,
            role: dbUser.role,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Contactese con soporte"
        });
    }
}

const renewToken = async (req, res = response) => {
    const { uid, nombre_1 } = req;

    //Generando el JWT
    const token = await generarJWT(uid, nombre_1);

    return res.json({
        ok: true,
        uid,
        nombre_1,
        token
    });
}

const obtenerDatos = async (req, res = response) => {
    const uid = req.params.id;

    try {
        let dbUser = await Usuario.findById(uid);
        if (!dbUser) {
            return res.status(404).json({
                ok: true,
                msg: 'No existe un usuario con ese ID'
            });
        } else {
            dbUser.password = "";
            //Respuesta del servicio
            return res.json({
                ok: true,
                dbUser
            });
        }
    } catch (error) {
        return res.status(404).json({
            ok: true,
            msg: 'No existe un usuario con ese ID'
        });
    }
}

const actualizarUsuario = async (req, res = response) => {
    const uid = req.params.id;

    try {

        let dbUser = await Usuario.findById(uid);

        if (!dbUser) {
            return res.status(404).json({
                ok: true,
                msg: 'No existe un usuario con ese ID'
            });
        }

        //Actualizaciones del usuario 
        const campos = req.body;
        delete campos.role;
        if (campos.password) {
            if (campos.password.length >= 6) {
                // Encriptar la contraseña mediante HASH
                const salt = bcrypt.genSaltSync(10);
                campos.password = bcrypt.hashSync(campos.password, salt);
                const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos);
                dbUser = await Usuario.findById(uid);
                //Respuesta del servicio
                res.json({
                    ok: true,
                    dbUser
                });
            } else {
                return res.status(500).json({
                    ok: false,
                    msg: "La contraseña es invalida"
                });
            }
        } else {
            const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos);
            dbUser = await Usuario.findById(uid);
            //Respuesta del servicio
            res.json({
                ok: true,
                dbUser
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Contactese con soporte"
        });
    }
}
module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken,
    actualizarUsuario,
    obtenerDatos
}
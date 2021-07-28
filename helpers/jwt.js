const jwt = require('jsonwebtoken');

const generarJWT = (uid, nombre_1) => {
    const payload = { uid, nombre_1 };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET_SWT_SEED, {
            expiresIn: '1h'
        }, (err, token) => {

            if (err) {
                //Todo mal
                console.log(err)
                reject(err);
            } else {
                //Todo bien
                resolve(token);
            }

        });
    });
}

module.exports = {
    generarJWT
}
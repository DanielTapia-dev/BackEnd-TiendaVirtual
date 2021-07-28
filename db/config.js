const moongose = require("mongoose");

const dbConnection = async () => {
    try {
        await moongose.connect(process.env.CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la base de datos');
    }
}

module.exports = {
    dbConnection
}
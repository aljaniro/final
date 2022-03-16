const mongoose = require('mongoose');

const connectDatabase = async () => {

   const conexion = await mongoose.connect(process.env.DB_MONGO, {
        useNewUrlParser: true,
       
        useUnifiedTopology: true
    });

    console.log('MongoDB Servidor Atlas Conectado', conexion.connection.host);
};

module.exports = connectDatabase;
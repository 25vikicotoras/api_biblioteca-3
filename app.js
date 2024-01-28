const express = require('express');

const { auth } = require("express-oauth2-jwt-bearer");
const errorHandler = require("./middleware/errorHandler.js");

//Configuracion Middleware con el Servidor de Autorización
const autenticacion = auth({
    audience: "http://localhost:3000/api/productos",
    issuerBaseURL: "https://dev-utn-frc-iaew.auth0.com/",
    tokenSigningAlg: "RS256",
});

const app = express();
app.use(express.json());

//Importamos el Router de Libos
const LibrosRouter = require('./routes/libros.js');

//Configuramos el middleware de autenticacion
app.use("/libros", autenticacion, LibrosRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('servidor iniciado en el puerto 3000');
});

// EN ESTE ARCHIVO SE CONFIGURA EL COMPORTAMIENTO DE EXPRESS (SERVIDOR)
const express = require("express");
const cors = require("cors");
const fs = require('fs'); 
const app = express();
const db = require("./models");

var corsOptions = {
    origin: ['http://localhost:8081', 'http://127.0.0.1:5500', 'http://127.0.0.1:5501']
};
// DESDE DÓNDE SE VAN A RECIBIR LLAMADAS

app.use(cors(corsOptions));
app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))
// CÓMO SE VAN A RECIBIR LLAMADAS. LAS DOS ÚLTIMAS LÍNEAS AMPLIARÁN EL TAMAÑO DE ENVÍO DE LOS PEDIDOS.

var routePath="./routes/";
// fs(FILESYSTEM) ES UNA LIBRERÍA NATIVA PARA LEER CARPETAS Y ARCHIVOS.
fs.readdirSync(routePath).forEach(function(file) {
    // SE HACE UN BUCLE CON LAS RUTAS (routePath) Y LE AÑADE EL ARCHIVO Y COMO PARÁMETRO SE LE PASA app(EXPRESS)
    require(routePath + file)(app);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    // LA VARIABLE app TIENE LAS RUTAS Y SE QUEDA A LA ESCUCHA
    console.log(`El servidor está corriendo en el puerto ${PORT}.`);
});


require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require ('./database/config')

//Crear el servidor de express
const app = express();

//Configurar Cors
app.use( cors() );

//Base de Datos 
dbConnection();

console.log( process.env );


//Datos DataBase User: mean_user Pass: Xf3HNQJe7w1VoFrR

//Rutas
app.get( '/', (req, res) =>{
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
});


app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT )
});
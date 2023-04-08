require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require ('./database/config')

//Crear el servidor de express
const app = express();

//Configurar Cors
app.use( cors() );

// Lectura y parseo de Body
app.use( express.json() );

//Base de Datos 
dbConnection();

console.log( process.env );


//Datos DataBase User: mean_user Pass: Xf3HNQJe7w1VoFrR

//Rutas
app.use('/api/usuarios', require ('./routes/usuariosRoute'));
app.use('/api/login', require ('./routes/auth'));

// app.get( '/api/usuarios', (req, res) =>{
//     res.json({
//         ok: true,
//         usuarios: [{
//             id: 123,
//             nombre: 'Fernando'
//         }]
//     })
// });


app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT )
});
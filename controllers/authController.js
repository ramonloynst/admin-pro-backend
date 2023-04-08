const { response } = require('express');
const bcrypy = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async ( req, res = response ) => {

    const { email, password } = req.body;
    //console.log(email);
    try {

        //Verificar email 
        //console.log( Usuario.findOne({email}));

        const usuarioDB = await Usuario.findOne({email});
        //console.log(usuarioDB);
        
        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email incorrecto'
            });
        }

         const validPassword = bcrypy.compareSync( password, usuarioDB.password );

            if( !validPassword ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Contraseña no valido'
                });
        }

        // Generar el Token - JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token
        });

    }catch (error) {
        console.log(error);
        res.status(500).json ({
            ok: false,
            msg: 'Hable con el administrador'
        });
    } 
}

module.exports = {
    login
}
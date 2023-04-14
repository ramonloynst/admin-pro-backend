const { response } = require('express');
const bcrypy = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSingIn = async (req, res = response ) => {

    try {
        
        const { email, name, picture } = await googleVerify ( req.body.token );


        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email: email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            usuario = usuarioDB;
            usuario.google = true;

        }
        
        //Guardar Usuario
        await usuario.save();

        const token = await generarJWT( usuario.id );


        res.json({
            ok: true,
            email, name, picture,
            token
        });
        
    } catch ( error ) {
        
        console.log( error );
        
        res.statur(400).json ({
            ok: false,
            msg: 'Token de Google no es correcto'
        });
        
    }
    

}


const renewToken = async ( req, res = response ) => {

    const uid = req.uid;

    // Generar el Token - JWT
    const token = await generarJWT( uid );


    res.json({
        ok:true,
        token
    })
}

module.exports = {
    login,
    googleSingIn,
    renewToken
}
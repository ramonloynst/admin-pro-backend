const { response } = require('express');
const bcrypy = require('bcryptjs');


const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) =>{

    const desde = req.query.desde || 0;

    // const usuarios = await Usuario
    //                             .find({}, 'nombre email role google')
    //                             .skip( desde )
    //                             .limit( 5 );

    // const total = await Usuario.count();

    const [ usuarios, total ] = await Promise.all ([
        Usuario.find({}, 'nombre email role google img')
               .skip( desde )
               .limit( 5 ),
               
         Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        //uid: req.uid,
        total
    });
}

const createUsuario = async (req, res = response) =>{

    const { email, password, nombre } = req.body;

 

    try {

        const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypy.genSaltSync();
        usuario.password = bcrypy.hashSync( password, salt );

        // Guardar Usuario
        await usuario.save();

        //Generar el Token
        const token = await generarJWT( usuario.id );
    
        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado... revisar logs'
            });
    }

}

const updateUsuario = async ( req, res = response ) => {
    
    const uid = req.params.id;
    
    try {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No exite un usuario con ese id'
            });
        }       
        // Validar Token y comprovar si existe el susuario

        //Actualizar Usuarios
        const { password, google, email, ...campos} = req.body;

        if ( usuarioDB.email !== email ) {
            const existeEmail = await Usuario.findOne({ email: email });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }            
        }

        campos.email = email;
        // delete campos.password;
        // delete campos.google;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, {new: true});

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs' 
        });
    }
}


const deleteUsuario = async ( req, res = response ) => {
    
    const uid = req.params.id;
    
    try {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No exite un usuario con ese id'
            });
        }       
        // Validar Token y comprovar si existe el susuario

        const usuarioDelete = await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Usuario Eliminado',
            usuario: usuarioDelete
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs' 
        });
    }
}


module.exports = {
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario
}
// Ruta: /api/hospitales

const { Router } = require('express');
const { check } = require('express-validator');

const { getHospitales, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitalesControllers');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


    router.get( '/', 
        [
            validarJWT
        ],
        getHospitales );

    router.post( '/', 
        [
            validarJWT,
            check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
            validarCampos,
            // check('password', 'El password es Obligatorio').not().isEmpty(),
            // check('email', 'El email es Obligatorio').isEmail(),
        ], 
    createHospital );

    router.put( '/:id',  
        [
        // validarJWT,
        // check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        // check('role', 'El role es Obligatorio').not().isEmpty(),
        // check('email', 'El email es Obligatorio').isEmail(),
        //validarCampos,
        ],
    updateHospital );

    router.delete( '/:id',  
        [
            // validarJWT,
            // deleteUsuario
        ],
    deleteHospital );





module.exports = router;

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
        ], 
    createHospital );

    router.put( '/:id', 
        [
            validarJWT,
            check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
            validarCampos
        ], 
        updateHospital );

    router.delete( '/:id',  
    validarJWT,
    deleteHospital );





module.exports = router;

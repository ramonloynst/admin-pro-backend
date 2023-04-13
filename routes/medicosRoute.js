// Ruta: /api/medicos

const { Router } = require('express');
const { check } = require('express-validator');

const { getMedicos, createMedico, updateMedico, deleteMedico } = require('../controllers/medicosControllers');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


    router.get( '/', 
        [ 
            validarJWT,
        ],
    getMedicos );

    router.post( '/', 
        [
            validarJWT,
            check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
            check('hospital', 'El hospital id debe ser válido').isMongoId(),
            validarCampos
            // check('email', 'El email es Obligatorio').isEmail(),
        ], 
    createMedico );

    router.put( '/:id',  
        [
        // validarJWT,
        // check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        // check('role', 'El role es Obligatorio').not().isEmpty(),
        // check('email', 'El email es Obligatorio').isEmail(),
        // validarCampos,
        ],
    updateMedico );

    router.delete( '/:id',  
        [
            // validarJWT,
            // deleteUsuario
        ],
    deleteMedico );





module.exports = router;

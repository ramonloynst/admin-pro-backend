
// Ruta: /api/Usuarios


const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, createUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuariosControllers')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get( '/', validarJWT, getUsuarios );

router.post( '/', 
    [
        check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        check('password', 'El password es Obligatorio').not().isEmpty(),
        check('email', 'El email es Obligatorio').isEmail(),
        validarCampos
    ], 
createUsuario );

router.put( '/:id',  
    [
    validarJWT,
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
    check('role', 'El role es Obligatorio').not().isEmpty(),
    check('email', 'El email es Obligatorio').isEmail(),
    validarCampos,
    ],
  updateUsuario );

  router.delete( '/:id',  
    [
        validarJWT,
        deleteUsuario
    ],
    deleteUsuario );



  


module.exports = router;

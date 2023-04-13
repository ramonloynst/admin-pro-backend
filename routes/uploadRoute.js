const { Router } = require('express');
//const { check } = require('express-validator');
const expressFileUpload = require('express-fileupload');

const { fileUpload, retornaImagen } = require('../controllers/uploadControllers');
//const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

    router.use( expressFileUpload() );


    router.put( '/:type/:id', validarJWT, fileUpload );
    router.get( '/:type/:foto', validarJWT, retornaImagen );



    module.exports = router;
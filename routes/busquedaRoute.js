const { Router } = require('express');
const { check } = require('express-validator');

const { getBusqueda, getCollection } = require('../controllers/busquedaControllers');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


    router.get( '/:word', 
        [
            validarJWT
        ],
        getBusqueda );


    router.get( '/:tabla/:word', 
        [
            validarJWT
        ], 
        getCollection );



    module.exports = router;
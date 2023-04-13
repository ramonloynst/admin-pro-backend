const { response } = require('express');
//const bcrypy = require('bcryptjs');


const Hospital = require('../models/hospital');
//const { generarJWT } = require('../helpers/jwt');

const getHospitales = async (req, res = response) =>{

    const hospitales = await Hospital.find().populate('usuario', 'nombre img');                                           


    try {
        
        res.json({
            ok: true,
            hospital: hospitales
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
        
    }

}

const createHospital = async (req, res = response) =>{

    const uid = req.uid;
    
    const hospital = new Hospital({ 
        usuario: uid,
        ... req.body 
    });

    try {

        const hospitalDB = await hospital.save(); 

        res.json({
            ok: true,
            hospital: hospitalDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
        
    }


    

}

const updateHospital = async ( req, res = response ) => {
    res.json({
        ok: true,
       msg: 'Actualizar los hopital'
    });
    
}


const deleteHospital = async ( req, res = response ) => {
    res.json({
        ok: true,
       msg: 'Borrar Hospital'
    });
   
}


module.exports = {
    getHospitales,
    createHospital,
    updateHospital,
    deleteHospital
}
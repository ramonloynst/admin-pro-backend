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

    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById(id);

        if(!hospital){

            res.status(404).json({
                ok: false,
                msg: 'Hospital no encotrado'
            });

        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }
        
        const hospitalActualizado = await Hospital.findOneAndUpdate(id, cambiosHospital, {new: true});

        res.json({
            ok: true,
            hospital: hospitalActualizado
        });
        
    } catch (error) {
        
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
    
}


const deleteHospital = async ( req, res = response ) => {
    const id = req.params.id;

    try {

        const hospital = await Hospital.findById(id);

        if(!hospital){

            res.status(404).json({
                ok: false,
                msg: 'Hospital no encotrado'
            });

        }

        await Hospital.findByIdAndDelete( id );


        res.json({
            ok: true,
            msg: 'Hospital Eliminado'
        });
        
    } catch (error) {
        
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
   
}


module.exports = {
    getHospitales,
    createHospital,
    updateHospital,
    deleteHospital
}
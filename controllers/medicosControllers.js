const { response } = require('express');
//const bcrypy = require('bcryptjs');


const Medico = require('../models/medico');
//const { generarJWT } = require('../helpers/jwt');

const getMedicos = async (req, res = response) =>{

    const medicos = await Medico.find().populate('usuario', 'nombre img')
                                        .populate('hospital', 'nombre');

    console.log(medicos);
    
    try {
        
        res.json({
            ok: true,
            medico: medicos
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
        
    }
}

const createMedico = async (req, res = response) =>{
    
    const uid = req.uid;
    
    const medico = new Medico({ 
        usuario: uid,
        ... req.body 
    });

    try {

        const medicoDB = await medico.save(); 

        res.json({
            ok: true,
            medico: medicoDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
        
    }


}

const updateMedico = async ( req, res = response ) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById(id);

        if(!medico){

            res.status(404).json({
                ok: false,
                msg: 'Medico no encotrado'
            });

        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }
        
        const medicoActualizado = await Medico.findOneAndUpdate(id, cambiosMedico, {new: true});

        res.json({
            ok: true,
            meidco: medicoActualizado
        });
        
    } catch (error) {
        
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }

    
}


const deleteMedico = async ( req, res = response ) => {
    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if(!medico){

            res.status(404).json({
                ok: false,
                msg: 'Medico no encotrado'
            });

        }

        await Medico.findByIdAndDelete( id );


        res.json({
            ok: true,
            msg: 'Medico Eliminado'
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
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico
}
const { response } = require('express');
//const bcrypy = require('bcryptjs');


const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
//const { generarJWT } = require('../helpers/jwt');

const getBusqueda = async (req, res = response) =>{

    //const hospitales = await Hospital.find().populate('usuario', 'nombre img');                                           

    const termino = req.params.word;
    const regex = new RegExp (termino, 'i');

    const [ usuarios, hospitales, medicos  ] = await Promise.all ([    
        Usuario.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
        Medico.find({ nombre: regex })
    ]);

    try {
        
        res.json({
            ok: true,
            usuarios,
            hospitales,
            medicos
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
        
    }

}

const getCollection = async (req, res = response) => {

    const colletion = req.params.tabla;
    const termino = req.params.word;
    const regex = new RegExp (termino, 'i');

    let data = [];

    try {

        switch (colletion) {
            case 'medicos': data = await Medico.find({ nombre: regex })
                                                .populate('usuario', 'nombre img')
                                                .populate('hospital', 'nombre')
    
            break;
    
            case 'hospitales': data = await Hospital.find({ nombre: regex })
                                                .populate('usuario', 'nombre img')
                                                .populate('medico', 'nombre');
    
            break;
    
            case 'usuarios': data = await Usuario.find({ nombre: regex });                          
    
            break;
        
            default:
                return res.status(400).json ({
                    ok: false,
                    msg: 'Busqueda no valida'
                });
        }
    
        res.json({
            ok: true,
            resultados: data
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
    getBusqueda,
    getCollection
}

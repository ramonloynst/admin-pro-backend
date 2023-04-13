const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-Imagen');

//const bcrypy = require('bcryptjs');


//const Medico = require('../models/medico');
//const { generarJWT } = require('../helpers/jwt');

const fileUpload = async (req, res = response) =>{

    const type = req.params.type;
    const id = req.params.id;

    //Validar Tipo
    const tiposValidos = ['hospitales','medicos','usuarios'];
        if ( !tiposValidos.includes(type)) {
            res.json({
                ok: true,
                msg: 'No es un médico, usuario u hospital (type)'
    
            });
        }
        // Validar que exista un archivo
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No se ha selecionado un archivo'
            });
        }

        // Procesar la imagen...

        const file = req.files.imagen;

        const nombreCortado = file.name.split('.'); // imagen.jpg
        const extensionArchivo = nombreCortado [nombreCortado.length - 1];

        //Validar extensión
        //console.log(file);
        //console.log(nombreCortado);
        //console.log(extensionArchivo);

        const extensionesValidas = ['png','jpg','jpeg','gif'];

        if ( !extensionesValidas.includes( extensionArchivo ) ) {
            return res.status(400).json({
                ok: false,
                msg: 'Extensión no valida'
            });
        }

        //Generar el nombre del archivo
        const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

        //Path para guardar imagen
        const path = `./uploads/${type}/${ nombreArchivo }`;

        file.mv(path, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json ({
                    ok: false,
                    msg: 'Error al mover la imagen'
                });
       }
            
            //Actualizar base de datos
            //console.log(id);
            actualizarImagen( type, id, nombreArchivo );
        
            res.json({
                ok: true,
                msg: 'Archivo subido',
                nombre: nombreArchivo
    
            });
        });
   
        

}

const retornaImagen = (req, res = response) =>{
    const tipo = req.params.type;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${tipo}/${foto}` );
    
    if (fs.existsSync( pathImg )) {
        
        res.sendFile ( pathImg );
        
    } else {
        const pathDef= path.join( __dirname, `../uploads/default/defaultPerson.png` );
        
        res.sendFile ( pathDef );
    }


}
    

module.exports = {
    fileUpload,
    retornaImagen
}

const fs = require('fs');

const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');


//Borrar Imagen 
const borrarImagen = (path) =>{

        //console.log(path);
        if ( fs.existsSync( path ) ) {
            // borrar la imagen anterior
            fs.unlinkSync( path );
        }
        
}



const actualizarImagen = async ( type, id, nombreArchivo ) => {

    let pathViejo = '';

    switch (type) {
        case 'medicos':

            const medico = await Medico.findById( id );
            //console.log(id);
            if (!medico)  {
                console.log('No es un médico por id');
                return false;
            }
            
            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);
            
           
            medico.img = nombreArchivo;
            //console.log(medico);
            await medico.save();
            return true;


        break;
        case 'hospitales':

            const hospital = await Hospital.findById( id );
            //console.log(id);
            
            if (!hospital)  {
                console.log('No es un Hospitales por id');
                return false;
            }
            
            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);
            
        
            hospital.img = nombreArchivo;
            //console.log(hospital);
            await hospital.save();
            return true;


        break;
        case 'usuarios':
            //console.log( id );
            const usuario = await Usuario.findById(id);
            console.log(usuario);
            if (!usuario)  {
                console.log('No es un usuarios por id');
                return false;
            }
            
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);
            
           
            usuario.img = nombreArchivo;
            //console.log(usuario);
            await usuario.save();
            return true;


        break;

        default:
            break;
    }
        

}


module.exports = {
    actualizarImagen
}
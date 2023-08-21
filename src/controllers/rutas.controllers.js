import { join } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import moment from 'moment';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Controllers = {};
import { Image, localImage } from '../models/cloudinary.models.js';

Controllers.index = (req, res) => {
    res.render('principal/index')
};

Controllers.glocal = (req, res) => {
    res.render('gallerys/galleryLocal')
};

Controllers.gcloud = (req, res) => {
    res.render('gallerys/galleryCloud')
};
Controllers.show = (req, res) => {
    res.send('local')
};
// Controllers.show = async (req, res) => {
//     const files = await localImage.findOne({
//         where: {
//             id: req.params.id,
//         },
//     });
//     const uploadPath = join(__dirname, '../gallery', new Date().getTime() + files[key].name);
//     console.log(files)
//     return res.sendFile(uploadPath);
// };


// Controllers.storeCloud = (req, res) => {
//     const files = req.files

//     if (!req.files || Object.keys(files).length === 0) {
//         return res.status(400).json({
//             status: "Seleccione un archivo para cargar"
//         })
//     }
//     Object.keys(files).forEach(key => {
//         const filepath = join(__dirname, '../gallery', new Date().getTime() + files[key].name)

// });
//         files[key].mv(filepath, (err) => {
//             if (err) return res.status(500).json({
//                 status: "No se pudo cargar el archivo",
//                 message: err
//             })
//         })
//     })
//     return res.json({
//         status: 'Archivo Cargado!', message: Object.keys(files).
//             toString()
//     })
// }

// const update = (req, res) => {
//     res.send('Peticion PUT')
// };
// const destroy = (req, res) => {
//     res.send('Peticion DELETE')
// };
// ==========================================
//         Rutas para CRUD
// ==========================================

Controllers.obtenerGallery = async (req, res) => {
    console.log('obteniendo Imagen');
    const id = req.params.id;
    try {
        const gallery = await localImage.findOne({
            where: {
                id
            }
        });
        
        if (!gallery) {
            throw ({
                status: 404,
                message: 'No existe la imagen'
            })
        }
        
        const uploadPath = join(__dirname, "../gallery/", `${gallery.code}`);
        return res.sendFile(uploadPath);
        
        // return res.json(gallery);
    
    } catch (error) {
        console.log(error.message);
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
}
// Obtener todas
Controllers.obtenerGalleryLocal = async (req, res) => {
    console.log('obteniendo galeria local');

    try {
        const gallery = await localImage.findAll();

        if (!gallery || gallery.length === 0) {
            throw ({
                status: 404,
                message: 'No hay imágenes para mostrar'
            })
        }
        return res.json(gallery);
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || 'Error interno del servidor'
        });
    }
}

Controllers.storeLocal = async (req, res) => {
    const files = req.files

    if (!req.files || Object.keys(files).length === 0) {
        return res.status(400).json({
            status: "Seleccione un archivo para cargar"
        })
    }
    let dataValues = [];

    Object.keys(files).forEach(key => {
        const filepath = join(__dirname, '../gallery', new Date().getTime() + files[key].name)
        let code = new Date().getTime() + files[key].name;
        dataValues.push({
            name: files[key].name,
            mimetype: files[key].mimetype,
            code: code,
            creation: moment().format()
        });
        
        files[key].mv(filepath, (err) => {
            if (err) return res.status(500).json({
                status: "No se pudo cargar el archivo",
                message: err
            })
        })
    })
    //para mandar a la base de datos
    const imagen = await localImage.bulkCreate(dataValues)
    
    return res.json({
        status: 'Archivo Cargado!', message: Object.keys(files).toString()
        })
    }
    

    Controllers.eliminarImagen = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const imagenEliminada = await localImage.destroy({
            where: {
                id
            }
        });

        if (!imagenEliminada) {
            throw ({
                status: 400,
                message: 'No se pudo eliminar la imagen'
            })
        }

        return res.json({ imagenEliminada, message: 'Imagen eliminada correctamente' });
    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
}

export default Controllers
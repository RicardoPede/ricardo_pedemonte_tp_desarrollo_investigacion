import { Router } from 'express';
const rutas = Router();
import Controllers from '../controllers/rutas.controllers.js';

rutas.get('/', Controllers.index);
rutas.get('/local', Controllers.glocal);
rutas.get('/cloudinary', Controllers.gcloud)
// rutas.get('/local/:id', Controllers.show);
// rutas.post('/upload', Controllers.storeCloud);
rutas.post('/upload', Controllers.storeLocal);
// rutas.put('/:id', Controllers.update);
// rutas.delete('/:id', Controllers.destroy);

// ==========================================
//         Rutas para CRUD
// ==========================================
// Obtener todas
rutas.get('/api', Controllers.obtenerGalleryLocal);

rutas.get('/api/:id', Controllers.obtenerGallery);

rutas.delete('/api/:id', Controllers.eliminarImagen);

export default rutas
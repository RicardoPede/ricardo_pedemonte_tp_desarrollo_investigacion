import express from 'express';
import fileUpload from 'express-fileupload';
import { join } from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
// require('ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(join(__dirname, 'public')));

//variables de entorno
// config({ path: ".env" });
import router from './routes/index.routes.js';

import { sequelize } from './database/config.js';

// Middlewares
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// default options
app.use(fileUpload({
    creteParentPath: true,
    //establezco límite para que no sobrecargue
    limits: { fileSize: 50 * 1024 * 1024 },
    abortOnLimit: true,
    responseOnLimit: "archivo demasiado grande",
    // safeFileNames: true,
    // preserveExtension: true,
    uploadTimeout: 0, //limitar el tiempo de carga
})
);

// configuración del motor de plantillas
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs');

// app.get("/", (req, res) => {
//     res.render("principal/index.ejs")
// });

// Routes
app.use('/', router);

sequelize.authenticate()
    .then(() => {
        console.log('Conexión a base de datos exitosa');
    })
    .catch((error) => console.log('Error al conectar a base de datos', error));


// Si la petición no coincide con ninguna de las rutas declaradas, mostrar error 404
app.use((req, res, next) => {
    return res.status(404).json({
        message: "pagina no encontrada"
    });   
})

// Starting the server
app.listen(8000, () => console.log('Server on port 8000'));
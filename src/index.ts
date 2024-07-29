import express, { Application } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import cors from 'cors';
// Importar rutas de módulos
//import employeeRoutes from './employee/routes/employeeRoutes';
import userRoutes from './user/routes/userRoutes';

import unitRoutes from './unit/routes/unitRoutes';
import employeeRoutes from './employees/routes/employeesRoutes';
import checkerRoutes from './checker/routes/checkerRoutes';
import userUnitRoutes from './user_unit/routes/user_unitRoutes';

// Importar middlewares compartidos
import { errorHandler } from './shared/middlewares/errorHandler';
import { notFoundHandler } from './shared/middlewares/notFoundHandler';


// Configuración de variables de entorno
dotenv.config();

// Crear la aplicación de Express
const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10);

// Middleware de análisis del cuerpo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

// Rutas de los módulos
//app.use('/api/employee', employeeRoutes);
app.use('/api/user',userRoutes);
app.use('/api/unit',unitRoutes);
app.use('/api/employees',employeeRoutes);
app.use('/api/checker',checkerRoutes);
app.use('/api/user_unit',userUnitRoutes);




// Middleware para manejar rutas no encontradas
app.use(notFoundHandler);

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
//xd
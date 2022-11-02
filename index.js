import express from 'express';
import dotenv from 'dotenv';
import conectDB from './config/db.js';
import cors from 'cors';
import usersRoutes from './routes/usersRoutes.js';
import vehiculosRoutes from './routes/vehiculosRoutes.js';
import ventasRoutes from './routes/ventasRoutes.js';
import alarmRoutes from './routes/alarmRoutes.js';
import bodyParser from 'body-parser';
import client from './helpers/mqtt.js';
//Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from 'swagger-jsdoc';

const swaggerSpec = {
    definition:{
        openapi: '3.0.0',
        info:{
            title: 'Smart-Fleets API',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
            },
        ],
         components:{
            securitySchemes:{
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
         }

       
    },
    apis: ['./routes/*.js'],
}

// Conexion a DB
conectDB();



// Crear el servidor
const app = express();
app.use(express.json())
dotenv.config()
app.use(cors())
app.use(bodyParser.json())
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument(swaggerSpec)));


// Rutas de la app
app.use('/api/users', usersRoutes)
app.use('/api/vehiculos', vehiculosRoutes)
app.use('/api/ventas', ventasRoutes)
app.use('/api/alarms', alarmRoutes)


// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT)




import express from 'express';
import dotenv from 'dotenv';
import conectDB from './config/db.js';
import cors from 'cors';
import usersRoutes from './routes/usersRoutes.js';
import vehiculosRoutes from './routes/vehiculosRoutes.js';
import ventasRoutes from './routes/ventasRoutes.js';
import alarmRoutes from './routes/alarmRoutes.js';
import devicesRoutes from './routes/devicesRoutes.js'
import bodyParser from 'body-parser';
dotenv.config()

conectDB();

export const app = express();
app.use(cors({
    origin: process.env.REACT_URI,
    credentials: true
}))
app.use(express.json())
dotenv.config()
app.use(bodyParser.json())


// Rutas de la app
app.use('/api/users', usersRoutes)
app.use('/api/vehiculos', vehiculosRoutes)
app.use('/api/ventas', ventasRoutes)
app.use('/api/alarms', alarmRoutes)
app.use('/api/devices', devicesRoutes)



// Puerto
const PORT = process.env.PORT || 5000;
console.log(`App listen on port: ${PORT}`)
app.listen(PORT)




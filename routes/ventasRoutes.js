import express from 'express';
const router = express.Router();
import {viewVentas, getVenta, newVenta} from '../controllers/ventasController.js'

router.post('/', newVenta)

 // Obtener todos los vehiculos
 router.get('/', viewVentas)
 


 // Obtener vehiculo por id
 router.get('/:id', getVenta)


 export default router;
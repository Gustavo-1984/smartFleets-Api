import express from 'express';
const router = express.Router();
import {newVehiculo, viewVehiculos, getVehiculo, updateVehiculo} from '../controllers/vehiculosController.js'
  


 // Agregar vehiculo
 router.post('/:_id', newVehiculo)

 // Obtener todos los vehiculos
 router.get('/', viewVehiculos)

 // Obtener vehiculo por id
 router.get('/:_id',  getVehiculo)

 // Actualizar vehiculo por id
 router.put('/:_id', updateVehiculo)




 export default router;
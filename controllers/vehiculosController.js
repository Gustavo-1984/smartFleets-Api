import Vehiculos from '../models/Vehiculos.js';
import Users from '../models/Users.js';


const newVehiculo = async (req, res, next) =>{
    const vehiculo = new Vehiculos(req.body);
    const users = await Users.findById(req.params);
    try {
        vehiculo.user = users;
        await vehiculo.save();
        users.vehiculos.push(vehiculo);
        await users.save();
        res.json({message: 'Vehiculo agregado correctamente'})
    } catch (error) {
        res.send(error)
        next()
    }
}

const viewVehiculos = async (req, res, next) =>{
    try {
        const vehiculos = await Vehiculos.find().populate('user');
        res.json(vehiculos)
    } catch (error) {
        console.log(error);
        next();
    }
}

 const getVehiculo = async (req, res, next) =>{
     try {
         const vehiculo = await Vehiculos.findById(req.params.id);
         res.json(vehiculo)
     } catch (error) {
         console.log(error);
         next();
     }
 }

 const updateVehiculo = async (req, res, next) =>{
     try {
         const vehiculo = await Vehiculos.findOneAndUpdate({_id: req.params.id}, 
             req.body,{
                 new: true
         });
         res.json(vehiculo)
     } catch (error) {
         console.log(error);
         next();
     }
 }

// exports.deleteUser = async (req, res, next) =>{
//     try {
//         await Users.findOneAndDelete({_id: req.params.id})
//         res.json({message: 'El usuario ha sido eliminado'})
//     } catch (error) {
//         console.log(error);
//         next();
//     }
// }




export {newVehiculo, viewVehiculos, getVehiculo, updateVehiculo}
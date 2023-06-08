import Devices from '../models/Device.js';
import Users from '../models/Users.js';


const newDevice = async (req, res, next) =>{
    const device = new Devices(req.body);
    console.log(device)
    const users = await Users.findById(req.params);
    console.log(users)
     try {
         device.user = users;
         await device.save();
         users.devices.push(device);
         await users.save();
         res.json({message: 'Device agregado correctamente'})
     } catch (error) {
         res.send(error)
         next()
     }
    
}

const viewDevices = async (req, res, next) =>{
   
}

 const getDevice = async (req, res, next) =>{
     
 }

 const updateDevice = async (req, res, next) =>{
   
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




export {newDevice, viewDevices, getDevice, updateDevice}
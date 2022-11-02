import Users from '../models/Users.js';
import Ventas from '../models/Ventas.js';
import {client} from '../helpers/mqtt.js';

const newVenta = async (req, res, next) => {
    const data = req.body;
    const user = await Users.find({serialNumber: data.payload.serialNumber});
    console.log(user)
    try {
        client.on('message', async function (topic, message, packet) {
                console.log(`Mensaje recibido desde ${topic}: ${message.toString()}`);
                let topic_splitt = topic.split("/");
                let query = topic_splitt[1];
                if (query === "ventas") {
                    const venta = new Ventas(JSON.parse(message.toString()));
                    console.log(venta);
                    await venta.save();

                }
                res.json({ message: 'Venta Exitosa' });
                next();
                client.removeAllListeners('message');
            })
            
    } catch (error) {
        console.log(error)
    }
  
}

const viewVentas = async (req, res, next) =>{
    try {
        const ventas = await Ventas.find({});
        res.json(ventas)
    } catch (error) {
        console.log(error);
        next();
    }
}

 const getVenta = async (req, res, next) =>{
     try {
         const venta = await Ventas.findById(req.params.id);
         res.json(venta)
     } catch (error) {
         console.log(error);
         next();
     }
 }

export {viewVentas, getVenta, newVenta}
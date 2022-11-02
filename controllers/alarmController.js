
import {client} from '../helpers/mqtt.js';
import Vehiculos from '../models/Vehiculos.js';

//const client = mqtt.connect("mqtt://192.168.1.74", options);

const newAlarm = async (req, res) => {
   const data = req.body;
   console.log(data)
   const users = await Vehiculos.find({tag: data.tag});
   console.log(users)
       if(users.length == 1){
          client.publish('/autorizathions', "granted" + " " + JSON.stringify(users[0]._id));
       }else{
          client.publish('/autorizathions', "denied");
      }
}


export {newAlarm}
import mqtt from 'mqtt';

export const options = {
    port: 1883,
    host: '192.168.1.74',
    clientId: 'mqttjs_' + Math.random().toString(32),
    username: 'admin',
    password: 'public',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
}

export const client = mqtt.connect("mqtt://192.168.1.74", options);

client.on('connect', function () {
    console.log("Conexion exitosa")
    client.subscribe('/#', function (err) {
        console.log("Subscripcion exitosa")
    })
})

  
export default {options, client}
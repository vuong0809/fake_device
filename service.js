const { workerData, parentPort } = require('worker_threads')

parentPort.postMessage(workerData)

var token = workerData.device.token
var mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:1883', {
    username: token
})


var time_old = 0
var time_now = 0
var time_set = 60000

var max = 11
var min = 10
var decimals = 2

client.on('connect', function () {
    console.log('connected', workerData.index)
    setInterval(() => {
        data = {
            "temp": (Math.random() * (max - min) + min).toFixed(decimals || 2),
            "hum": (Math.random() * (50 - 45) + 45).toFixed(decimals || 2)
        }
        client.publish('v1/devices/me/attributes', JSON.stringify(data));

        if (time_now - time_old >= time_set) {
            client.publish('v1/devices/me/telemetry', JSON.stringify(data));

            time_old = time_now
        }
        time_now += 1000
    }, 1000)
})




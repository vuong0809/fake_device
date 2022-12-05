const { workerData, parentPort } = require('worker_threads')

parentPort.postMessage(workerData)

const token = workerData.device.token
const device_type = workerData.device.device_type
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:1883', {
    username: token
})


var time_old = 0
var time_now = 0
var time_set = 60000

var max = 15
var min = 10
var decimals = 5

client.on('connect', function () {
    console.log('connected', workerData.index, ' device ', workerData.device.name)
    setInterval(() => {
        if (device_type == 'WEATHER') {
            send_WEATHER()
        } else if (device_type == 'DOOR') {
            send_DOOR()
        } else if (device_type == 'GPS') {
            send_GPS()
        }
        time_now += 1000
    }, 1000)
})


function send_WEATHER() {
    data = {
        "temp": (Math.random() * (max - min) + min).toFixed(decimals || 2),
        "hum": (Math.random() * (50 - 45) + 45).toFixed(decimals || 2)
    }
    client.publish('v1/devices/me/attributes', JSON.stringify(data));
    if (time_now - time_old >= time_set) {
        // client.publish('v1/devices/me/telemetry', JSON.stringify(data));
        time_old = time_now
    }
}


function send_GPS() {
    data = {
        "location": {
            "lat": 0,
            "lng": 0,
            "speed": 0
        }
    }
    client.publish('v1/devices/me/attributes', JSON.stringify(data));
    if (time_now - time_old >= time_set) {
        // client.publish('v1/devices/me/telemetry', JSON.stringify(data));
        time_old = time_now
    }
}


var max_door = 30000
var min_door = 60000 * 15
var time_door_set = Math.floor(Math.random() * (max_door - min_door)) + min_door;
var door_status = false
function send_DOOR() {
    if (time_now - time_old >= time_door_set) {
        time_old = time_now
        time_door_set = Math.floor(Math.random() * (max_door - min_door)) + min_door;
        door_status = !door_status
        // console.log(`device name ${workerData.device.name} time set ${time_door_set} status ${door_status}`)
        var data = {
            "door_status": door_status
        }
        client.publish('v1/devices/me/attributes', JSON.stringify(data));
        // client.publish('v1/devices/me/telemetry', JSON.stringify(data));
    }
}


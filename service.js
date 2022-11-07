const { workerData, parentPort } = require('worker_threads')

// You can do any heavy stuff here, in a synchronous way
// without blocking the "main thread"
// parentPort.postMessage({ hello: workerData })


var mqtt = require('mqtt')
const client = mqtt.connect('mqtt://192.168.1.43:9883', {
    username: workerData.token
})
// console.log('start ',workerData.index )
parentPort.postMessage(workerData)
client.on('connect', function () {
    console.log('connected', workerData.index)
    setInterval(() => {
        data = {
            "time": Date(Date.now()),
            "temperature": Math.random(),
            "humidity": Math.random()
        }
        // console.log(`publish device id: ${workerData.index}`)
        client.publish('v1/devices/me/attributes', JSON.stringify(data));
    }, 10000)
})




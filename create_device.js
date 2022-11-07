var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1883', {
    username: "WMleLuWBTpbi8w07I1FJ"
})
var count = 12145
var number_device = 50000

client.on('connect', function () {
    console.log('connected')
    var send_telemetry = setInterval(() => {
        var data = {}
        device_name = `device ${count++}`
        data[device_name] = {
            "temperature": Math.random(),
            "humidity": Math.random()
        }
        console.log(JSON.stringify(data))
        client.publish('v1/gateway/attributes', JSON.stringify(data));
        if (count >= number_device) {
            client.end()
            clearInterval(send_telemetry)
            console.log('done')
        }
    }, 20)
})

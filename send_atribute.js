const fs = require("fs");
const { parse } = require("csv-parse");
var mqtt = require('mqtt')
const url = 'mqtt://localhost:1883'
var token = []
var count = 0




fs.createReadStream("./device_credentials.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
        token.push(row[0])
    })
    .on("end", function () {
        console.log("Start______________");
        start_send_attribute()

    })
    .on("error", function (error) {
        console.log(error.message);
    });



var n = 1000
var i = 0


var client = []

function start_send_attribute() {
    for (i = 0; i < n; i++) {
        client[i] = mqtt.connect(url, {
            username: token[i]
        })
        client[i].on('connect', (e) => {
            console.log('connected', i)
            // client[i].publish('v1/devices/me/attributes', JSON.stringify({
            //     "temperature": Math.random(),
            //     "humidity": Math.random()
            // }));
            // e.end()
        })
    }
    // on_send()
}



function on_send() {
    console.log('start_________________________________________________________________')
}

// const client = mqtt.connect(url, {
//     username: 'jQdKGWZHxpvNxsuSrFYG'
// })
// client.on('connect', function () {
//     console.log('connected')
//     client.publish('v1/devices/me/attributes', JSON.stringify({
//         "temperature": Math.random(),
//         "humidity": Math.random()
//     }));
//     // start_send_attribute()
//     client.end()
//     console.log('disconnect')
// })


// function start_send_attribute() {
//     if (i > n){
//         return
//     }
//     console.log(i)
//     const client = mqtt.connect(url, {
//         username: token[i++]
//     })
//     client.on('connect', function () {
//         console.log('connected', token[i])
//         client.publish('v1/devices/me/attributes', JSON.stringify({
//             "temperature": Math.random(),
//             "humidity": Math.random()
//         }));
//         client.end()
//         console.log('disconnect')
//         start_send_attribute()
//     })
// }

// function start_send_attribute() {
//     for (i = 0; i <  n; i++) {
//         const client = mqtt.connect(url, {
//             username: token[i]
//         })
//         client.on('connect', function (e) {
//             console.log('connected', token[i])
//             client.end()
//         })
//     }
// }

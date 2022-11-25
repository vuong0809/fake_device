// const fs = require("fs");
// const { parse } = require("csv-parse");


var token = [
    {
        token: "xSlRL32JSZgzqdm4VFxQ",
        device_type: "WEATHER"
    },
    {
        token: "QWiP55rvirtCiPhAJy7n",
        device_type: "WEATHER"
    }
]
var count = 0

const { Worker } = require('worker_threads')
function runService(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./service.js', { workerData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        })
    })
}


async function run() {
    send_mqtt()
}

run().catch(err => console.error(err))


async function send_mqtt() {
    for (i = 0; i < token.length; i++) {
        const result = await runService({
            device: token[i],
            index: i
        })
        // console.log(result, i);
    }
}

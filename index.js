const fs = require("fs");
const { parse } = require("csv-parse");


var token = []
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
    fs.createReadStream("./device_credentials.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) {
            token.push(row[0])
        })
        .on("end", function () {
            console.log("Start______________");
            send_mqtt()
        })
        .on("error", function (error) {
            console.log(error.message);
        });
}

run().catch(err => console.error(err))


async function send_mqtt(){
    for (i = 0; i < token.length; i++) {
        const result = await runService({
            token : token[i],
            index: i
        })
        // console.log(result, i);
    }
}

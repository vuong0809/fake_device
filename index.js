
var token = [
    {
        token: "cR4V5tARMrPVJtuH00a8",
        device_type: "GPS",
        name: "/4/1"
    }, {
        token: "PeYW8mFvsOLs16SqVytu",
        device_type: "DOOR",
        name: "/2/1/2"
    }, {
        token: "prASFQFmkQHTFoMFsJJ2",
        device_type: "DOOR",
        name: "/2/1/5"
    }, {
        token: "MASkRqgEYnU8DDOuRQ0B",
        device_type: "DOOR",
        name: "/2/1/6"
    }, {
        token: "xSlRL32JSZgzqdm4VFxQ",
        device_type: "WEATHER",
        name: "/2/1/1"
    }, {
        token: "QWiP55rvirtCiPhAJy7n",
        device_type: "WEATHER",
        name: "/2/1/3"
    },
    {
        token: "bAfZaP7Bal4oqcWIHKD5",
        device_type: "WEATHER",
        name: "/2/1/4"
    },
    {
        token: "IP6JEf9Bu4BaFzS9Hwcc",
        device_type: "WEATHER",
        name: "/3/1"
    },
    {
        token: "0nWwUz3IJB60V3g7vxeW",
        device_type: "WEATHER",
        name: "/3/2"
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

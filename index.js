
const fs = require('fs')
const { Worker } = require("worker_threads");

const filePath = "./var/rinha/source.rinha.json";

const fileResult = fs.readFileSync(filePath, "utf8");
const json = JSON.parse(fileResult);

const worker = new Worker('./interpreter/worker.js', { workerData: json.expression })

worker.on("online", () => { })
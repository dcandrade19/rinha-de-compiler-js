const fs = require('fs');
const { Worker } = require('worker_threads');
const path = require('path');

const testDir = './tests/files';

fs.readdir(testDir, (err, files) => {
    if (err) {
        console.error('Error reading tests directory:', err);
        return;
    }

    const jsonFiles = files.filter(file => path.extname(file) === '.json');

    jsonFiles.forEach(fileName => {
        const filePath = path.join(testDir, fileName);
        const fileResult = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(fileResult);

        const worker = new Worker('./interpreter/worker.js', { workerData: json.expression });

        worker.on('online', () => console.time(`Worker for ${fileName} Exited in`));
        worker.on('exit', () => console.timeEnd(`Worker for ${fileName} Exited in`));
    });
});
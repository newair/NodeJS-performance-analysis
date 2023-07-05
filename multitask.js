
const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

process.env.UV_THREADPOOL_SIZE=5;

// If you set the above value to 4 the output is as follows
// Request: 883
// Hash: 8542
// Read file: 8544
// Hash: 8684
// Hash: 8805
// Hash: 9025

// Which means it it allocates four threads but since read file is an IO operation
// it releases that thread and allocates that threadto calculate Hash. But when one of threads which runs the
// hash functions finishes up calculating it allocates the thread back to read the file.But

// This can be clearly seen when you increase the UV_THREADPOOL_SIZE defined above where the output becomes follows

// Request: 883
// Hash: 8542
// Read file: 8544
// Hash: 8684
// Hash: 8805
// Hash: 9025

const start = Date.now();
function doRequest() {

   https.request('https://www.google.com', res => {
        res.on('data', () => {})
        res.on('end', () => { console.log('Request: '+ (Date.now() - start))})
    }).end();
}

function doHash() {
    crypto.pbkdf2 ('a', 'b', 1000000, 512, 'sha512', () => {
        console.log('Hash: ' + (Date.now() - start));
    });
}

doRequest();

function readFile() {
    fs.readFile('multitask.js', 'utf-8', () => {
        console.log('Read file: ' + (Date.now() - start));
    });
}

readFile();
doHash();
doHash();
doHash();
doHash();
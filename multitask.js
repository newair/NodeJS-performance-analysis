
const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

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
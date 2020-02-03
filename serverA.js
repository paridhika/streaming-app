var http = require('http');
const express = require('express')
var fs = require('fs');
const path = require('path')
const app = express();

const args = process.argv;
const ipAddr = "http://" + args[2] + ":" + args[3] + "/video";
var server = require('http').Server(app);
const videoPath = 'sample.mp4';



app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.htm'))
  })

app.get('/video', function(req, returnResponse) {
    http.get(ipAddr, (res) => {
        const headers = res.headers;
        const length = res.headers.length;
        returnResponse.writeHead(200, headers)
        res.pipe(returnResponse);
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
    
})
server.listen(8000);


var http = require('http');
const express = require('express')
var fs = require('fs');
const path = require('path')
const app = express();

const args = process.argv;
var ipAddr = "http://" + args[2] + ":" + args[3] + "/video";
var server = require('http').Server(app);


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.htm'))
  })

app.get('/video', function(req, returnResponse) {
    http.get("http://localhost:8081", (res) => {
        const headers = res.headers;
        returnResponse.writeHead(206, headers);
        res.pipe(returnResponse);
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
    
})
server.listen(args[4]);


var http = require('http');
const express = require('express')
var fs = require('fs');
const path = require('path')
const app = express();
var myArgs = process.argv.slice(2);

const ipAddr = "http://" + myArgs[0] + ":" + myArgs[1] + "/video";

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
   res.sendFile(path.join(__dirname + '/index.htm'))
  })

app.get('/video', function(req, returnResponse) {
    http.get(ipAddr, (res) => {
        const headers = res.headers;
        returnResponse.writeHead(206, headers);
        res.pipe(returnResponse);
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
    
})
app.listen(myArgs[2], function () {
    console.log('Listening on port ' + myArgs[2] + ' !')
  });
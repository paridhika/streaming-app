var http = require('http');
const express = require('express')
var fs = require('fs');
const path = require('path')
const app = express();

// const args = process.argv;
// const ipAddr = "http://" + args[2] + ":" + args[3] + "/video";
// const ipAddr = "http://172.16.1.20:3000/video";
const ipAddr = "http://localhost:3000/video";
//var server = require('http').Server(app);

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
    // console.log('Sever B called');
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
app.listen(8001, function () {
    console.log('Listening on port 8001!')
  })
//console.log("listening");

/*

// var server = http.createServer(function (req, res) {
//     http.get(
//         { 
//             host: 'http://localhost:8000/', 
//             path: 'test' 
//         }, function(res) { 
//             console.log(res);
//       });
// });

const { statusCode } = res;
        const contentType = res.headers['content-type'];
        const header = res.headers;
        let error;
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                            `Status Code: ${statusCode}`);
        }
        if (error) {
            console.error(error.message);
            // Consume response data to free up memory
            res.resume();
            return;
        }
        
       // res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
            //parsedData = JSON.parse(rawData);
            //returnResponse.sendFile(path.join(__dirname + '/index.htm'))
           // res.writeHead(header);

            returnResponse.send(res);
            //console.log(rawData);
            } catch (e) {
            console.error(e.message);
            }
        });

*/
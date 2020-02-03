const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.htm'))
})


const videoPath = 'assets/sample.mp4';

app.get('/video', function(req, res) {
  //const path = 'assets/sample.mp4'
  const startTime = process.hrtime()[1];
  console.log(startTime);
  const inputStream = fs.createReadStream(videoPath);
  const stat = fs.statSync(videoPath)
  const fileSize = stat.size
  console.log(fileSize);
  const range = req.headers.range;

  if (!true) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1

    if(start >= fileSize) {
      res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
      return
    }
    
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }

    res.writeHead(206, head)
    file.pipe(res)
  } else {
    console.log('Header missing');
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    inputStream.pipe(res)
  }
  const endTime =  process.hrtime()[1];
  console.log('Time Diff: ' + endTime-startTime);
})

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})

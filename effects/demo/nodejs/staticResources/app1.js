const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer();

server.on('request', function (req, res) {
  if (req.url === '/index.html') {
    const data = fs.readFileSync('./public/index.html');
    res.write(data);
    res.end()
  }
})

server.listen(3000);
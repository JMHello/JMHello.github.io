const http = require('http')
const fs = require('fs')

const server = http.createServer()

server.on('request', (req, res) => {
  if (req.url === '/b.html') {
    const data = fs.readFileSync('./b.html')
    res.end(data)
  }
  else if (req.url == '/data.json') {
    const data = fs.readFileSync('./data.json')
    res.end(data)
  }
})

server.listen(3002)
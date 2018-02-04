const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
  if (req.url === '/data.js') {
    res.writeHead(200, {
      'Content-Type': 'application/x-javascript'
    })
    res.end(`jsonp("jsonp 可以了")`)
  }
})

server.listen(3000)
const http = require('http')
const fs = require('fs')
const server = http.createServer()

server.on('request', (req, res) => {
  const url = req.url
  
  if (url === '/') {
    const data = fs.readFileSync('./index.html')
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })

    res.end(data)
  }
})

server.listen(3000)
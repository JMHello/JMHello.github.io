const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
  if (req.url === '/upload') {
    req.on('data', data => {
      console.log(data.toString())
      res.end(data.toString())
    })
  }
})

server.listen(3000)
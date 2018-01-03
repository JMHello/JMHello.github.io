const http = require('http');
const path = require('path');

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url === '/') {
    const url_1 = 'http://localhost:8080/static/'
    const url_2 = '/static/index.html'
    console.log(path.resolve(url_1, url_2))
    console.log(path.join(url_1, url_2))

    res.end('ok');
  }
})

server.listen(3000);
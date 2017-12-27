const http = require('http');
const url = require('url');

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url === '/') {
    console.log(url)
    const url_1 = 'http://localhost:8080/static/css/index.css'
    console.log(url.parse(url_1))


    const url_2 = 'http://example.com:8080/one?a=index&t=article&m=default'
    console.log(url.parse(url_2))

    res.end('ok');
  }
})

server.listen(8080);
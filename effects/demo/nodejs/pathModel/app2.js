const http = require('http');
const path = require('path');

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url === '/') {
    const url_1 = 'http://localhost:8080/static/css/index.css'
    console.log(path.parse(url_1))
    console.log(path.dirname(url_1))
    console.log(path.basename(url_1))
    console.log(path.extname(url_1))

    const url_2 = 'http://www.jmazm.com/2017/12/25/discrimination-new-and-function-call/'
    console.log(path.parse(url_2))
    console.log(path.dirname(url_2))
    console.log(path.basename(url_2))
    console.log(path.extname(url_2))

    res.end('ok');
  }
})

server.listen(8080);
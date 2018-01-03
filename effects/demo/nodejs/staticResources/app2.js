const http = require('http');
const path = require('path');
const fs = require('fs');
const mime = require('./module/mime');

const server = http.createServer();

server.on('request', function (req, res) {

  // 配置好静态资源的路径
  const url = req.url;
  const pathParse = path.parse(url);
  const pathname = '/public' + pathParse.dir + '/' + pathParse.base;
  const realPath = path.resolve(__dirname + pathname);

  // 判断静态资源是否存在
  fs.exists(realPath, function (exists) {
    if (!exists) {
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      })
      res.write("404, NOT FOUND!!");
      res.end();
    } else {
      fs.readFile(realPath, function (err, data) {
        if (err) {
          res.writeHead(500, {
            'Content-Type': 'text/plain'
          });
          res.end(err);
        } else {
          const extname = path.extname(pathname);
          console.log(extname);
          const contentType = mime[extname] || 'text/plain';
          res.writeHead(200, {
            'Content-Type': contentType
          })
          res.write(data);
          res.end();
        }
      })
    }
  })
})

server.listen(3001);
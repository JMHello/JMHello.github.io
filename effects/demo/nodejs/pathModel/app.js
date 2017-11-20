const http = require('http');
const path = require('path');

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url === '/') {
    const p1 = 'http://localhost:8080/';
    const p2 = 'http://localhost:8080/public/index.html';
    const p3 = 'E:\\projectAndNote\\homework';
    res.write(JSON.stringify({
      data: {
        parse: {
          1: path.parse(p1),
          2: path.parse(p2),
          3: path.parse(p3),
        },
        ext: {
          1: path.extname(p1),
          2: path.extname(p2),
          3: path.extname(p3),
        },
        basename: {
          1: path.basename(p1),
          2: path.basename(p2),
          3: path.basename(p3),
        },
        dirname: {
          1: path.dirname(p1),
          2: path.dirname(p2),
          3: path.dirname(p3),
        },
        format: {
          1:{
            root: '/ignored',
            dir: '/home/user/dir',
            base: 'file.txt'
          },
          2: path.format({
            root: '/',
            base: 'file.txt',
            ext: 'ignored'
          }),
          3: path.format({
            root: '/',
            name: 'file',
            ext: '.txt'
          }),
          4: path.format({
            dir: 'C:\\path\\dir',
            base: 'file.txt'
          })
        },
        isAbs: {
          1: path.isAbsolute('/foo/bar'),
          2: path.isAbsolute('/baz/..'),
          3: path.isAbsolute('qux/'),
          4: path.isAbsolute('//server'),
          5: path.isAbsolute('\\\\server'),
          6: path.isAbsolute('qux/'),
        }

      }
    }));
    res.end();
  }
})

server.listen(8080);
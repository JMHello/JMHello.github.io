const http = require('http');
const path = require('path');

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url === '/') {
    const a = '/a'
    const b = '/b'
    const c = './c'
    const d = '../d'
    const dirname = __dirname

    // E:\projectAndNote\JMHello.github.io\effects\demo\nodejs\pathModel
    console.log(dirname)

    // E:\projectAndNote\JMHello.github.io\effects\demo\nodejs\pathModel\a
    console.log(path.join(dirname, a))
    // E:\projectAndNote\JMHello.github.io\effects\demo\nodejs\pathModel\c
    console.log(path.join(dirname, c))
    // E:\projectAndNote\JMHello.github.io\effects\demo\nodejs\d
    console.log(path.join(dirname, d))

    // \a
    console.log(path.join(a))
    // c
    console.log(path.join(c))
    // ..\d
    console.log(path.join(d))

    // \a\b\c
    console.log(path.join(a, b, c))
    // \a\d
    console.log(path.join(a, b, d))

    // \a\b\d
    console.log(path.join(a, b, c, d))

    // \c\a
    console.log(path.join(c, a))
    res.end('ok');
  }
})

server.listen(3000);
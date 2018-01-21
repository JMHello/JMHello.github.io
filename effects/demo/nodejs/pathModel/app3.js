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

    // E:\a
    console.log(path.resolve(dirname, a))
    // E:\projectAndNote\JMHello.github.io\effects\demo\nodejs\pathModel\c
    console.log(path.resolve(dirname, c))
    // E:\projectAndNote\JMHello.github.io\effects\demo\nodejs\d
    console.log(path.resolve(dirname, d))

    // E:\a
    console.log(path.resolve(a))
    // E:\projectAndNote\JMHello.github.io\effects\demo\nodejs\pathModel\c
    console.log(path.resolve(c))
    // E:\projectAndNote\JMHello.github.io\effects\demo\nodejs\d
    console.log(path.resolve(d))

    // E:\b\c
    console.log(path.resolve(a, b, c))
    // E:\d
    console.log(path.resolve(a, b, d))

    // E:\b\d
    console.log(path.resolve(a, b, c, d))

    // E:\a
    console.log(path.resolve(c, a))
    res.end('ok');
  }
})

server.listen(3000);
const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
  if (req.method.toLowerCase() === 'options') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'// 如果缺乏了这个字段，就无法接收客户端传来的数据
    })
    res.end(JSON.stringify({
      method: req.method
    }))
  }

  if (req.url === '/upload') {
    console.log('upload')
    req.on('data', data => {
      console.log('data')
      res.writeHead(200, {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'
      })
      res.end(data)
    })
  }

  res.on('end', () => console.log('数据接受完毕！'))
})

server.listen(3000)
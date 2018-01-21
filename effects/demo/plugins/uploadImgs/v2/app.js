const http = require('http')
const fs = require('fs')
const formidable = require('./multipart_parser.js')

const server = http.createServer()

server.on('request', (req, res) => {
  const url = req.url
  if (url === '/upload') {
    new formidable(req, (fields, files) => {
      // 跨域
      res.setHeader('Access-Control-Allow-Origin', '*')

      // 如果有上传图片，则在根目录下生成此图片
      // if (files.file) {
      //   fs.writeFile('./newPic.png', files.file.data, (err) => {
      //     if (err) {
      //       console.log(err)
      //     }
      //   })
      // }

      res.write(JSON.stringify({
        fields: fields,
        files: files
      }))

      res.end()
    }, '/uploads')
  }
})

server.listen(3000)
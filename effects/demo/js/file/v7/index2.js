const http = require('http')
const fs = require('fs')
const formidable = require('formidable')

const server = http.createServer()

server.on('request', (req, res) => {
  const url = req.url

  if (url === '/') {

  } else if (url === '/upload') {
    const form = new formidable.IncomingForm()
    form.parse(req, function(err, fields, files) {
      // 跨域
      res.setHeader('Access-Control-Allow-Origin', '*')

      
      // fs.writeFile('./newPic.png', data[0].file, (err) => {
      //   if (err) {
      //     console.log(err)
      //   }
      // })

      form.uploadDir = "/my/dir";
      form.multiples = true;
      res.write(JSON.stringify({
        fields: fields,
        files: files
      }))

      res.end('ok')
    });
  }
})

server.listen(3000)
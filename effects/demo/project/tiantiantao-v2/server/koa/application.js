const http = require('http')

/**
 * 模仿jquery搭建服务器基本框架
 * @returns {Koa.init}
 * @constructor
 */
function Koa () {
  return new Koa.fn.init()
}

Koa.fn = Koa.prototype = {
  constructor: Koa,
  init: function () {
    this.staticPath = ``
  },
  /**
   *
   * @param path
   */
  setSaticPath: function (path) {
    this.staticPath = path
  },
  listen: function (port, callback) {
    const server = http.createServer()
    server.on('request', (req, res) => {
      // 处理icon
      if (pathname == '/favicon.ico') {

      }
      // 处理非静态资源的请求
      else if () {

      }
      // 处理静态资源的请求
      else {

      }
    })
    server.listen(port, callback)
  }
}

Koa.fn.init.prototype = Koa.fn

module.exports = Koa

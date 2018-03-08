const http = require('http')
const bodyParser = require('./bodyParser')
const router = require('./router')

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
    this.middleware = []
  },
  /**
   *
   * @param path
   */
  setSaticPath: function (path) {
    this.staticPath = path
  },
  listen: function (...args) {
    const server = http.createServer()
    const isAPIReg = /^\/[^.]*?$/

    server.on('request', (req, res) => {
      const ctx = bodyParser(req, res, this.staticPath)
      const pathname = ctx.url.pathname

      // 处理icon
      if (pathname == '/favicon.ico') {
        return
      }
      // 处理非静态资源的请求
      else if (isAPIReg.test(pathname)) {
        router.dealWithAPI(ctx)
      }
      // 处理静态资源的请求
      else {
        router.dealWithStatic(ctx)
      }
    })
    server.listen(...args)
  },
  /**
   * get 方法
   * @param api 路由
   * @param cb 回调函数
   */
  get: function (api, cb) {
    router[api] = cb
  },
  /**
   * post 方法
   * @param api 路由
   * @param cb 回调函数
   */
  post: function (api, cb) {
    router[api] = cb
  },
  /**
   * put 方法
   * @param api 路由
   * @param cb 回调函数
   */
  put: function (api, cb) {
    router[api] = cb
  },
  /**
   * delete 方法
   * @param api 路由
   * @param cb 回调函数
   */
  delete: function (api, cb) {
    router[api] = cb
  }
}

Koa.fn.init.prototype = Koa.fn

module.exports = Koa

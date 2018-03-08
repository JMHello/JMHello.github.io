const url = require('url')

function bodyParser (req, res, staticPath) {
  const ctx = {}

  ctx.req = req
  ctx.res = res
  ctx.url = url.parse(req.url)
  ctx.method = req.method
  ctx.params = {}
  ctx.reqBody = {}
  ctx.resBody = {}
  ctx.staticPath = staticPath

  return ctx
}

module.exports = bodyParser
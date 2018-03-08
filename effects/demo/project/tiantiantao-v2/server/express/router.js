const fs = require('fs')
const path = require('path')
const mimetype = require('./mimetype')
const statusCode = require('./statusMap')

let router = {
  gets: {},
  posts: {},
  puts: {},
  deletes: {},
  /**
   * 处理静态资源
   * @param ctx
   */
  dealWithStatic: (ctx) => {
    const res = ctx.res
    const pathname = ctx.url.pathname
    const realname = path.join(ctx.staticPath, pathname)

    fs.exists(realname, isExisted => {
      // 文件不存在
      if (!isExisted) {
        res.writeHead(404, {
          'Content-Type': 'text/plain; charset=utf8'
        })
        res.end(`This request url "${pathname}" was not found in this server`)
      }
      // 文件存在
      else {
        // 读取文件数据
        fs.readFile(realname, (err, chunk) => {
          // 读取文件错误
          if (err) {
            res.writeHead(500, {
              "Content-Type": 'text/plain; charset=utf-8'
            })
            res.end(err)
          }
          // 读取文件成功
          else {
            // 根据路径读取文件后缀名
            const ext = `.${pathname.split('.')[1]}`

            res.writeHead(200, {
              // 根据文件后缀名，通过mimetype.js获取对应的content-type
              'Content-Type': mimetype[ext]
            })

            res.end(chunk)
          }
        })
      }
    })

  },
  /**
   * 处理非静态资源
   * @param ctx
   */
  dealWithAPI: (ctx) => {
    const req = ctx.req
    const res = ctx.res
    const method = req.method

    switch (method) {
      case `GET`:
        break
      case 'POST':
        handleCategoryAPI(this.posts, ctx)
        break
      case 'PUT':
        handleCategoryAPI(this.puts, ctx)
        break
      case 'DELETE':
        break
      case 'OPTIONS':
        break
      default:
        handleFailure(ctx, {
          code: 405,
          info: `不支持${method}方法`,
          headers: {
            'Content-Type': 'application/json',
            'Allow': 'GET/POST/PUT/DELETE/OPTIONS'
          }
        })
    }
  }
}

module.exports = router

/**
 * 处理API
 * @param methodObj
 * @param ctx
 * @returns {Promise.<void>}
 */
async function handleCategoryAPI (methodObj, ctx) {
  const req = ctx.req
  const pathname = ctx.url.pathname

  // 处理无参路由：/user/login
  if (methodObj[pathname]) {
    await handleSuccess(ctx)
    return
  }

  // 处理有参路由：/user/:id
  const isRegAPI = handleUrlByParams(methodObj, pathname)
  if (isRegAPI) {
    await handleNamesAndValues(isRegAPI, ctx)
  }

  // 若不存在，则返回404
  handleFailure(ctx, {
    code: 404,
    info: '此接口不存在'
  })
}

/**
 * 请求成功
 * @returns {Promise.<void>}
 */
async function handleSuccess (ctx) {
  const req = ctx.req
  const method = ctx.method

  if (method === 'POST' || method === 'PUT') {
    req.on('data', (data) => {
      console.log(data.toString())
    })
  }
}

/**
 *
 * @param ctx
 * @param cfg
 * @example {
 *  code: 状态码，必填
 *  info: 返回的错误信息，选填
 *  headers: 响应头对象，选填
 * }
 * @returns {Promise.<void>}
 */
async function handleFailure (ctx, cfg) {
  const res = ctx.res
  const code = cfg.code
  const info = cfg.info || getCodeInfo(code)
  const headers = cfg.headers || {
    'Content-Type': 'application/json'
  }

  res.writeHead(code, headers)

  res.end(JSON.stringify({
    error: info
  }))
}

/**
 * 处理带有参数的url
 * @param methodObj 存储api的对象
 * @param pathname 路径
 * @return {Promise.<*>}
 */
async function handleUrlByParams (methodObj, pathname) {
  let apiReg = ''
  let names = []
  let values = []
  // 遍历对象
  for (var url in methodObj) {
    // 先替换
    apiReg = url
      .replace(/\//g, '\/')
      .replace(/\?/g, '\?')

    // 获取参数名，存储到names数组里
    names = apiReg.match(/:\w(?=\\\/|\\\?|&|$)/g)

    // 继续替换
    apiReg = apiReg.replace(/:\w+(\\\/|\\\?|&|$)/g, '([\\w\u4e00-\u9fa5]*?)$1')

    // 将字符串转化为正则表达式
    apiReg = new RegExp(`^${apiReg}$`)

    // 获取参数值，存储到values数组里
    let apiRegResult = pathname.match(apiReg)
    if (apiRegResult && apiRegResult.length) {
      values = apiRegResult.splice(1)
      return {
        names,
        values
      }
    }
  }

  return false
}

/**
 * 将参数名数组和参数值数组转化为名值一一对应的对象形式
 * @param obj
 * @param ctx
 * @return {Promise.<void>}
 */
async function handleNamesAndValues (obj, ctx) {
  const names = obj.names
  const values = obj.values

  names.forEach((item, i) =>{
    ctx.params[item] = values[i]
  })
}

/**
 * 获取状态码信息
 * @param code
 * @returns {*}
 */
function getCodeInfo (code) {
  return statusCode[code]
}


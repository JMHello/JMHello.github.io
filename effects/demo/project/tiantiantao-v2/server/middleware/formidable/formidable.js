const multipartParser = require('./multipart_parser')
const jsonParser = require('./json_parser')
const urlencodedParser = require('./urlencoded_parser')

class Formidable {
  constructor (req) {
    this.req = req
    this.bufferData = null
    this.str = ''
    this.headers = null
  }

  /**
   * 获取表单数据
   */
  getFormData () {
    const req = req
    let arr = []
    req.on('data', chunk => {
      arr.push(chunk)
    })

    req.on('end', () => {
      if (arr.length === 0) {
        return
      }

      this.bufferData = Buffer.concat(arr)
      this.str = this.bufferData.toString()
      this.dealWithForm()
    })
  }

  /**
   * 处理不同类型的表单数据
   */
  dealWithForm () {
    const req = this.req
    this.headers = req.headers

    if (!this.headers['content-type']) {
      return
    }

    if (this.headers['content-type'].match(/urlencoded/i)) {
      return
    }

    if (this.headers['content-type'].match(/multipart/i)) {
      return
    }

    if (this.headers['content-type'].match(/json/i)) {
      return
    }
  }
  _initJson () {
    return new jsonParser()
  }
  _initUrlencoded () {
    return new urlencodedParser()
  }
  _initMultipart () {
    return new multipartParser()
  }
  /**
   * 初始化
   */
  init () {
    this.getFormData()
  }
}

module.exports = Formidable
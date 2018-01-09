class MultipartParser {
  constructor (req, cb) {
    this.req = req // req 请求
    this.cb = cb // 回调函数
    this.bufferData = null // buffer 数据
    this.str = null // buffer 转化为 utf8 格式的字符串
    this.result = [] // 存储field数据的数组
    this.fieldHeaders = [] // 存储字段头信息的数组
    // 初始化
    this.init()
  }

  /**
   * 初始化函数
   */
  init () {
    this.getData()
  }

  /**
   * 获取数据
   */
  getData () {
    let req = this.req
    let arr = []

    req.on('data', chunk => {
      // 这里将传来的buffer数据push到数组是因为：
      // 如果传来的数据过大，那么所传的数据是不可能一次性传完的，可能会一段一段地传
      // 为了获取完整的数据，需要将正一段段buffer放到一个数组里
      arr.push(chunk)
    })

    // 接收数据完毕，才处理arr数组里的buffer数据
    req.on('end', () => {
      if (arr.length === 0) {
        return
      }

      // 将多个buffer对象结合为一个buffer对象
      this.bufferData = Buffer.concat(arr)

      // 将buffer对象转化为utf8格式的字符串
      this.str = this.bufferData.toString()

      this.getInfo()
      this.getBinary()
    })
  }
  /**
   * 获取非binary信息
   */
  getInfo () {
    const str = this.str

    // 通过\r\n分隔，数组中第一个元素肯定是分隔符，即boundary
    const boundary = str.split('\r\n')[0]

    // 利用boundary 分隔每部分数据，即field
    this.fieldHeaders = str.split(boundary)


    // 取出''和 '--'
    this.fieldHeaders = this.fieldHeaders.slice(1, this.fieldHeaders.length - 1)

    let fields = {}
    let files = {}
    
    for (let item of this.fieldHeaders) {
      const fileName =  item.indexOf('filename') > -1 ? item.match(/\sfilename="(.*?)"/)[1] : ''
      const name = item.match(/\sname="(.*?)"/)[1]
      const disposition = item.match(/\r\nContent-Disposition:\s(.*?);/)[1]

      // 文件
      if (fileName) {
        const contentType = item.indexOf('Content-Type') > -1 ? item.match(/\r\nContent-Type:\s(.*?)\r\n/)[1] : ''
        // 利用正则匹配，获取每部分数据的特征信息
        files[name] = {
          fileName: fileName,
          contentType: contentType,
          data: null
        }
      }
      // 字段
      else {
        fields[name] = null
      }
    }
    
    this.result = {
      fields: fields,
      files: files,
    }
  }

  /**
   * 获取binary
   */
  getBinary () {
    const fields = this.result.fields
    const files = this.result.files

    let startBuf = new Buffer('\r\n\r\n') //  每一个binary 数据开头（相当于两次换行）
    let endBuf = new Buffer('\r\n------') // 每一个 binary 数据结尾
    let position = 0
    // console.log(this.bufferData)
    // console.log(this.bufferData.toString())
    // console.log(this.fieldHeaders)

    let startArr = []
    let endArr = []


    // fieldHeaders 有多少个，就证明有多少个表单字段，利用其获取对应的Index

    this.fieldHeaders.forEach((item, index) => {
      const name = item.match(/\sname="(.*?)"/)[1]
      const fileName =  item.indexOf('filename') > -1 ? item.match(/\sfilename="(.*?)"/)[1] : ''

      // 一开始，startPos 必须 + 4，4是指'\r\n\r\n'4个字节，否则无法读取正确的文件数据（表单数据则无所谓）
      let startPos = this.bufferData.indexOf(startBuf, position) + 4
      let endPos = this.bufferData.indexOf(endBuf, position)


      // 获取每一个binary 数据开头的位置，并存到数组里
      while (startPos > -1) {
        startArr.push(startPos)
        startPos = this.bufferData.indexOf(startBuf, startPos + 1)
      }

      // 每一个 binary 数据结尾的位置，并存到数组里
      while (endPos > -1) {
        endArr.push(endPos)
        endPos = this.bufferData.indexOf(endBuf, endPos + 1)
      }


      // 上传的是文件
      if (fileName) {
        files[name].data = this.bufferData.slice(startArr[index], endArr[index])
      }
      // 上传的表单数据
      else {
        const data = this.bufferData.slice(startArr[index], endArr[index])

        // 如果存在'\r\n'才需要切割字符串，否则不需要
        if (data.indexOf(startBuf) === 0) {
          fields[name] = data.toString().split('\r\n\r\n')[1]
        } else {
          fields[name] = data.toString()
        }
      }
    })

    
    // 回调函数传递数据
    this.cb(this.result.fields, this.result.files)
  }
}

module.exports = MultipartParser

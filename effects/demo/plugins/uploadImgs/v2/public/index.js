const msg = {

}

let UploadImgPlugin = {
  wrapper: null,
  ajaxUrl: null,
  fileInput: null,
  dropTarget: null,
  imgArea: null,
  uploadFiles: [], // 存储初始上传图片的数组
  filterFiles: [], // 存储过滤后图片的数组
  compressedFiles: [], // 存储压缩后图片的数组
  maxSize: 1024 * 1024 * 2, // 上传图片的最大限制：1M
  maxNum: 10, // 上传图片的最大张数（用户设置的）
  _maxNum: 15, //上传图片的最大张数（内部最大限制）
  /**
   * 插件基本结构模板
   * @returns {string}
   */
  createBasicStruTpl () {
    let str = `
      <div class="upload-img">
        <div class="upload-area">
            <!-- 点击上传文件 -->
            <div class="upload-file-area clicking-upload-area">
                <img src="imgs/upload.png" class="upload-logo">
                <input type="file" id="file" class="upload-file-input" multiple>
            </div>
            <!-- 将文件拖拽到此处 -->
            <div class="upload-file-area drop-target-area">
                将文件拖拽到此处
            </div>
        </div>
        <!-- 图片信息 -->
        <div class="text-area">
           <div class="text-wrap">
              选中<span class="img-num"> 0 </span>张文件，共<span class="img-size"> 0 </span><span>B</span> （最多上传 ${this.getPicMaxNum()}张）
          </div>
          <button type="button" class="btn js-upload">上传</button>
          <button type="button" class="btn js-clear">清空</button>
        </div>
        <!-- 展示图片区域 -->
        <div class="img-area"></div>
    </div>
    `
    return str
  },
  /**
   * 图片结构模板
   */
  createImgStruTpl (name, url, index) {
    let str = `
        <div class="img-item">
            <div class="img-item-text">
                <p class="img-item-title">${name}</p>
                <span class="del" data-index="${index}">x</span>
            </div>
            <div class="img-wrap">
                <img src="${url}">
            </div>
            <div class="upload-progress hide">
                <div class="progress-running active"></div>
                <span class="progress-txt">0%</span>
            </div>
        </div>
    `
    return str
  },
  /**
   * 获取图片的最大张数
   */
  getPicMaxNum () {
    return this.maxNum <= this._maxNum ? this.maxNum : this._maxNum
  },
  /**
   * 展示要上传的图片
   */
  async showUploadImgs () {
    // 清空数组
    this.compressedFiles = []
    let str = ''

    const len = this.uploadFiles.length

    for (let i = 0; i < len; i++) {
      const file = this.uploadFiles[i] // 原图片文件
      const url = await this._readFileAsync(file) // 原图片的URL
      const img = await this._loadImg(url) // 获取原图片
      const compressedImgUrl = await this._compressImgs(file, img) // 压缩原图片后的URL
      str += this.createImgStruTpl(file.name, compressedImgUrl, i) // 图片模板
      this.compressedFiles.push (compressedImgUrl)
    }

    this.imgArea.innerHTML = str
 },
  /**
   * 过滤图片
   */
  filterImgs () {
    const maxSize = this.maxSize

    this.uploadFiles = this.uploadFiles.filter((file, index) => {
      return (file.size <= maxSize)
    })


  },
  /**
   * 清空要上传的图片
   */
  clearAllImg () {
    this.uploadFiles = []
    this.compressedFiles = []
    this.imgArea.innerHTML = ''
  },
  /**
   * 删除某一张图片
   */
  delSomeImg (index) {
    // 1. 删除 `this.uploadFiles` 里对应的项
    this.uploadFiles.splice(index, 1)
    // 2. 删除 `this.compressedFiles` 里对应的项
    this.compressedFiles.splice(index, 1)

    // 3. 删除展示在页面上对应的图片
    let imgItem = [...this.imgArea.querySelectorAll('.img-item')]
    imgItem.splice(index, 1)

    // 更新视图
    this.imgArea.innerHTML = ''
    for (let item of imgItem) {
      this.imgArea.appendChild(item)
    }

    // 更新data-index
    const del = [...this.wrapper.querySelectorAll('.del')]
    del.forEach((item, i) => {
      item.setAttribute('data-index', i)
    })

  },
  ajax (index, uploadProgress) {
    const url = this.ajaxUrl

    const xhr = new XMLHttpRequest()
    xhr.open('post', url, true)

    xhr.onerror = (e) => {
      console.log(e)
    }

    // xhr.upload.onprogress = (e) => {
    //   if (e.lengthComputable) {
    //     uploadProgress.classList.remove('hide')
    //     const span = uploadProgress.querySelector('.progress-txt')
    //     span.innerHTML = `${e.loaded / e.total * 100}%`
    //   }
    // }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          console.log(xhr.responseText)
        }
      }
    }

    let formData = new FormData()
    formData.append(`file${index}`, this.uploadFiles[index])
    xhr.send(formData)
  },
  /**
   * 处理表单控件
   * @param e
   */
  handleInputFile (e) {
    const ev = e || window.event
    let files = [...ev.target.files]
    const maxPicNum = this.getPicMaxNum()

    for (let file of files) {
      this.uploadFiles.push(file)
    }
    this.uploadFiles = this.uploadFiles.slice(0, maxPicNum)

    // 过滤图片
    this.filterImgs()
    // 展示要压缩的图片
    this.showUploadImgs()
  },
  /**
   * 处理拖放文件
   * @param e
   */
  handleDragFile (e) {
    let files = []
    const ev = e || window.event
    ev.preventDefault()

    if (ev.type === 'drop') {
      files = [...ev.dataTransfer.files]
      const maxPicNum = this.getPicMaxNum()

      for (let file of files) {
        this.uploadFiles.push(file)
      }

      this.uploadFiles = this.uploadFiles.slice(0, maxPicNum)

      // 过滤图片
      this.filterImgs()
      // 展示要压缩的图片
      this.showUploadImgs()
    }
  },
  /**
   * 处理点击事件
   * @param e
   */
  async handleClick (e) {
    e = e || window.event
    const target = e.target
    const cName = target.classList

    if (cName.contains('del')) {
      const index = target.getAttribute('data-index')
      this.delSomeImg(index)
    }
    else if (cName.contains('js-clear')) {
      this.clearAllImg()
    }
    else if (cName.contains('js-upload')) {
      const uploadProgress = this.wrapper.querySelectorAll('.upload-progress ')

      this.uploadFiles.forEach((file, i) => {
        this.ajax(i, uploadProgress[i])
      })
    }
  },
  /**
   * 事件绑定
   */
  bindEvent () {
    const wrapper = this.wrapper
    const fileInput = this.fileInput
    const dropTarget = this.dropTarget

    wrapper.addEventListener('click', this.handleClick.bind(this), false)
    fileInput.addEventListener('change', this.handleInputFile.bind(this), false)
    dropTarget.addEventListener('dragenter', this.handleDragFile.bind(this), false)
    dropTarget.addEventListener('dragover', this.handleDragFile.bind(this), false)
    dropTarget.addEventListener('drop', this.handleDragFile.bind(this), false)


  },
  /**
   * 初始化
   * @param config
   */
  init (config) {
    const cfg = Object.assign({}, config)
    this.wrapper = cfg.wrapper || document.body
    this.ajaxUrl = cfg.url
    console.log(this.ajaxUrl)
    this.maxSize = cfg.maxSize || this.maxSize
    this.maxNum = cfg.maxNum || this.maxNum

    this.wrapper.innerHTML = this.createBasicStruTpl()
    this.fileInput = this.wrapper.querySelector('.upload-file-input')
    this.dropTarget = this.wrapper.querySelector('.drop-target-area')
    this.imgArea = this.wrapper.querySelector('.img-area')

    this.bindEvent()
  },
  /**
   * 异步读取文件
   * @param file
   * @returns {Promise}
   * @private
   */
  async _readFileAsync (file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()

      fileReader.onerror = (e) => {
        reject(e)
      }

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.readAsDataURL(file)
    })
  },
  /**
   * 读取图片
   * @param url
   * @returns {Promise}
   * @private
   */
  async _loadImg (url) {
    return new Promise((resolve, reject) => {
      const img = new Image()

      img.onerror = () => {
        reject()
      }

      img.onload = () => {
        resolve(img)
      }

      img.src = url
    })
  },
  /**
   * 压缩图片
   */
  _compressImgs (file, img) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    let scale = 1
    if (img.width > img.height) {
      scale = 120 / img.width
    } else {
      scale = 130 / img.height
    }

    canvas.width = scale * img.width
    canvas.height = scale * img.height

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL(file.type, 0.92)
  },
}



/**
 * 上传图片插件对外接口
 * @param config
 * @example {
 * wrapper: 必填，插件容器
 * url: 必填，发送ajax请求的url
 * maxSize: 选填，上传的图片的最大size，默认 2M，
 * maxNum：选填，上传图片的最大张数，默认是10，最大不能超过15
 * }
 */
function uploadImg (config) {
  UploadImgPlugin.init(config)
}
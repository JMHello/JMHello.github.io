/**
 * @desc 分页插件模块
 * @type {{}}
 */
let PaginationModel = {
  wrapper: null, // 分页插件容器
  listWrapper: null, // 页数列表
  totalRecords: 0, // 总数据数
  totalPages: 0, // 总页数
  currentPage: 1, // 当前页
  perPage: 10, // 每页展示的数据数目
  ajax: null,
  /**
   * @desc 设置分页插件基本结构
   * @returns {string}
   */
  setBasicStruc: function () {
    let tR = this.totalRecords
    let tP = this.totalPages
    let content = ''
    // 没有数据
    if (tP === 0) {
      content = `<div class="pagination"><small class="tips">暂无数据</small></div>`
    } else { // 有数据
      content = `<div class="pagination">
                      <a href="javascript:;" class="btn js-prev-page">上一页</a>
                      <a href="javascript:;" class="btn js-begin-page">首页</a>
                      <ul class="list"></ul>
                      <a href="javascript:;" class="btn js-next-page">下一页</a>
                      <a href="javascript:;" class="btn  js-end-page">尾页</a>
                      <span class="info">共<em class="txt totalPages">${tP}</em>页，共<em class="txt totalRecords">${tR}</em>条记录</span>
                  </div>`
    }
    return content
  },
  /**
   * @desc 设置页数列表项
   */
  setList: function () {
    let cP = this.currentPage
    let tP = this.totalPages
    let list = ''
    // 1 2 3 4 5
    if (tP <= 5) {
      for (let i = 1; i <= tP; i++) {
        list += `
            <li class="list-item">
                <a href="javascript:;" class="page-${i}">${i}</a>
            </li>
            `
      }
    }
    // 1 2 3 4 5  ... 20
    else if (cP <= 4) {
      for (let i = 1; i <= 5; i++) {
        list += `
            <li class="list-item">
                <a href="javascript:;" class="page-${i}">${i}</a>
            </li>
            `
      }
      list += `
            <li class="list-item">
            ...
            </li>
             <li class="list-item">
                <a href="javascript:;" class="page-${tP}">${tP}</a>
            </li>
            `
    }
    // 1 ... 16 17 18 19 20
    else if ([tP - 3, tP - 2, tP - 1, tP].includes(cP)) {
      let arr = [tP - 4, tP - 3, tP - 2, tP - 1, tP]
      list += `
            <li class="list-item">
                <a href="javascript:;" class="page-${1}">${1}</a>
            </li>
            <li class="list-item">
            ...
            </li>
            `
      for (let i = 0; i < 5; i++) {
        list += `
            <li class="list-item">
                <a href="javascript:;" class="page-${arr[i]}">${arr[i]}</a>
            </li>
            `
      }
    }
    // 1 ... 7 8 9 10 11 ... 20
    else {
      let centerArr = [cP - 2, cP - 1, cP, cP + 1, cP + 2]
      list += `
            <li class="list-item">
                <a href="javascript:;" class="page-${1}">${1}</a>
            </li>
            <li class="list-item">
            ...
            </li>
            `
      for (let i = 0; i < 5; i++) {
        list += `
            <li class="list-item">
                <a href="javascript:;" class="page-${centerArr[i]}">${centerArr[i]}</a>
            </li>
            `
      }
      list += `
            <li class="list-item">
            ...
            </li>
            <li class="list-item">
                <a href="javascript:;" class="page-${tP}">${tP}</a>
            </li>
            `
    }
    return list
  },
  /**
   * @desc 更新数据
   */
  update: function (opts) {
    const config = Object.assign({}, opts)
    // 更新页数展示列表
    this.currentPage = config.currentPage
    this.listWrapper.innerHTML = this.setList()
    // 当前页数添加类名active，否则移除类名
    const listArr = JM.getEles(this.wrapper, `.list a`)
    const activeEle = JM.getEle(this.wrapper, `.page-${this.currentPage}`)
    for (let item of listArr) {
      JM.removeClass(item, 'active')
    }
    JM.addClass(activeEle, 'active')
    // 获取数据
    this.getData({
      currentPage: this.currentPage,
      perPage: this.perPage
    })
  },
  /**
   * @desc 点击事件
   */
  clickHandler: function (e) {
    const target = JM.getTarget(JM.getEvent(e))
    const cName = target.className
    const btnReg = /\bjs-(.*)-page\b/
    const btnMatchResult = cName.match(btnReg) ? cName.match(btnReg)[1] : ''
    // 记录按下一页前的页数
    let oldPage = this.currentPage
    let cP = 0
    switch (btnMatchResult) {
      // 上一页按钮
      case 'prev':
        cP = this.currentPage > 1 ? --this.currentPage : 1
        if (cP !== oldPage) {
          this.update({
            currentPage: cP
          })
        }
        break
      // 下一页按钮
      case 'next':
        cP = this.currentPage < this.totalPages ? ++this.currentPage : this.totalPages
        if (cP !== oldPage) {
          this.update({
            currentPage: cP
          })
        }
        break
      // 首页按钮
      case 'begin':
        cP = 1
        if (cP !== oldPage) {
          this.update({
            currentPage: cP
          })
        }
        break
      // 尾页按钮
      case 'end':
        cP = this.totalPages
        if (cP !== oldPage) {
          this.update({
            currentPage: cP
          })
        }
        break
      // 其他页数按钮
      default:
        const numReg = /\bpage-(.*)\b/
        const matchResult = cName.match(numReg)
        // 匹配成功并且元素无.active类（即：非当前页数）才更新数据
        if (matchResult && !JM.hasClass(target, 'active')) {
          const cur = parseInt(matchResult[1])
          this.update({
            currentPage: cur
          })
        }
    }
  },
  /**
   * @desc 事件绑定
   */
  bindEvent: function () {
    JM.on(document.body, 'click', this.clickHandler.bind(this))
  },
  /**
   * 获取数据
   * @param options
   * @returns {Promise.<void>}
   */
  getData: async function (options) {
    const ajax = this.ajax
    await ajax(options)
      .then((result) => {
        this.totalPages = result.totalPages
        this.totalRecords = result.totalRecords
        this.currentPage = result.currentPage
        this.perPage = result.perPage
      })
      .catch((err) => console.log(err))
  },
  /**
   * @desc 初始化
   */
  init: async function (opts) {
    const config = Object.assign({}, opts)
    this.wrapper = config.wrapper
    this.ajax = config.ajax
    this.perPage = config.perPage || this.perPage
    // 初始化数据
    await this.getData({
      currentPage: this.currentPage,
      perPage: this.perPage
    })
    // 显示分页插件基本框架
    this.wrapper.innerHTML = this.setBasicStruc()
    // 有数据
    if (this.totalRecords) {
      this.listWrapper = JM.getEle(this.wrapper, '.list')
      this.listWrapper.innerHTML = this.setList()
      const defaultPageEle = JM.getEle(this.wrapper, `.page-${this.currentPage}`)
      JM.addClass(defaultPageEle, 'active')
      this.bindEvent()
    }
  }
}

/**
 * @desc 分页插件供外配置接口
 * @param {Object} opts 配置选项
 * @example {
 *  wrapper: document.body
 *  ajax: ajax
 *  perPage: 10
 * }
 * 接口说明
 * wrapper: 必传，分页插件容器
 * ajax: 必传，为function，其返回值为 - Promise，其值必须有
 * {
 * currentPage
 * totalPages
 * totalRecords
 * perPage
 * }
 * perPage: 可选，每页展示的数据数目
 */
function pagination (opts) {
  PaginationModel.init(opts)
}
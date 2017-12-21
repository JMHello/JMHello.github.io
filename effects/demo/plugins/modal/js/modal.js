const ModalModel = {
  modal: null,
  modalInner: null,
  modalHeader: null,
  target: null,
  draggable: false,
  disX: 0,
  disY: 0,
  /**
   * 设置拖拽属性
   */
  isDraggable () {
    this.modalHeader.setAttribute('draggable', true)
  },
  /**
   * 计算鼠标移动前的初始位置
   * @param e
   */
  countMouseInitPosition (e) {
    const modalInner = this.modalInner
    this.disX = e.clientX - modalInner.offsetLeft
    this.disY = e.clientY - modalInner.offsetTop
  },
  /**
   * 获取模态框最终的位置
   * @param e
   */
  getLastPosition (e) {
    const modalInner = this.modalInner
    modalInner.style.left = e.clientX - this.disX + 'px'
    modalInner.style.top = e.clientY - this.disY + 'px'
  },
  /**
   * 点击事件
   * @param e
   */
  clickHandler (e) {
    const target = e.target
    // 点击存在data-dismiss属性的元素，都会使模态框隐藏
    if (target.getAttribute('data-dismiss')) {
      this.classList.add('hide')
    }

    // 点击有data-target属性的元素，可以使对应的模态框出现
    let modal = target.getAttribute('data-target')
    if (modal) {
      modal = modal.slice(1)
      document.getElementById(modal).classList.remove('hide')
    }
  },
  /**
   * 事件绑定
   */
  bindEvent () {
    this.modal.addEventListener('click', this.clickHandler, false)
    this.target.addEventListener('click', this.clickHandler, false)
    // 如果this.draggable为true，才能实现模态弹框拖放
    if (this.draggable) {
      this.isDraggable()
      this.modalHeader.addEventListener('dragstart', this.countMouseInitPosition.bind(this), false)
      this.modalHeader.addEventListener('dragend', this.getLastPosition.bind(this), false)
    }
  },
  /**
   * 初始化
   * @param opts
   */
  init (opts) {
    this.modal = opts.modal
    this.target = opts.target
    this.draggable = opts.draggable
    this.modalInner = this.modal.querySelector('.modal-inner')
    this.modalHeader = this.modalInner.querySelector('.modal-header')
    this.bindEvent()
  }
}

/**
 * @desc 模态弹框对位接口
 * @param opts 配置对象
 * @example {
 * modal: document.getElementById('modal')
 * target: document.getElementById('btn')
 * draggable: true
 * }
 * 选项说明
 * modal: 必选，指模态弹框
 * target: 必选，触发模态弹框显示的元素，此元素必须有data-target属性，并且其属性值为 # + 对应的模态弹框的id值，例：data-target="#modal"
 * draggable: 可选，是否能拖拽模态弹框，默认为false
 * 补充：
 * 如果点击某个按钮，想让模态弹框消失，可以为此元素添加 data-dismiss="true"
 */
function modal (opts) {
  ModalModel.init(opts)
}
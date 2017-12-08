(function (window) {
  window.JM = {}

  /**
   * 获取单个元素
   * @param parent
   * @param ele
   */

  JM.getEle = (parent, ele) => parent.querySelector(ele)

  /**
   * 获取元素列表
   * @param parent
   * @param ele
   */
  JM.getEles = (parent, ele) => parent.querySelectorAll(ele)

  /**
   * 添加事件处理程序
   * @param ele
   * @param type
   * @param handleEvent
   * @param useCapture
   */
  JM.on = (ele, type, handleEvent, useCapture = false) => {
    if (ele.addEventListener) {
      ele.addEventListener(type, handleEvent, useCapture)
    } else if (ele.attachEvent) {
      ele.attachEvent(type, handleEvent)
    } else {
      ele[`on${type}`] = handleEvent
    }
  }

  /**
   * 移除事件处理程序
   * @param ele
   * @param type
   * @param handleEvent
   * @param useCapture
   */
  JM.off = (ele, type, handleEvent, useCapture = false) => {
    if (ele.removeEventListener) {
      ele.removeEventListener(type, handleEvent, useCapture)
    } else if (ele.detachEven) {
      ele.detachEvent(type, handleEvent)
    } else {
      ele[`on${type}`] = null
    }
  }

  /**
   * 获取事件对象
   * @param e
   */
  JM.getEvent = (e) => e || window.event

  /**
   * 获取目标对象
   * @param e
   */
  JM.getTarget = (e) => e.target || e.srcElement

  /**
   * 阻止冒泡
   * @param e
   */
  JM.stopBubble = (e) => e.stopPropagation || (e.cancelBubble = true)

  /**
   * 阻止默认行为
   * @param e
   */
  JM.preventDefault = (e) => e.preventDefault() || (event.returnValue = false)
  /**
   * 添加类名
   * @param ele
   * @param cName
   */
  JM.addClass = (ele, cName) => {
    if (ele && ele.nodeType === 1 && cName) {
      if (Object.prototype.toString.call(cName) === '[object String]') {
        if (!JM.hasClass(ele, cName)) {
          ele.className += ` ${cName}`
        }
      } else if (Object.prototype.toString.call(cName) === '[object Array]') {
        for (let c of cName) {
          if (!JM.hasClass(ele, c)) {
            ele.className += ` ${c}`
          }
        }
      }
    }
  }

  /**
   * 删除类名
   * @param ele
   * @param cName
   */
  JM.removeClass = (ele, cName) => {
    if (ele && ele.nodeType === 1 && cName) {
      if (Object.prototype.toString.call(cName) === '[object String]') {
        if (JM.hasClass(ele, cName)) {
          ele.className = ele.className.replace(new RegExp(`\\b${cName}\\b`), '')
        }
      } else if (Object.prototype.toString.call(cName) === '[object Array]') {
        for (let cN of cName) {
          if (Object.prototype.toString.call(cN) === '[object String]' && JM.hasClass(ele, cN)) {
            ele.className = ele.className.replace(new RegExp(`\\b${cN}\\b`), '')
          }
        }
      }
    }
  }

  /**
   * 判断是否有类名
   * @param ele
   * @param cName
   * @returns {boolean}
   */
  JM.hasClass = (ele, cName) => {
    const reg = new RegExp(`\\b${cName}\\b`)

    if (ele && ele.nodeType === 1 && cName) {
      if (Object.prototype.toString.call(cName) === '[object String]') {
        return reg.test(ele.className)
      }
    }
    return false
  }

  /**
   * ajax
   * @param config
   */
  JM.ajax = (config) => {
    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          config.fn && config.fn(xhr.responseText)
        }
      }
    }

    xhr.open(config.method, config.url, config.isAsync || true)

    if (xhr.headers && Object.prototype.toString.call(xhr.headers) === `[object Array]`) {
      for (let [name, value] of xhr.headers) {
        xhr.setRequestHeader(name, value)
      }
    }

    xhr.send(xhr.data || null)
  }
})(window, undefined)

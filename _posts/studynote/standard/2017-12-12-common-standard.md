---
layout: post
title: "前端通用规范"
data: 2017-12-12 14:27:00 +0800
categories: 学习笔记
tag: javascript
---
* content
{:toc}

* 参考资料：《现代前端技术解析》

![img](/styles/images/standard/standard-01.png)

<!-- more -->

## 一、通用规范

### 1.1 三层结构分离

> * 前端页面开发应做到结构层(`HTML`)、表现层(`CSS`)、行为层(`JavaScript`)分离，保证它们之间的最小耦合。
> * 移动端开发可以适当进行 `CSS` 样式、图片资源、`JavaScript` 内联。
>   * 内联的资源大小标准一般为 `2KB` 以内，否则可能会导致`HTML`文件过大，页面首次加载时间过长。 

```html
<!-- 不推荐 -->
<button type="button" style="background:red;" onclick="alert(1)">按钮</button>

<!-- 推荐.md -->
<link rel="stylesheet" href="...">
...
<button class="btn">按钮</button>
...
<script src="..."></script>
```
### 1.2 缩进

> * 推荐使用 `tab` （或4个空格宽度）来进行缩进，也可以根据团队的规范去进行缩进。

### 1.3 内容编码

> * 在 `HTML` 文档中用 `<meta charset=""utf-8"`来指定编码，以避免出现页面乱码问题。
> * 不需要为 `CSS` 显式定义编码，默认为`utf-8`

### 1.4 小写

> * 所有 `HTML` 标签、`HTML` 标签属性、样式名及规则建议使用小写，因为大写单词相对不容易阅读与理解。
> * `HTML` 属性的 `id` 属性可以使用驼峰大小写组合的命名方式，例子：`menuList` 【不要`menu_list`】
>   * 因为id属性常只用于 JavaScript 的 DOM 查询引用。    

```html
<!-- 不推荐 -->
<UL id="menu_list"></UL>

<!-- 推荐.md -->
<ul id="menuList"></ul>
```

### 1.5 代码单行长度限制

> * 代码单行长度不要超过 120 字符（或80字符，具体按团队习惯来决定）
> * 长字符串可用 加号 来连接

### 1.6 注释

> * 尽量为代码写上写注释。
>   * 段内容描述可以使用段注释
>   * 单行内容使用单行注释
>   * 对于独立文件，也尽量在文件头部添加文件注释

> * 写 `JavaScript` 的注释时，可以使用 [`Jsdoc` 注释标签](http://need-faith.iteye.com/blog/2019702)

```js
/**
 * filename: util.js
 * author: jm
 * description: 提供常见的工具函数集，主要包含：
 *  getDay(): 获取中文星期时间格式，例如：星期一
 *  formatTime(): 获取格式化后的中文时间提示，例如：2016 年 12 月 12 日
 * ...
 */

let util = {}

/**
 * 获取带中文的星期字符串
 * @param timestamp [输入的时间戳]
 * @returns {string} [返回中文星期时间表示]
 * @private
 */
function _getDay (timestamp) {
  const Day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return Day[timestamp.getDay()]
}

module.exports = {
  getDay: _getDay
}
```

---

![img](/styles/images/standard/standard-01.png)

```js
// 第一个例子
// 代码块一
if(!el.offsetWidth && !el.offsetHeight) {}

// 代码块二
function isVisible (el) {
  return !el.offsetWidth && !el.offsetHeight 
}

if (!isVisible(el)) {}


// 第二个例子
// 代码块一
let width = (value - 0.5) * 16

// 代码块二
let width = emToPixels(value)

function emToPixels(ems) {
  return (ems - 0.5) * 16
}

```

### 1.7 行尾空格与符号

> * 删除行尾空格与多余的符号





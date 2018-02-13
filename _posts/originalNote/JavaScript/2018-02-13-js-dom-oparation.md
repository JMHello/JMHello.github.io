---
layout: post
title: "javascript - 离线操作DOM"
data: 2018-02-13 14:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}


<!-- more -->

## 一、 离线操作DOM

### 1.1 字符串拼接

> * [demo](/effects/demo/js/dom/operationDom/v1.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>离线操作DOM - 字符串拼接</title>
</head>
<body>
<ul id="list"></ul>
<script>
    const list = document.getElementById('list')
    createDiv(list)

    function createDiv (list) {
      let str = ''

      for (let i = 1; i <= 100; i++) {
        str += `<li>${i}</li>`
      }

      list.innerHTML += str
    }
</script>
</body>
</html>
```


### 1.2 DocumentFragment

> * [demo](/effects/demo/js/dom/operationDom/v2.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>离线操作DOM - DocumentFragment</title>
</head>
<body>
<ul id="list"></ul>
<script>
    const list = document.getElementById('list')
    createDiv(list)

    function createDiv (list) {
      const fragment = document.createDocumentFragment()
      let li = null

      for (let i = 1; i <= 100; i++) {
        li = document.createElement('li')
        li.appendChild(document.createTextNode(i))
        fragment.appendChild(li)
      }

      list.appendChild(fragment)
    }
</script>
</body>
</html>
```

### 1.3 cloneNode()

> * [demo](/effects/demo/js/dom/operationDom/v3.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>离线操作DOM - cloneNode()</title>
</head>
<body>
<ul id="list"></ul>
<script>
    const list = document.getElementById('list')
    createDiv(list)

    function createDiv (list) {
      const cList = list.cloneNode()

      let li = null

      for (let i = 1; i <= 100; i++) {
        li = document.createElement('li')
        li.appendChild(document.createTextNode(i))
        cList.appendChild(li)
      }

      // 替换原始节点
      document.body.replaceChild(cList, list)

    }
</script>
</body>
</html>
```
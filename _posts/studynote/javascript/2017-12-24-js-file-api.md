---
layout: post
title: "javascript - File API "
data: 2017-12-24 12:27:00 +0800
categories: 学习笔记
tag: javascript
---

* content
{:toc}

* 参考资料
    + 《JavaScript高级程序设计（第3版）》 25.4 File API  21.2.1 FormData

<!-- more -->


## 一、files 集合

### 1.1 介绍

> * `HTML5` 在 `DOM` 中为文件输入元素添加了一个 `files` 集合。
> * 在通过文件输入字段选择了一或多个文件时，`files` 集合中将包含一组 `File` 对象，每个 `File` 对象对应着一个文件。
> * 每个 `File` 对象都有下列只读属性：
>   * `name`：本地文件系统中的文件名。
>   * `size`：文件的字节大小。
>   * `type`：字符串，文件的 `MIME` 类型。
>   * `lastModifiedDate`：字符串，文件上一次被修改的时间（只有 Chrome 实现了这个属性）。

### 1.2 demo

> * 点击打开[demo](/effects/demo/js/file/v1.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>files集合</title>
</head>
<body>

<input type="file" class="upload-file" id="js-upload" multiple>

<script>
  const jsUpload = document.getElementById('js-upload')

  // 关键事件：change事件
  jsUpload.addEventListener('change', (e) => {
    const files = e.target.files
    console.log(files)
  }, false)
</script>
</body>
</html>
```
> * 读取一张图片

![files](/styles/images/javascript/files/files-01.png)

> * 读取多张图片（**通过为 `input` 设置 `multiple`属性，就可以读取多个文件**）

![files](/styles/images/javascript/files/files-02.png)

## 二、FileReader类型

### 1.1 介绍

> * `FileReader` 有以下属性和方法：

![files](/styles/images/javascript/files/files-03.png)

### 1.2 读取文件中的数据的方法

> * `readAsText(file,encoding)`：以纯文本形式读取文件，将读取到的文本保存在 `result` 属性中；第二个参数用于指定编码类型，是可选的。

![files](/styles/images/javascript/files/files-07.png)

> * `readAsDataURL(file)`：读取文件并将文件以数据 `URI` 的形式保存在 `result` 属性中。

![files](/styles/images/javascript/files/files-04.png)

> * `readAsBinaryString(file)`：读取文件并将一个字符串保存在 `result` 属性中，字符串中的每个字符表示一字节。

![files](/styles/images/javascript/files/files-05.png)

> * `readAsArrayBuffer(file)`：读取文件并将一个包含文件内容的 `ArrayBuffer` 保存在 `result` 属性中。

![files](/styles/images/javascript/files/files-06.png)


> 实现 `File API` 的所有浏览器都支持 `readAsText()` 和 `readAsDataURL()` 方法。但 `IE10 PR 2` 并未
  实现 `readAsBinaryString()` 和 `readAsArrayBuffer()` 方法

### 1.3 处理读取过程异步的方法

> * `progress`：是否又读取了新数据。
>   * 每过 `50ms` 左右，就会触发一次 `progress` 事件，通过事件对象可以获得与 `XHR` 的 `progress` 事件相同的信息（属性）：`lengthComputable`、`loaded` 和 `total`。
>   * 另外，尽管可能没有包含全部数据，但每次 `progress` 事件中都可以通过 `FileReader` 的 `result` 属性读取到文件内容。

> * 以下是 `ProgressEvent` 对象：

![files](/styles/images/javascript/files/files-08.png)

---

> * `error`：由于种种原因无法读取文件，就会触发 `error` 事件。
>   * 触发 `error` 事件时，相关的信息将保存到 `FileReader` 的 `error` 属性中。
>   * 这个属性中将保存一个对象，该对象只有一个属性 `code`，即错误码。
>       * 1：表示未找到文件；
>       * 2：表示安全性错误；
>       * 3：表示读取中断；
>       * 4：表示文件不可读；
>       * 5：表示编码错误。

---

> * `load`：是否已经读完了整个文件；文件成功加载后会触发 `load` 事件；如果发生了 `error` 事件，就不会发生 `load` 事件

---

> * 如果想中断读取过程，可以调用 `abort()` 方法，这样就会触发 `abort` 事件。
> * 在触发 `load`、`error` 或 `abort` 事件后，会触发另一个事件 `loadend`。
>   * `loadend` 事件发生就意味着已经读取完整个文件，或者读取时发生了错误，或者读取过程被中断。

### 1.4 demo

> * 点击打开[demo](/effects/demo/js/file/v2.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>files集合</title>
</head>
<body>

<input type="file" class="upload-file" id="js-upload" multiple>
<div id="text" style="width: 400px; margin: 10px; padding: 5px; border: 1px solid"></div>

<script>
  const jsUpload = document.getElementById('js-upload')
  const text = document.getElementById('text')

  // 关键事件：change事件
  jsUpload.addEventListener('change', (e) => {
    const files = e.target.files
    const reader = new FileReader()

    reader.readAsText(files[0], `utf8`)
//    reader.readAsDataURL(files[0])
//    reader.readAsBinaryString(files[0])
//    reader.readAsArrayBuffer(files[0])

    reader.onprogress = function (e) {
        console.log(e)
    }
    reader.onerror = function () {
      console.log(reader.error)
      console.log(reader.error.code)
    }
    reader.onload = function () {
      text.innerHTML = reader.result
    }
  }, false)
</script>
</body>
</html>
```

## 三、读取部分内容

```js
  /**
   * 读取文件的部分内容
   * @param blob
   * @param startByte 起始字节
   * @param length 要读取的字节数
   * @returns {*} 返回一个 Blob 的实例 || null 【Blob 是 File 类型的父类型】
   */
  function blobSlice(blob, startByte, length){
    if (blob.slice){ // 其他浏览器
      return blob.slice(startByte, length);
    } else if (blob.webkitSlice){ // Chrome
      return blob.webkitSlice(startByte, length);
    } else if (blob.mozSlice){ // Firefox
      return blob.mozSlice(startByte, length);
    } else {
      return null;
    }
  }
```

> * `Blob` 类型有一个 `size` 属性和一个 `type` 属性

![files](/styles/images/javascript/files/files-10.png)


> * 点击打开[demo](/effects/demo/js/file/v3.html)

![files](/styles/images/javascript/files/files-09.png)

> 只读取文件的一部分可以节省时间，非常适合只关注数据中某个特定部分（如文件头部）的情况。

## 四、对象URL

> * 支持对象 URL 的浏览器有 IE10+、Firefox 4 和 Chrome。

### 4.1 创建对象URL

> * 对象 `URL` 也被称为 `blob URL`，指的是引用保存在 `File` 或 `Blob` 中数据的 `URL`。
> * 使用对象 `URL` 的好处是可以不必把文件内容读取到 `JavaScript` 中而直接使用文件内容。
> * 为此，只要在需要文件内容的地方提供对象 `URL` 即可。

```js
  /**
   * 创建对象 URL
   * @param blob File 或 Blob 对象
   * @returns {*} 返回一个字符串，指向一块内存的地址 || null
   */
  function createObjectURL(blob){
    if (window.URL){
      return window.URL.createObjectURL(blob);
    } else if (window.webkitURL){ // chrome
      return window.webkitURL.createObjectURL(blob);
    } else {
      return null;
    }
  }
```

> * 点击打开[demo](/effects/demo/js/file/v4.html)

![files](/styles/images/javascript/files/files-11.png)

### 4.2 释放对象URL

> * 如果不再需要相应的数据，最好释放它占用的内容。但只要有代码在引用对象 `URL`，内存就不会释放。
> * 页面卸载时会自动释放对象 `URL` 占用的内存。不过，为了确保尽可能少地占用内存，最好在不需
    要某个对象 `URL` 时，就马上手工释放其占用的内存。

```js
/**
   * 释放对象URL
   * @param url
   */
  function revokeObjectURL(url){
    if (window.URL){
      window.URL.revokeObjectURL(url);
    } else if (window.webkitURL){
      window.webkitURL.revokeObjectURL(url);
    }
  }
```

## 五、读取拖放的文件

### 5.1 event.Transfer对象

> * 围绕读取文件信息，结合使用 `HTML5` 拖放 `API` 和文件 `API`，能够创造出令人瞩目的用户界面：
>   * 在页面上创建了自定义的放置目标之后，你可以从桌面上把文件拖放到该目标。
>   * 与拖放一张图片或者一个链接类似，从桌面上把文件拖放到浏览器中也会触发 `drop` 事件。
>   * 而且可以在 `event.dataTransfer.files` 中读取到被放置的文件，当然此时它是一个 `File` 对象，与通过文件输入字段取得的 `File` 对象一样。

> * `event.dataTransfer` 对象：

![files](/styles/images/javascript/files/files-12.png)

### 5.2 demo

> * 点击打开[demo](/effects/demo/js/file/v5.html)


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>读取拖放的文件</title>
</head>
<body>

<div id="dropTarget" style="width: 300px; height: 300px; background: gray; text-align: center; color: white">请将图片拖放到此区域</div>
<div id="text"></div>

<script>
  /**
   * 创建对象 URL
   * @param blob File 或 Blob 对象
   * @returns {*} 返回一个字符串，指向一块内存的地址 || null
   */
  function createObjectURL(blob){
    if (window.URL){
      return window.URL.createObjectURL(blob);
    } else if (window.webkitURL){ // chrome
      return window.webkitURL.createObjectURL(blob);
    } else {
      return null;
    }
  }

  /**
   * 事件处理函数
   * @param event
   */
  function handleEvent (event) {
    const text = document.getElementById('text')
    // 阻止默认事件发生：如果不阻止默认事件发生，当把一个文件拖拽到div里，那么这个文件就会在此网页上打开
    event.preventDefault()

    if (event.type === 'drop') {
      const files = event.dataTransfer.files
      console.log(event.dataTransfer)
      const url = createObjectURL(files[0])
      if (url) {
        text.innerHTML = `<img src="${url}">`
      }
    }
  }

  const dropTarget = document.getElementById('dropTarget')
  dropTarget.addEventListener('dragenter', handleEvent, false)
  dropTarget.addEventListener('dragover', handleEvent, false)
  dropTarget.addEventListener('drop', handleEvent, false)
</script>
</body>
</html>
```

![files](/styles/images/javascript/files/files-13.png)

## 六、使用XHR上传文件

### 6.1 介绍

> * 通过 `File API` 能够访问到文件内容，利用这一点就可以通过 XHR 直接把文件上传到服务器。
>   * 方法1：把文件内容放到 `send()`方法中，再通过 `POST` 请求，的确很容易就能实现上传。
>       * 但这样做传递的是文件内容，因而服务器端必须收集提交的内容，然后再把它们保存到另一个文件中。
>   * 方法2：以表单提交的方式来上传文件。

### 6.2 FormData 对象

> * `FormData` 对象如下：

![files](/styles/images/javascript/files/files-14.png)

> * 添加数据的方法：
>   * 1.`append()` 方法接收两个参数：键和值，分别对应表单字段的名字和字段中包含的值。
>       * 【`var data = new FormData();data.append("name", "Nicholas"); `】
>   * 2.过向 `FormData` 构造函数中传入表单元素。【`var data = new FormData(document.forms[0]); `】

> * 使用 `FormData` 的方便之处体现在不必明确地在 `XHR` 对象上设置请求头部。
> * `XHR` 对象能够识别传入的数据类型是 `FormData` 的实例，并配置适当的头部信息。
> * 支持 `FormData` 的浏览器有 Firefox 4+、Safari 5+、Chrome 和 Android 3+版 WebKit。


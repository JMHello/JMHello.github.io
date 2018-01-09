---
layout: post
title: "nodejs - 如何处理表单数据"
date: 2018-01-10 15:00:00 +0800 
categories: 原创
tag: node.js
---
* content
{:toc}

<!-- more -->



## 一、表单数据的常用类型

### 1.1 form-data

```
------WebKitFormBoundary7A3ic8cRgGi1LkSv
Content-Disposition: form-data; name="name"


admin
------WebKitFormBoundary7A3ic8cRgGi1LkSv
Content-Disposition: form-data; name="password"


e10adc3949ba59abbe56e057f20f883e
------WebKitFormBoundary7A3ic8cRgGi1LkSv--
```

### 1.2 x-www-form-urlencoded

```
name=admin&password=e10adc3949ba59abbe56e057f20f883e
```

### 1.3 json

```json
{
    "name": "admin",
    "password": "e10adc3949ba59abbe56e057f20f883e"
}
```

## 二、处理类型为multipart/form-data的表单数据 

### 2.1 理解报文

![formData](/styles/images/nodejs/formData/formData-01.png)

> * 1、`Content-Type:multipart/form-data; boundary=----WebKitFormBoundaryYJVXoha5Vr1S4hfd`：
>   * 这行指出这个请求是“`multipart/form-data`”格式的，且“`boundary`”是 “`----WebKitFormBoundaryYJVXoha5Vr1S4hfd`”这个字符串。

> * 2、看到了`Request Payload` 里，不难发现：多个“`-`” + “`boundary`”是用来隔开表单中不同部分的数据的。

> * 3、`boundary` 一般由系统随机产生，每部分的数据开头都是由 **`--` + `boundary`** 开始，由**`--` + `boundary` + `--`**结束
  
> * 4、紧接着 `boundary` 的是该部分数据的描述【可参考[rfc1867](http://www.ietf.org/rfc/rfc1867)】

> * 简化之后的基本格式如下：

```
分隔符（指 '--' + boundary）
Content-Disposition: xxx; name="表单字段中的name值"; filename="文件名（单后缀）" 
Content-Type: MIME类型 
空行
文件二进制数据
分隔符（指 '--' + boundary）
...
结束符（指 '--' + boundary + '--'）
```
 
> * `Content-Disposition` ：内容类型

```
The original local file name may be supplied as well, either as a
'filename' parameter either of the 'content-disposition: form-data'
header or in the case of multiple files in a 'content-disposition:
file' header of the subpart. The client application should make best
effort to supply the file name; if the file name of the client's
operating system is not in US-ASCII, the file name might be
approximated or encoded using the method of RFC 1522.  This is a
convenience for those cases where, for example, the uploaded files
might contain references to each other, e.g., a TeX file and its .sty
auxiliary style description.
```
        
> * `Content-Disposition: form-data;` ：表明内容类型为表单数据
> * `name`：该 `field` 的 `name` 为 `form` 表单中的字段中的 `name`属性值
> * `filename`: 文件后缀，该`field`为文件时才会有
> * `Content-Type`: 文件`MIME`类型，也是`field`为文件时才会有
> * 分隔符：都是多个'`-`' + 一串随机字符串，结尾在此基础上多了个`--`而已。
>   * 例：`------WebKitFormBoundaryYJVXoha5Vr1S4hfd`，这是 `Chrome` 浏览器；`---------------------------325313178830032`，这是火狐浏览器
>   * 从例子可看出：每次发送过得 `form-data` 中都不同，但是同一个请求主体中的分隔符都是相同的，只用于分隔不同 `field` 的数据
> * 换行：`http` 协议中，统一用`\r\n`表示

### 2.2 注意事项

> * 1、如果用 `formData = new FormData()` 提交表单数据，表单数据是会累积的，如下图：

![form](/styles/images/nodejs/formData/formData-04.png)

> * 2、还需知道的一点是，看下图
>   * 红色框框的就是传给后端的一个空字符串的字段，即`''`（里面连一个空格都没有），其由`buffer` 数据转化为字符串就变成了 `\r\n\r\n\r\n`（是3个`\r\n`），中间是没有任何数据
>   * 黄色下划线下的就是非空数据的字段

![form](/styles/images/nodejs/formData/formData-02.png)

### 2.3 后端处理

> * 后端接收到的是`Buffer`数据类型，现在将`Buffer`数据转化成`utf8`格式的字符串，如下：

![form](/styles/images/nodejs/formData/formData-03.png)

> * 从图中可以发现：每一个表单数据都是以 `---boundary` 开始和结尾【这就是获取每一个表单数据的关键点】


> * 1、先获取数据

```js
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

      // 获取文件或字段数据
      this.getFilesOrFieldsData()
    })
  }
```

> * 将传来的`buffer`数据`push`到一个数组内是因为如果传来的数据过大，那么所传的数据是不可能一次性传完的，可能会一段一段地传，为了获取完整的数据，需要将正一段段buffer放到一个数组里

---

> * 2、获取每个字段

```js
/**
   * 获取每个字段
   */
  getEachField () {
    // 通过\r\n分隔，数组中第一个元素肯定是分隔符，即boundary
    const boundary = this.str.split('\r\n')[0]
    const boundaryBuffer = new Buffer(boundary)
    const boundaryBufferLength = boundaryBuffer.length

    // 存放boundary位置的数组
    let indexData = []
    // 存放每个字段的buffer数据的数组
    let bufferDatas = []
    // boundary的位置
    let boundaryIndex = this.bufferData.indexOf(boundaryBuffer, 0)

    // 以boundary为分界，获取一头一尾的index
    // 转化为字符串为 ----boundary xxx数据\r\n
    // 此时结尾的 \r\n 不足以作为结束标识
    while (boundaryIndex > -1) {
      indexData.push(boundaryIndex)
      boundaryIndex = this.bufferData.indexOf(boundaryBuffer, boundaryIndex + 1)
    }

    // 让每个表单数据有完整的分隔点，所以每个位置（除了第一个位置外）都加上 boundaryBufferLength
    // 转化成字符串就是 ----boundary xxx数据 ---boundary  或者为 \r\n xxx数据 ---boundary
    // 结尾的---boundary必不可少
    indexData = indexData.map((item, i) => {
      return i === 0 ? item : item + boundaryBufferLength
    })

    const indexDataLength = indexData.length
    
    // 获取每一个表单的buffer数据，并存进数组里【这里需要少一次循环】
    for (let i = 0; i < indexDataLength - 1; i++) {
      bufferDatas.push(this.bufferData.slice(indexData[i], indexData[i + 1]))
    }
    return bufferDatas
  }
```

> * 思路：
>   1、通过 `\r\n` 分隔，获取数组中第一个元素【分隔符，即 `boundary`】，并获取其对应的 `buffer`，以及`buffer`长度
>   2、以 `boundary` 为分界，获取一头一尾的 `index`，【一头一尾是指`---boundary`】，一开始只是单纯 `indexOf(boundaryBuffer)`，是无法获取到那一尾`---boundary`，
>      只是获取到了`\r\n`，因此在原来的基础上，每个位置（除了第一个位置外）都加上 `boundaryBufferLength`
>   3、通过 标志数组 `indexData`，就可以获取每个字段的相应 `buffer` 数据
>      * 比如：`indexData = [0, 90, 100]`，那么 `bufferData.slice(0, 90)` 就是第一个表单`buffer` 数据，`bufferData.slice(90, 100)` 就是第二个表单`buffer` 数据
>      * 这也说明了为什么要少一次循环

---

> * 获取文件或字段数据

```js
/**
   * 获取文件或字段数据
   */
  getFilesOrFieldsData () {
    const bufferDatas = this.getEachField()
    // 每个字段数据的开始标识
    const startBuf = new Buffer('\r\n\r\n')
    // 每个字段数据的结束标识
    const endBuf = new Buffer('\r\n----')

    for (let eachFileds of bufferDatas) {
      const item = eachFileds.toString()
      // 4 代表的是 `\r\n\r\n`的长度 
      const startIndex = eachFileds.indexOf(startBuf) + 4
      const endIndex = eachFileds.indexOf(endBuf)
      // 字段名
      const name = item.match(/\sname="(.*?)"/)[1]
      // 文件名
      const fileName =  item.indexOf('filename') > -1 ? item.match(/\sfilename="(.*?)"/)[1] : ''
      
      // 处理文件
      if (fileName) {
        const type = item.indexOf('Content-Type') > -1 ? item.match(/\r\nContent-Type:\s(.*?)\r\n/)[1] : ''

        this.files[name] = {
          name: fileName,
          type: type,
          data: eachFileds.slice(startIndex, endIndex)
        }
      } 
      // 处理字段
      else {
        this.fields[name] = eachFileds.slice(startIndex, endIndex).toString() || ''
      }
    }

    this.cb(this.fields, this.files)
  }
```

> * 这个思路也蛮简单的，需分两类处理：
>   * 第一类是`buffer`数据：由于文件是要保存二进制数据的，因此为了方便，一头一尾的标识（`startBuf` 和 `endBuf`）我都用了`buffer`数据去处理，并且一头一尾的位置（`startIndex` 和 `endIndex`）也是通过`buffer`数据去处理
>   * 第二类是字符串数据：文件的头信息 与 字段的头信息、数据都需要把`buffer`数据转化成字符串才能处理















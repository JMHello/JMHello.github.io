---
layout: post
title: "Web 相关编码和转义"
data: 2017-10-30 08:27:00 +0800
categories: 学习笔记    
tag: Web
---
* content
{:toc}

* 参考链接
    * [encodeURI](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)
    * [decodeURI](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURI)
    * [decodeURIComponent](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent)
    * [encodeURIComponent](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
    * [HTML 字符实体](http://w3school.com.cn/html/html_entities.asp)
    * [前端的各种转义](https://github.com/FrankFang/githublog/blob/master/%E6%8A%80%E6%9C%AF/%E5%89%8D%E7%AB%AF%E7%9A%84%E5%90%84%E7%A7%8D%E8%BD%AC%E4%B9%89.md)
    * [从零开始学web安全（3）](http://imweb.io/topic/57024e4606f2400432c1396d)

<!-- more -->

> * 提到 `Web` 前端安全，第一个想到的就是 `XSS`。而提到 `XSS`，不得不说的就是编码了。
> * 本文从 `XSS` 中常用的编码讲起，分为
>    * `URL` 编码
>    * `HTML` 编码
>    * `JS` 编码

## 一、URL编码

### 1.1 URL编码的介绍

> * 一般来说，`URL` 只能使用英文字母（`a-zA-Z`）、数字（`0-9`）、`-_.~` 4个特殊字符以及所有（ `;,/?:@&=+$#` ）保留字符。

### 1.2 URL编码存在的问题

> * 如果使用了一些其他文字和特殊字符，则需要通过编码的方式来进行表示，否则无法解析，如：

```js
// 使用了汉字
var url1 = 'http://www.帅.com';
```

---

> * 另外我们知道在 `URL` 中传参是通过 **键值对** 形式进行的，格式上是以`?`、`&` 和 `=` 为特征标识进行解析，**如果在键或者值的内容中包含一些特殊符号，就会造成解析错误**，如下所示：

```js
// 键为汉字
var url2 = 'http://www.a.com?我=1';
// 值的内容为特殊符号
var url3 = 'http://a.com?key=?&';
```

> * 下面就开始介绍解决URL编码问题的方法

### 1.3 方法 - encodeURI 和 encodeURIComponent

> * ** `encodeURI` **
>   * `encodeURI` 是用来编码 `URI` 的，最常见的就是编码一个 `URL`。
>   * `encodeURI` 会将需要编码的字符转换为 **`UTF-8`** 的格式。
>   * **对于保留字符（ `;,/?:@&=+$#` ），以及非转义字符（字母数字以及 `-_.!~*'()`）不会进行转义**。

[encoding](/styles/images/web/encoding/encoding-01.png)

> * 例如之前 `URL` 中包含中文，我们可以使用 `encodeURI`：【下面代码中，`%E5%B8%85` 就是 帅 的 `URL` 编码，`%E6%88%91` 即为 我 的 `URL` 编码】
> * 点击打开[demo](/effects/demo/js/demo-encoding/eg1.html)

```js
encodeURI('http://www.帅.com'); // http://www.%E5%B8%85.com
encodeURI('http://www.a.com?我=1');// "http://www.a.com?%E6%88%91=1"
```

> * 由于 `encodeURI` 不转义 `&`、`?` 和 `=`。所以对于 `URL` 参数的值是无法转义的，如下面的例子：
> * 点击打开[demo](/effects/demo/js/demo-encoding/eg1.html)

```js
// 值的内容为特殊符号
encodeURI('http://a.com?key=?&'); // "http://a.com?key=?&"
```
   
---    
    
> * **`encodeURIComponent`**： 是用来编码 `URI` 参数的。
> * 它会 **跳过非转义字符（字母数字以及 `-_.!~*'()`）**。
> * 但 **会转义 `URL` 的 保留字符（ `;,/?:@&=+$#` ）**。

> * 点击打开[demo](/effects/demo/js/demo-encoding/eg2.html)

```js
// ?:/# 都转义了
encodeURIComponent('http://www.baidu.com?hello=nihao#token') // http%3A%2F%2Fwww.baidu.com%3Fhello%3Dnihao%23token
```

> * 由于`encodeURIComponent` 会编码所有的 `URL` 保留字，所以不适合编码 `URL`。

---

> * 通常来说我们会 `encodeURI` 结合 `encodeURIComponent` 来使用，如下所示：【其中 `%3F` 和 `%26` 分别为 `?` 和 `&` 的 `URL` 编码】
> * 点击打开[demo](/effects/demo/js/demo-encoding/eg3.html)

```js
encodeURI('http://a.com') + '?key=' + encodeURIComponent('?&'); // http://a.com?key=%3F%26
```

    
## 二、URL 解码

### 2.1 decodeURI()

> * `decodeURI(encodedURI)`：
>   * 将已编码 URI 中所有能识别的转义序列转换成原字符，但不能解码那些不会被 `encodeURI` 编码的内容（例如 "`#`"）。

### 2.2 decodeURIComponent()

> * `decodeURIComponent(encodedURI)`：
>   * 将已编码 `URI` 中所有能识别的转义序列转换成原字符。

## 三、HTML 编码

### 1.1 HTML 编码介绍

> * 在 `HTML` 中，**某些字符是预留的**，比如不能使用小于号（`<`）和大于号（`>`），这是因为浏览器会误认为它们是标签。
> * 如果希望正确地显示预留字符，我们必须 **在 `HTML` 源代码中使用字符实体**（`character entities`）。
> * 当然还另一个重要原因，**有些字符在 `ASCII` 字符集中没有定义，因此需要使用字符实体来表示，比如中文**。

### 1.2 HTML 编码分类

> * `HTML` 编码分为：
>   * `HTML` 十六进制编码 `&#xH`;
>   * `HTML` 十进制编码 `&#D`;
>   * `HTML` 实体编码 `&lt`; 

### 1.3 HTML 实体编码

> * 通常来说，在业务中我们用到更多的是 `HTML` 的实体编码。常用的 `HTML` 实体编码函数如下所示：

```js
/**
 * 转义 HTML 特殊字符
 * @param {String} str
 */
function htmlEncode(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
```

> * 较常用的 `HTML` 实体编码如下图所示：

[encoding](/styles/images/web/encoding/encoding-02.png)

## 四、Javascript 转义

> * `JavaScript` 中有些字符有特殊用途，如果字符串中想使用这些字符原来的含义，需要使用反斜杠对这些特殊符号进行转义。
> * 我们称之为 **`Javascript`编码**。

> * 一般有以下几类：
>   * 三个八进制数字，如果不够个数，前面补`0`，例如 “`e`” 编码为“`\145`”
>   * 两个十六进制数字，如果不够个数，前面补`0`，例如 “`e`” 编码为“`\x65`”
>   * 四个十六进制数字，如果不够个数，前面补`0`，例如 “`e`” 编码为“`\u0065`”
>   * 对于一些控制字符，使用特殊的C类型的转义风格（例如`\n`和`\r`）

> * 如下面所示，双引号用于标注字符串，然而在字符串中带了双引号，就会发生歧义：

```js
var str = "Hello"";
```

> * 于是我们需要对字符串内的双引号进行转义，也就是加上反斜杠，告诉脚本引擎要区分对待：

```js
var str = "Hello\"";
```
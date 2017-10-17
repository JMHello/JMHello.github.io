---
layout: post
title: "RegExp - 正则例子"
data: 2017-10-17 22:27:00 +0800
categories: 原创
tag: RegExp
---
* content
{:toc}

 其他链接：

 + [RegExp-正则]({{ '/2017/09/03/RegExp' | prepend: site.baseurl }})


<!-- more -->

## 1. 例1 统计 `span` 的个数

> * 点击打开[demo](/effects/demo/demo-RegExp/inertia2.html)

```js
var str = '<span>coding</span> is ' +
  '<span>interesting</span>' +
  '<strong>coding</span> is ' +
  '<span>interesting</span>' +
  '<strong>coding</span> is ' +
  '<span>beijing</span>' +
  '<strong>coding</span> is ' +
  '<span>interesting</span>' +
  '<strong>coding</span> is' +
  ' <span>hello</span>\n';

var reg = /(<span>.*?<\/span>)/g; // 惰性匹配

var result = str.match(reg);

var r_len = result.length;

console.log(result);
console.log(r_len);
```

> * 结果如图

![relationship-map]({{ '/styles/images/RegExp/eg/eg-04.png' | prepend: site.baseurl }})

## 2. 例2 将非 P 元素都替换成 P 元素

> * 点击打开[demo](/effects/demo/demo-RegExp/eg/eg1.html)

```js
  var str = '<div id="babalala">paragraph </div><p>哈哈哈</p><span class="yellow">hello jsonp!</span><strong>呵呵呵pi!</strong>';
  var reg = /<(\/?)(?!p).*?>/g;

  console.log(str.replace(reg, '<$1p>')); // 注意：$1指的是 "/"
  console.log(RegExp.$1); // "/"
```

> * 结果如图

![relationship-map]({{ '/styles/images/RegExp/eg/eg-07.png' | prepend: site.baseurl }})

## 3. 例3 将给定的数字转化成千分位的格式

> * 如：“10000”转化成“10,000”
> * 点击打开[demo](/effects/demo/demo-RegExp/eg/eg2.html)

```js
  var str = '123456789';

  var reg = /(?=(?!\b)(\d{3})+$)/g;

  console.log(str.match(reg)); // ["", ""]
  console.log(str.replace(reg, ',')) // 123,456,789
```

> * 其实拿到这道题后，我们的第一想法是**匹配位置**，因为我们需要在特定的位置插入逗号。
> * 匹配位置的有：`^`、`$`、`\b`、`\B`、`?=`、`?!`

> * 补充：

```js
var str2 = '123456789';
console.log(str2.match(/()/g));
console.log(`replace:  ` + str2.replace(/()/g, ','));
```

> * 结果如图

![relationship-map]({{ '/styles/images/RegExp/eg/eg-08.png' | prepend: site.baseurl }})


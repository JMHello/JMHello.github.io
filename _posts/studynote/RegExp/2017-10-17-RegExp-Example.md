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

## 2. 例2

> * 将给定的数字转化成千分位的格式。如：“10000”转化成“10,000”



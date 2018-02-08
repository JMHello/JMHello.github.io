---
layout: post
title: "discrimination - break 和 continue"
data: 2018-02-08 14:27:00 +0800
categories: 原创
tag: 辨析
---
* content
{:toc}

<!-- more -->

> * 参考资料
>   * [http://www.w3school.com.cn/js/js_break.asp](http://www.w3school.com.cn/js/js_break.asp)

## 一、break 和 continue

> * `break` 语句用于跳出循环。
>   * `break` 一般结合`switch`语句一起使用
> * `continue` 用于跳过循环中的一个迭代。

## 二、实例

### 2.1 break

> * [demo](/effects/demo/js/breakAndContinue/v1.html)

```js
for (let i = 0; i < 10; i++) {
  if (i == 3) {
    break
  }
  console.log(i) // 0 1 2
}
```

### 2.2 continue

> * [demo](/effects/demo/js/breakAndContinue/v2.html)

```js
for (let i = 0; i < 10; i++) {
  if (i == 3) {
    break
  }
  console.log(i) // 0 1 2 4 5 6 7 8 9
}
```


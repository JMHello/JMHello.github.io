---
layout: post
title: "javascript - 练习题"
data: 2018-02-10 14:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

<!-- more -->

## 一、 字符串字符统计

> * 思路：某个字符串第一次找到，那么其值为1，之后，如果判断对象中已存在某字符，那么这个值再加1，如此类推
> * [demo](/effects/demo/js/exercise/v1.html)

```js
  const result = count('javaScript');
  console.log(result)

  /**
   * 字符串字符统计
   * @param str
   * @return {{}}
   */
  function count (str) {
    let obj = {}

    let len = str.length

    for (let i = 0; i < len; i++) {
      const s = str.charAt(i)
      if (obj[s]) {
        obj[s]++
      } else {
        obj[s] = 1
      }
    }

    return obj
  }
```

## 二、字符串转换为驼峰格式

> * 题目要求:
>   * 参数 `string` 是以中划线（-）连接单词的字符串，需将第二个起的非空单词首字母转为大写，如 `-webkit-border-radius` 转换后的结果为 `webkitBorderRadius`。
>   * 返回转换后的字符串

---

> * 发现了一个问题：在下面的循环中，我先将每一项存储在一个新变量 `s` 中，然后在这个 `s` 变量中重新修改每一项的值
> * 但是，`s` 是修改成功了，但是数组中对应位置的项却没有修改成功。
> * 原因：其实新开一个变量，就相当于将对应位置的值存储在这个变量中，如果我们只是单纯修改这个变量，那么是无法影响原数组中对应项的值的。

```js
function convertToCamelCase() {
  // ...
  for (let i = 1; i < len; i++) {
    let s = strArr[i]
    s = s[0].toLocaleUpperCase() + s.slice(1)
  }
  console.log(strArr)
}
```

---

> * [demo](/effects/demo/js/exercise/v2.html)

```js
 const result1 = convertToCamelCase('background-image');
  console.log(result1) // backgroundImage

  const result2 = convertToCamelCase('-webkit-border-radius-image');
  console.log(result2) // webkitBorderRadius

  function convertToCamelCase (str) {
    let strArr = str.split('-')

    // 如果第一项是空格，则需要将其去除
    if (strArr[0] === '') {
      strArr = strArr.slice(1)
    }

    let len = strArr.length

    // 思路一：
    // 除了第一个单词，其他单词的首个字母都要转换为大写
    // 转换结束后，再将数组join起来，变成字符串

    // 思路二：
    // 先将每个单词的首个字母都转化为大写
    // 转换结束后，再将数组join起来，变成字符串
    // 将首字母转化为小写

    // 思路三：
    // 先将每个单词的首个字母都转化为大写
    // 转换结束后，再将首个单词的首字母转化为小写
    // 最后再将数组join起来，变成字符串

    // 实现思路一
    for (let i = 1; i < len; i++) {
      strArr[i] = strArr[i][0].toLocaleUpperCase() + strArr[i].slice(1)
    }

    return strArr.join('')
```

## 三、数字数组去重

> * 题目要求：
>   * 函数 unique 会对传入的参数数组进行去重
>   * 返回一个去重后的新的数组

> * [demo](/effects/demo/js/exercise/v3.html)

```js
  const result = unique([10, 2, 3, 4, 2, 10, 100, 20, 10, 20, 10, 4, 4, 1]);
  console.log(result) // [10, 2, 3, 4, 100, 20, 1]

  function unique (arr) {
    // 思路
    // 新开一个数组
    // 如果传进来的数组的每一项在新开的数组里找不到对应的值，
    // 那么就将该项添加到新数组中，否则不添加
    // 最终返回新数组

    let newArr = []
    for (let num of arr) {
      if (newArr.indexOf(num) === -1) {
        newArr.push(num)
      }
    }

    return newArr
  }
```

## 四、辗转相除法求最大公约数

### 4.1 题目背景

> * 约数
>   * 如果数 a 能被数 b 整除，a 就叫做 b 的倍数，b 就叫做 a 的约数。

> * 最大公约数
>   * 最大公约数就是两个数中,大家都能相约且最大的数。

> * 辗转相除法
>   * 辗转相除法又名欧几里得算法（Euclidean algorithm）,目的是求出两个正整数的最大公约数。它是已知最古老的算法,其可追溯至公元前300年前。

> * 这条算法基于一个定理：两个正整数 a 和 b（a 大于 b）,它们的最大公约数等于 a 除以 b 的余数 c 和 较小数 b 之间的最大公约数。

> * 算法计算过程是这样的:

> * 2个数相除，得出余数
> * 如果余数不为0，则拿较小的数与余数继续相除，判断新的余数是否为0
> * 如果余数为0，则最大公约数就是本次相除中较小的数。
> * 比如数字 25 和 10 ，使用辗转相除法求最大公约数过程如下：

> * 25 除以 10 商 2 余 5
> * 根据辗转相除法可以得出，25 和 10 的最大公约数等于 5 和 10 之间的最大公约数
> * 10 除以 5 商 2 余 0， 所以 5 和 10 之间的最大公约数为 5，因此25 和 10 的最大公约数为 5

### 4.2 实现

> * [demo](/effects/demo/js/exercise/v4.html)

```js
  const result = gcd(25, 10);
  console.log(result) // 5

  function gcd (num1, num2) {
    let remainder = 0

    // 思路
    // 传进两个参数，先通过比较知道哪个数是大，哪个数小
    // 两数相除（其实这里应该叫取模），获取余数
    // 如果余数不为0，那么就拿较小的数与余数继续相除，判断新的余数是否为0
    // 如果余数为0，那么最大公约数就是本次相除中较小的数。
    
    // 比如 求 25 和 10 的最大公约数
    // remainder = 25 % 10 = 5，余数不为0，将最小的数 10 和余数继续相除
    // 所以，num1 = 10，num2 = remainder = 5
    // remainder = num1 % num2 = 10 % 5 = 0
    // 所以 最大公约数应该是 num1 = 5

    do {
      remainder = num1 % num2
      num1 = num2
      num2 = remainder
    } while (remainder !== 0)

    return num1
  }
```

## 五、实现 AutoComplete

### 5.1 背景

> * `AutoComplete` 是指用户在文本框输入前几个字母或是汉字的时候，
> 该控件就能从存放数据的文本或是数据库里将所有以这些字母开头的数据提示给用户，供用户选择，提供方便。

---

> * 题目要求
>   * 1、完善 `input` 框 `focus` 事件绑定逻辑，当事件触发时，显示 `.autocomplete` 提示框和相应的提示内容，并定位到触发事件的输入框的正下方。要求同时只能出现一个 `.autocomplete` 提示框
>   * 2、完善 `input` 输入框的 `keyup` 事件绑定逻辑，同时获取输入框内容，修改 `.autocomplete` 提示框的提示选项内容
>   * 3、完善 `.autocomplete .item` 的 `click` 事件绑定逻辑，当点击提示框选项时，填充选项文本数据到相应的 `input` 框中
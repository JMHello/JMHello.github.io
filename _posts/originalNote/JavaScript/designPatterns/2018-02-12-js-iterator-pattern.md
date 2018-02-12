---
layout: post
title: "迭代器模式以及jQuery.each()"
date: 2017-09-05 19:00:00 +0800 
categories: 原创
tag: jQuery
---
* content
{:toc}

其他链接：

<!-- more -->

## 一、什么是迭代器模式

> * 迭代器模式：在不暴露对象内部结构的同时，可以顺序地访问聚合对象内部的元素。

## 二、js中的迭代器

> * 之前只要一度到遍历，绝对是使用 `for` 循环，但是，随着技术的发展，`js`也有了自己的迭代器：`Array.prototype.forEach`

## 三、jQuery.each()

> * 下面是`jQuery` 的迭代器：`jQuery.each()`

```js
 each: function( obj, callback ) {
      var length, i = 0;

      if ( isArrayLike( obj ) ) {
        length = obj.length;
        for ( ; i < length; i++ ) {
          if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
            break;
          }
        }
      } else {
        for ( i in obj ) {
          if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
            break;
          }
        }
      }

      return obj;
    }
```

> * 传进参数 `obj`，以及 `callback`（回调函数）
> * `obj` 分成两类：
>   * 如果是数组，则 `for ( ; i < length; i++ ) {...}`
>   * 如果是对象，则 ` for ( i in obj ) {}`
> * 最终返回这个对象 `obj`

> * 在迭代过程中，如果遇到某个函数返回 `false`，则中止迭代！
>   * 即：`if ( callback.call( obj[ i ], i, obj[ i ] ) === false ){break)`

---

> * 例如：控制 `i <= 3`

```js
var i = 0
$.each([1, 2, 3], function(index, item) {
  if (i <= 3) {
    i += item
  } else {
    return false
  }
})
```

## 四、内部迭代器

> * 内部迭代器：外界不用关心迭代器内部的实现，跟迭代器的交互仅是第一次初始调用。【内部迭代器的规则已被规定（这也是缺点）】

> * 比如：`forEach`函数则无法同时迭代两个数组！现在需要判断两个数组里的值是否相等。
> * [demo](/effects/demo/js/designPattern/iterator/v1.html)

```js
    function compare (arr1, arr2) {
      if (arr1.length !== arr2.length) {
        throw new Error('两个数组长度不相等！')
      }
      arr1.forEach(function (item, i) {
        if (item !== arr2[i]) {
          throw new Error('两个数组的值不相等！')
        }
      })

      console.log('两个数组的值相等！')
    }
    compare([1, 2, 3], [1, 2, 3])
```

> * 效果是做出来，但是扩展性太差，其判断的方法只能依靠回调函数

## 五、外部迭代器

> * 外部迭代器：必须显式请求迭代下一个元素。
> * 外部迭代器增加了一些调用的复杂度，但相对也增强了迭代器的灵活性，我们可以手工控制
    迭代的过程或者顺序。
> * 简单来说：外部迭代器比内部迭代器更具有可控性！
    
> * 以下是外部迭代器：

```js
const Iterator = function (obj) {
  let current = 0

  // 迭代下一项
  const next = function () {
    current +=1
  }

  // 判断是否迭代结束
  const isDone = function () {
    return current >= obj.length
  }

  // 获取当前项
  const getCurrentItem = function () {
    return obj[current]
  }

  return {
    next,
    isDone,
    getCurrentItem
  }
}
```

> * 实例：同时迭代两个数组，判断两个数组里的值是否相等。
> * [demo](/effects/demo/js/designPattern/iterator/v2.html)

```js
function compare (iterator1, iterator2) {
  while (!iterator1.isDone() && !iterator2.isDone()) {
    if (iterator1.getCurrentItem() !== iterator2.getCurrentItem()) {
      throw new Error('iterator1 和 iterator2 不相等！')
    }
    iterator1.next()
    iterator2.next()
  }
  console.log('iterator1 和 iterator2 相等！')
}

const iterator1 = Iterator([1, 2, 3])
const iterator2 = Iterator([1, 2, 3])
compare(iterator1, iterator2)
```

## 六、倒序迭代器

> * 倒序迭代器：

```js
function reverseEach(arr, callback) {
  for (let l = arr.length - 1; l >= 0; l--) {
    callback && callback(arr[l], l)
  }
}
```

> * 实例
> * [demo](/effects/demo/js/designPattern/iterator/v3.html)

```js
  reverseEach([1, 2, 3], function (item, i) {
    console.log(`index = ${i}, item = ${item}`)
  })
```

## 七、中止迭代器

> * `jQuery.each()` 就是终止迭代器
> * 关键代码：

```js
if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
  break;
}
```

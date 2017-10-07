---
layout: post
title: "javascript - 高级定时器"
data: 2017-10-07 12:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

* 参考资料
    + 《JavaScript高级程序设计（第3版）》 22.3 高级定时器

* 相关链接
    + [javascript - 定时器]({{ '/2017/10/06/js-time' | prepend: site.baseurl }})

<!-- more -->

## 一、简述定时器的实质

看以下例子：

```js
var btn = document.getElementById("my-btn");
btn.onclick = function(){
 setTimeout(function(){
  document.getElementById("message").style.visibility = "visible";
 }, 250);
 //其他代码
}; 
```

> *上述代码的解析：
>   * 先给按钮设置了一个事件处理程序，事件处理程序里设置了一个 `250ms` 后调用的定时器。
>   * 点击按钮后，先把 `onclick` 事件处理程序添加到任务队列中。
>   * 该事件处理程序执行后，再设置定时器，`250ms`后，指定的代码才被添加到队列中等待执行。
>   * 如果队列为空，即：没有其他代码等待执行，那么定时器内的代码就会执行；
     如果队列不为空，即：有其他代码等待执行，那么定时器内的代码就会等到队列中的代码执行完后执行。

> * 总结：
>   * 定时器只是用来计划代码在未来的某个时间执行。
>   * 定时器所指定的时间间隔表示**何时将定时器的代码添加到队列，而不是何时实际执行代码**。
>   * 在`js`中没有任何代码是立刻执行的，除非进程是空闲的。



---
layout: post
title: "面试题目 - DOM事件类"
data: 2018-03-04 10:27:00 +0800
categories: 原创
tag: 面试题目
---
* content
{:toc}

<!-- more -->



## 一、DOM事件类

### 1.1 回答的思路

> 1. 基本概念：DOM事件的级别
> 2. DOM事件模型
> 3. DOM事件流
> 4. 描述DOM事件捕获的具体流程
> 5. Event对象的常见应用
> 6. 自定义事件

### 1.2 基本概念：DOM事件的级别

|           DOM事件类         |                                事件级别                                        | 事件级别      |
|:----------------------|:----------------------------------------------------------------------------|:---|
|DOM0| element.onclick = function () {}||
|DOM2| element.addEventListener('click', function(){},false)| ie: element.attachEvent('click', function() {})|
|DOM3|element.addEventListener('keyup', function(){},false)|主要是事件类型增加了许多|

### 1.3 DOM事件模型

> * DOM事件模型指捕获和冒泡

![dom](/styles/images/interview/question/q-01.png)

### 1.4 DOM事件流

> * 事件流
> * 事件流分三个阶段：捕获 ===》 目标阶段 ===》 冒泡

![dom](/styles/images/interview/question/q-02.png)

### 1.5 描述DOM事件捕获的具体流程

![dom](/styles/images/interview/question/q-03.png)

### 1.6 Event对象的常见应用

|     Event对象常见应用     |                                备注                                   |
|:----------------------|:----------------------------------------------------------------------------|
|event.preventDefault()| 阻止浏览器默认行为|
|event.stopPropagation()|阻止冒泡| 
|event.stopImmediatePropagation()|element.addEventListener('keyup', function(){},false)|
|event.currentTarget|当前所绑定的事件的元素|
|event.target|当前被点击的元素|

### 1.7 自定义事件

![dom](/styles/images/interview/question/q-04.png)

> * Event 和 CustomEvent 都可以用来自定义事件
> * 他们唯一的区别就是：Event 只能传一个参数：事件名；而 CustomEvent则可以传递第二个参数，一个数据对象

> * [demo](/effects/demo/interview/js/event.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>自定义事件</title>
</head>
<body>
<div id="target">目标元素</div>
<script>
  const evTarget = document.getElementById('target')

  /* 方法一：Event */
  const event1 = new Event('test1');
  console.log(event1)
  evTarget.addEventListener('test1', function () {
    console.log('test1 dispatch');
  });
  evTarget.dispatchEvent(event1);


  /* 方法二：CustomEvent */
  const event2 = new CustomEvent('test2', {
    detail: {
      color: 'blue'
    }
  })
  console.log(event2)

  evTarget.addEventListener('test2', function (e) {
    console.log(`test2 dispatch，data is：${JSON.stringify(e.detail)}`);
  });
  evTarget.dispatchEvent(event2);

</script>
</body>
</html>
```

![dom](/styles/images/interview/question/q-05.png)




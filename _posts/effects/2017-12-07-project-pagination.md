---
layout: post
title: "分页插件"
date: 2017-12-07 22:00:00 +0800 
categories: 插件
tag: effects
---
* content
{:toc}

> 自己之前也写过分页插件，但发现，重新写一遍插件之后，又有了更多的收获，接下来与大家分享分享

<!-- more -->

## 一、思路导图

> * 以下是自己写分页插件时的思路导图

![pagination](/styles/images/plugins/pagination/pagination-02.png)

## 二、收获

> * 1.如何写一个更简单的的插件接口

> 这是之前的插件接口（简直没法看！！！）
```
 var  pag=JM.getEle('[jm-Pagination]'),
       pagination=new JM.component.Pagination(pag,{});
  pagination.updateMsg(function (handleEvent,data) {
    console.log(handleEvent);
    ajaxResult(handleEvent,data);
  });
  pagination.init();
```

> 这是新的插件接口

![pagination](/styles/images/plugins/pagination/pagination-01.png)

----

> * 2.在写插件的时候，要考虑是否有多种情况，就像那个具体页数的陈列一样；除此之外，当有多个 `if-else` 的时候，注意顺序排布，放在后面的 `if-else` 语句的条件中，其实已经包含了前面条件语句的否定【多余的嵌套就不要添加上去了！！】

![pagination](/styles/images/plugins/pagination/pagination-03.png)

---

> * 3.养成每个函数前面存储变量的习惯，一是可以减少作用域链的访问，而是之后引用的时候更明确清晰

```js
    let pageNum = this.pageNum
    let curPage = this.curPage
    let lis = ''
```

---

> * 4.一个函数只做一件事，分工明确；当遇到异步的时候，可以多使用 `ES7` 新的语法糖：`async` + `await`，减少使用`callback`

## 三、demo

> * 点击打开[demo](/effects/demo/plugins/pagination/index.html)

> * [源码下载](/effects/demo/plugins/pagination/pagination.zip)

## 四、总结
> 在第一次做分页插件的时候，觉得实现了功能就可以了，完全没想那么多。这次重新写一次分页插件，觉得自己之前写的
> 分页插件简直没法看（无论是代码规范还是一些性能上的优化），当然不能说我现在写的就是最好的哈！

> 以下是个人在写这次分页插件中的一些个人感悟吧，和大家分享分享

> 1. 在正式写插件之前，要先写好思路：
>   * 插件的架构
>   * 插件的功能
>   * 插件在不同情况下会有什么表现形式（就像分页插件中的页数展示列表一样有4种情况）
>   * 如果这个插件可能需要与后台进行数据对接的话，也要想好如何与后台进行数据对接，比如可能需要传些什么数据给后台呀，或者可能需要从后台获取些怎么样的数据【最好的办法就是：你前后端都做一遍，不就OK了！】
> 2. 每写一个插件的时候，不要有什么语法糖就直接套进去，而是要多想想：
>   * 这个语法糖的本质是什么
>   * 为什么要使用这个语法糖
>   * 什么语法糖在这里使用是最好的
> 3. 每写一个插件的时候，不要总回顾以往的写法，要从中跳出来，你才会收获更多：
>   * 想一想有什么写法是比之前的更好的
>   * 想一想还有什么可以优化的地方
>   * 想一想自己学了那么多的知识是否都有适当准确地运用到上面来

> 最后说一句：以上感悟都是基于扎实的基础以及你的知识面，当然，别忘记，还有最重要的一点：**实践**！！！




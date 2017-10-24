---
layout: post
title: "第一次模拟上机面试"
date: 2017-10-24 09:00:00 +0800 
categories: 面试
tag: interview
---
* content
{:toc}


<!-- more -->

## 一、先看看题目

### 1.1 题目

![relationship-map]({{ '/styles/images/interview/second/second-01.png' | prepend: site.baseurl }})

### 1.2 对要求的理解

> * 要求：不能上网，可以使用浏览器工具调试，兼容 `IE8` 及以上/ `firefox` / `Chrome`。

---

> * **如何理解“不能上网，可以使用浏览器工具调试”？**

> * 一开始，我只是单纯认为：上机考试不给上网很正常，使用浏览器工具调试不就是看看效果，调试一下样式之类的。
> * 然而，这只是 “使用浏览器工具调试”其中一部分的效用，其另外一个最重要的效用是：如果你想写一个效果，但是具体的属性名或者方法名你忘记了，此时你又不能上网，又不能翻书查找，难道你就这样放弃了？
> * 此时就是“浏览器工具调试”发挥最大作用的时候了，请看下面代码：

```js
console.log(window);
```

> * 请看输出结果【你会发现，基本上所有属性和方法都会挂载在`window`对象上，如果你突然忘记了，就可以`console.log` 出 `window`对象，查找需要的属性名或者方法名】

![relationship-map]({{ '/styles/images/interview/second/second-02.png' | prepend: site.baseurl }})

![relationship-map]({{ '/styles/images/interview/second/second-03.png' | prepend: site.baseurl }})

![relationship-map]({{ '/styles/images/interview/second/second-04.png' | prepend: site.baseurl }})

![relationship-map]({{ '/styles/images/interview/second/second-05.png' | prepend: site.baseurl }})

> * 除了上面所讲的效用外，其实我们在写一个效果的时候，不用一下子全部写出来，例如：移入（`mouseouver`）移出（`mouseout`），
    你要先保证元素获取到已经事件可以成功被触发，最好的测试工具也是“浏览器工具调试” --- 通过 `console.log(...)`。

---

> * 兼容 `IE8`
> * 你就应该想到关于 `DOM` 事件的一些兼容性问题以及这里只能使用 `es5` 的语法，而不能使用 `es6` 的语法。
> * 在效果写出来后，你仍需要在 `IE` 浏览器里，每个版本都需要测试一下，看一下有没有报错或者其他问题。

## 二、题目

> * 说句实话，这两道题目我一道题目都没有做出来，整个人感觉知识体系很乱，尽管想到了很多相关的东西。

### 2.1 题目1

> * 题目：页面内有一个正方形元素，实现对其拖拽和放下。看到题目，我想到了以下这些东西：

![relationship-map]({{ '/styles/images/interview/second/second-06.png' | prepend: site.baseurl }})

> * 然而我却有以下疑问：
>   * 怎么知道鼠标如何被抬起，即：不再按下去了？
>   * 如何让正方形跟随者鼠标移动？

### 2.2 题目2

> * 题目：页面内有一个 `input` 输入框，实现在数组 `arr` 查询命中词并和 `autocomplete`效果。看到题目，我想到了以下这些东西：

![relationship-map]({{ '/styles/images/interview/second/second-07.png' | prepend: site.baseurl }})

> * 事实上，我不理解 “命中词并”这个词！！当然，上述是我看到题目的第一反应，我也不知道我想得对不对。

## 三、总结

> * 以下是个人对这次模拟机面的一些想法以及总结：
>   * 1.面试官或许不是看你最后究竟能不能做出来，而是看你做题目的过程中：遇到问题如何解决？你拿到题目之后的思路是怎么样的？等等。【当然，能把题目做出来是最好的。】
>   * 2.由于只有1个小时的时间做题，其实我们并没有多余的时间，因此，当我在做一道题目的时候，就应该在编辑器（写注释）或者纸上写好自己的思路，以防这个思路部分不行，要换个思路，你又要重新将整个思路想一遍，这也太浪费时间了！！！
>   * 3.不到最后一刻，千万不要轻易就放弃！！当你在面试的时候，你是会紧张的，思路是不会一下子就出来的，此时，你就要不断去想回对应的知识点，寻找解决方法，而不是“不会了，我放弃了！！”。这样的话，面试官绝对拉你进黑名单（这个只是开个玩笑）
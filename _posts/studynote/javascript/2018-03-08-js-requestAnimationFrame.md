---
layout: post
title: "动画循环 - requestAnmationFrame"
data: 2018-03-08 12:27:00 +0800
categories: 学习笔记
tag: javascript
---

* content
{:toc}


<!-- more -->


## 一、循环间隔60Hz

早期的动画循环时候，最关键的问题是**确定循环间隔的时长**。一方面，循环间隔必须足够短，这样才能动画效果显得更平滑流畅；另一方面，循环时隔还要足够长，这样才能确保浏览器有能力渲染产生的变化。

我们知道**大多数的显示器的刷新频率是 60Hz ，即相当于在每秒钟中屏幕会重绘 60 次。因此最平滑动画的最佳循环间隔是 1000ms/60，约等于 16.7ms**。


## 二、计时器实现动画循环

早期动画循环的实现是通过**计时器**实现

```js
function animate() {
    // 动画内容
    animation1();
    animation2();
    // 间隔100ms执行动画循环
    setTimeout(function () {
        animate();
    }, 100);
}
// 执行动画
animate();
```

但是，无论是 `setTimeout` 和 `setInterval` 都并不是十分精准。原因如下：

`javascript` 是单线程的，一次只能执行一段代码。所以，为了控制代码的顺序，就需要通过`javascript`的任务队列来管理。
通过 `setTimeout` 和 `setInterval` 我们能够设置延时多长时间把我们的代码任务添加到 `JavaScript`任务队列 中。
如果当前任务队列是空的，那么添加的代码可以立即执行；如果队列不是空的，则新添加的任务需要等到其前面所有的任务都执行完成才能执行。
由于前面的任务到底需要多少时间执行完，是不确定的，所以没有办法保证，`setTimeout` 和 `setInterval` 指定的任务，一定会按照预定时间执行。

如下面代码：

```js
setTimeout(animateTask, 1000 / 60);
// 耗时长的任务
longTimeTask();
```

我们指定 `16.7ms` 后运行 `animateTask` 任务，但是，如果后面的 `longTimeTask()`执行起来非常耗时，甚至过了16.7ms仍无法结束，那么延迟执行的 `animateTask` 就只有等着，只有等到前面的任务都运行完，才能轮到它执行。


## 三、requestAnimationFrame

因此，`requestAnimationFrame` 是基于计时器的不精准而诞生的。它是为了实现高性能的帧动画而设计的一个 `API`。

你可以把它用在 `DOM` 上的效果切换或者 `Canvas` 画布动画中。 
`requestAnimationFrame` 并不是定时器，但和 `setTimeout` 很相似，在没有 `requestAnimationFrame` 的浏览器一般都是用 `setTimeout`模拟。 
`requestAnimationFrame` 跟屏幕刷新同步（大多数是 `60Hz` ）。

```js
// 判断是否有 requestAnimationFrame 方法，如果有则模拟实现
window.requestAnimFrame =
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback) {
    window.setTimeout(callback, 1000 / 30);
};
```

`requestAnimationRequest` 的使用：（其实就是递归调用，从而实现动画循环）

```js
 // 动画执行函数
function animate() {
    // 随机更新圆形位置
    circle.move();
    // 清除画布
    context.clearRect(0, 0, canvas.width, canvas.height);
    // 绘画圆
    circle.draw();
    // 使用requestAnimationFrame实现动画循环
    requestAnimationFrame(animate);
}
```
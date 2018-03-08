---
layout: post
title: "项目 - 射击游戏"
date: 2018-03-07 09:00:00 +0800 
categories: 项目
tag: project
---
* content
{:toc}



<!-- more -->

## 一、游戏界面和初始代码

### 1.1 开始界面

![shootingGame-01](/styles/images/project/shootingGame/sg-01.png)

### 1.2 游戏界面

#### 1.2.1 参数界面

![shootingGame-02](/styles/images/project/shootingGame/sg-02.png)

#### 1.2.2 怪兽移动

![shooting-game-monster-move](/styles/images/project/shootingGame/shooting-game-monster-move.gif)

#### 1.2.3  击中怪兽

![shooting-game-attack-enemy](/styles/images/project/shootingGame/shooting-game-attack-enemy.gif)

#### 1.2.4 飞机死亡

![shooting-game-monster-end](/styles/images/project/shootingGame/shooting-game-monster-end.gif)

### 1.3 游戏失败界面

![shootingGame-03](/styles/images/project/shootingGame/sg-03.png)

### 1.4 游戏成功界面

![shootingGame-04](/styles/images/project/shootingGame/sg-04.png)

## 二、思路

### 2.1 界面分类

游戏主要有4种界面：

* 游戏初始界面
* 游戏进行中的界面
* 游戏失败的界面
* 游戏成功的界面

### 2.2 游戏对象分类

* 飞机
* 子弹
* 敌人
* 键盘
* 配置

### 2.3 给出的js代码

```js
  // 元素
  var container = document.getElementById('game');
  /**
   * 整个游戏对象
   */
  var GAME = {
    /**
     * 初始化函数,这个函数只执行一次
     * @param  {object} opts
     * @return {[type]}      [description]
     */
    init: function(opts) {
      this.status = 'start';
      this.bindEvent();
    },
    bindEvent: function() {
      var self = this;
      var playBtn = document.querySelector('.js-play');
      // 开始游戏按钮绑定
      playBtn.onclick = function() {
        self.play();
      };
    },
    /**
     * 更新游戏状态，分别有以下几种状态：
     * start  游戏前
     * playing 游戏中
     * failed 游戏失败
     * success 游戏成功
     * all-success 游戏通过
     * stop 游戏暂停（可选）
     */
    setStatus: function(status) {
      this.status = status;
      container.setAttribute("data-status", status);
    },
    play: function() {
      this.setStatus('playing');
    }
  };
  // 初始化
  GAME.init();
```

### 2.4 各对象间的逻辑关系

> 一个游戏会有很多个对象，每个对象间有什么关系？又是如何去控制、管理这些对象？

![shootingGame-05](/styles/images/project/shootingGame/sg-05.png)

* 整个游戏的主角们就是子弹、飞机、怪兽，而他们三类又有一些共通点，因此就添加了一个父类 - 元素类（这里用到了面向对象中继承的思想）
* 子弹是由飞机产生的，因此，飞机类管理子弹类
* 游戏对象（`GAME`）是整个游戏的控制者，操作飞机和怪兽类
* 游戏需结合键盘才可以实现，同时为了方便，独立出来一个键盘对象，控制飞机的移动、射击等
*  入口时`GAME`对象，但是需要初始化，则需要配置对象(`CONFIG`)来传入

## 三、模块化思想

既然有那么多对象，相对的肯定有一定量的代码，但是我们不可能将所有代码都挤在同一个 `js` 文件中，因此，我们需要有**模块化思想**！

以下是目录结构：

![shootingGame-06](/styles/images/project/shootingGame/sg-06.png)

* 一个文件就是一个模块，而这里的每个`js`文件都代表着一个特定的对象

---

这里补充一下：

* `app.js`：整个游戏的具体逻辑都在里面，就是`Game`对象
* `util`：一些与游戏逻辑无关的功能函数，其实就是工具包

## 四、游戏流程和状态

在开始写游戏具体逻辑代码之前，我们需要知道游戏的具体流程是怎么样的（包括游戏准备 ===》 游戏开始 ===》 游戏结束）

那么游戏又有什么状态？比如：游戏开始后怎么样，游戏成功后怎么样，游戏结束后又怎么样

这些“怎么样”或许会包含以下：

* 游戏状态的处理
* 游戏界面的处理（包括对飞机、敌人的处理）

![shootingGame-07](/styles/images/project/shootingGame/sg-07.png)

> 只有把控了整个游戏的流程以及知道游戏中会出现什么状态，你才能深入其中，知道在设计游戏的时候，每一步都该做什么（即写什么代码）

## 五、动画循环

### 5.1 动画循环原理

动画循环是实现动画效果的基础，其由三部分组成：更新操作、清除操作、绘制操作；在动画过程中，这三步是会不断重复执行的，所以也称其为动画循环

![shootingGame-08](/styles/images/project/shootingGame/sg-09.png)

---

对于射击游戏来说，其实现动画的基础也是动画循环。

![shootingGame-08](/styles/images/project/shootingGame/sg-08.png)

### 5.2 requestAnimationFrame

**循环间隔60Hz**

早期的动画循环时候，最关键的问题是**确定循环间隔的时长**。一方面，循环间隔必须足够短，这样才能动画效果显得更平滑流畅；另一方面，循环时隔还要足够长，这样才能确保浏览器有能力渲染产生的变化。

我们知道**大多数的显示器的刷新频率是 60Hz ，即相当于在每秒钟中屏幕会重绘 60 次。因此最平滑动画的最佳循环间隔是 1000ms/60，约等于 16.7ms**。

---

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

---

**requestAnimationFrame**

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

## 六、碰撞检测

### 6.1 射击游戏的碰撞检测分类

对于像射击这类游戏来说，少不了碰撞检测。这个游戏的碰撞检测主要分为两种：

* 怪兽和画板的碰撞检测
* 子弹和怪兽的碰撞检测
* 飞机和怪兽的碰撞检测

### 6.2 怪兽和画板的碰撞检测。

怪兽一开始默认向右移动，等到了画板的最右边（其实就是与画板的最右面发生了碰撞），
那么整行怪兽就会移到下一行，向左移动，到了画板的最左边，那么整行怪兽就会移到下一行，向右移动，。。。，直到游戏结束为止，怪兽都是按这个套路去移动。

因此，我们就要做碰撞检测。那么怪兽有那么多个，以哪一个为标准，进行碰撞检测？条件又是什么？如果子弹射中了怪兽，那么，会不会影响怪兽的移动以及碰撞检测呢？

先看下图（模拟了每次碰撞后，怪兽的表现）：

![shootingGame-14](/styles/images/project/shootingGame/sg-14.png)

从上图可以发现：

1. 如果怪兽向右移动，那么与画板右边界碰撞的是最后一个怪兽
2. 如果怪兽向左移动，那么与画板左界面碰撞的则是第一个怪兽
3. 如果有怪兽被子弹消灭了，怪兽和画板的碰撞检测依然遵循1、2点

以上是针对只有单行的怪兽而言。

---

那么，如果遇到有多行怪兽，其选择的标准又是什么呢？其实原理差不多。

![shootingGame-15](/styles/images/project/shootingGame/sg-15.png)

每一行都有最后一个怪兽以及第一个怪兽，那么究竟哪一行的最后一个怪兽和第一个怪兽是我们的选择标准呢？

此时我们需要换一个角度来想：既然那么多个最后和第一，那么我们只要找到多个怪兽在水平位移上的“最小值”和“最大值”即可！

* 如果“最小值”小于画板的左边界，那么就说明怪兽与画板的左边界发生了碰撞，此时怪兽需要换行，向右移动
* 如果“最大值”大于画板的右边界，那么就说明怪兽与画板的右边界发生了碰撞，此时怪兽需要换行，向左移动

综上所述，怪兽和画板的碰撞检测的关键点在于：**找到多个怪兽在水平位移上的“最小值”和“最大值”**，关键代码如下：

```js
/**
 * 获取元素最小和最大边界
 * @param {Array} elems
 * @returns {{minX: *, maxX: *}}
 **/
function getXBoundary(elems) {
    var currentX1,
        currentX2;

    // 通过遍历，利用 currentX1 记录元素的最小 x 坐标，currentX2 记录元素的最大 x 坐标，
    // 并与新遍历的元素的 x 坐标作比较，直到找到 最小的 x 坐标（即：左边界），最大的 x 坐标（即：右边界）为止
    // 其实，这里就是属于选择排序的“选择”思想：从数组的开头开始，将第一个元素和其他元素进行比较，找到最小值为止。
    // 即：一次遍历，两种比较，找到最小值以及最大值就可以了
    elems.forEach(function (item) {
        if (!currentX1 && !currentX2) {
            currentX1 = item.x;
            currentX2 = item.x;
        } else {
            // 寻找最小值
            if (item.x < currentX1) {
                currentX1 = item.x;
            }

            //寻找最大值
            if (item.x > currentX2) {
                currentX2 = item.x;
            }
            // console.log(item.x, currentX1, currentX2);
        }
    });

    return {
        minX: currentX1,
        maxX: currentX2
    };
}
```



### 6.3 子弹和怪兽的碰撞检测

我们可以将怪兽看作矩形，将子弹也看做矩形，因此，这也变成了**矩形间的碰撞检测**，详细参考【[碰撞检测](http://www.jmazm.com/2018/03/08/js-crash-check/)】


![shootingGame-16](/styles/images/project/shootingGame/sg-16.png)

### 6.4 飞机和怪兽的碰撞检测









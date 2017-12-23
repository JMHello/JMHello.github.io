---
layout: post
title: "javasript - 设计模式 - 策略模式"
data: 2017-12-23 12:27:00 +0800
categories: 原创
tag: js-设计模式
---
* content
{:toc}

* 其他连接：
    + [javasript - 设计模式 - 适配器模式]({{ '/2017/09/13/js-adapter-pattern' | prepend: site.baseurl }})
    + [javasript - 设计模式 - 单例模式]({{ '/2017/09/13/js-singleton-pattern' | prepend: site.baseurl }})
    + [javasript - 设计模式 - 装饰器模式]({{ '/2017/09/15/js-decorator-pattern' | prepend: site.baseurl }})
    


<!-- more -->

## 一、策略模式

### 1.1 什么是策略模式

> * 策略模式（`Strategy`）：将定义的一组算法封装起来，使其相互之间可以替换。
>   * 封装的算法具有一定独立性，不会随客户端变化而变化。

### 1.2 为什么要使用策略模式

> * 先看下面的代码 - 计算奖金的【点击打开[demo](/effects/demo/designPatterns/stragtegy/eg1.html)】

```js
let calculateBonus = (performanceLevel, salary) => {
  if (performanceLevel === 'S') {
    return salary * 4
  } else if (performanceLevel === 'A') {
    return salary * 3
  } else if (performanceLevel === 'B') {
    return salary * 2
  }
}

  console.log(calculateBonus('B', 2000)) // 4000
  console.log(calculateBonus('S', 3000)) // 12000
```

> * 你会发现上面的代码很简单，但是有着很大的缺点：
>   1. `calculateBonus` 函数庞大：包含了大量的 `if-else` 语句
>   2. `calculateBonus` 函数缺乏弹性：加入我要增加一种新的绩效等级 `C` 或者将绩效等级为 `S` 的系数改成5，我们就必须深度到函数内部实现，
>       **这违反了开放-封闭原则**。
>   3. 算法的复用性差：如果在程序的其他地方需要重用这些计算奖金的算法，我们的选择只有复制和粘贴。

### 1.3 使用策略模式实现奖金计算

> * 先看下面的代码 - 使用策略模式实现奖金计算【点击打开[demo](/effects/demo/designPatterns/stragtegy/eg2.html)】

```js
    // 策略对象
    let strategies = {
      S (salary) {
        return salary * 4
      },
      A (salary) {
        return salary * 3
      },
      B (salary) {
        return salary * 2
      }
    }
    // 调用接口 -- 计算奖金的函数
    function calculateBonus(performanceLevel, salary) {
      return strategies[performanceLevel](salary)
    }

    console.log(calculateBonus('A', 5000)) // 15000
    console.log(calculateBonus('B', 2000)) // 4000
```

### 1.4 总结如何使用策略模式

> 1. 创建一个策略对象：将需要的算法都封装在这个对象里面。
> 2. 创建一个调用接口：这个调用接口就是用来实现对策略算法的调用。
---
layout: post
title: "jest - expect"
data: 2017-10-10 16:27:00 +0800
categories: 原创
tag: jest
---
* content
{:toc}

> * 当你在编写测试案例的时候，你经常需要检测这些值是否满足某些条件。
> * 此时我们就需要用到 **断言（`Assert`）**。
> * 在`jest`中，我们使用`expect()`方法并配合一些“匹配器”（`matchers`）一起使用，保证我们可以验证不同的情况。

<!-- more -->

## 一、expect(value)

* 如果你想测试一个值，`expect`函数一定会被用到。不过它很少单独使用，它一般会结合一些**匹配器**一起使用。

## 二、相等的匹配器 

### 2.1 .toBe(value)

> * `toBe` 等价于 `javascript` 中的 全等 `===`。

```js
const info = {
  name: 'jm',
  age: 12
};

describe('the person info', () => {
  // 姓名
  test(`name is jm`, () => {
    expect(info.name).toBe('jm');
  })
  
  // 年龄
  test('age is 12', () => {
    expect(info.age).toBe(12);
  })
})
```

> * 不可以在`toBe`中使用浮点数。如果你想判断浮点数，使用`toBeCloseTo`。

### 2.2 .toEqual(value)

> * 当你想要比较来给你个对象是否拥有相同的值的时候，就可以使用`toEqual(value)`方法。
> * 这个匹配器是递归式地检测所有字段的相等性，而不是检测对象的标识符，这也可以称为深度相等（`deep equal`）。

```js
const can1 = {
  flavor: 'grapefruit',
  ounces: 12,
};
const can2 = {
  flavor: 'grapefruit',
  ounces: 12,
};

describe('the La Croix cans on my desk', () => {
  test(`have all the same properties`, () => {
    expect(can1).toEqual(can2);
  })
  
  test('are not the exact same can', () => {
    expect(can1).not.toBe(can2);
  })
}) 
```

> * `.toEqual` 不能用来对两个错误进行深度检测。只有 `Error` 的 `message` 可以认为相等的。
> * 建议使用 `.toThrow` 匹配器对错误进行测试。

### 2.3 .toBeNull()

### 2.4 .toBeUndefined

## 三、与包含相关的匹配器（对象、数组、字符串）

### 3.1 t.toHaveProperty()

### 3.2 .toContain()

### 3.3 .toMatch()

## 四、与逻辑相关的匹配器

### 4.1 .toBeTruthy()

### 4.2 .toBeFalsy()

### 4.3 .toBeGreaterThan

### 4.4 .toBeLessThan

## 五、.not


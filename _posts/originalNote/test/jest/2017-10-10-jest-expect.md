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

> * `.toBeNull()` 等价于 `.toBe(null)`。
> * 当你想检测某个值是否为`null`时，可使用这个方法。

```js
function bloop() {
  return null;
}

test(`bloop returns null`, () => {
  expect(bloop()).toBeNull();
})
```

### 2.4 .toBeUndefined()

> * 使用 `.toBeUndefined()` 去检测一个变量是不是`undefined`。
> * `.toBeUndefined()` 等价于 `.toBe(undefined)`，但是更好的做法是在代码中避免直接引用`undefined`。

```js
test(`the best drink for octopus flavor is undefined`, () => {
  expect(bestDrinkForFlavor(`octopus`)).toBeUndefined();
})
```

## 三、与包含相关的匹配器（对象、数组、字符串）

### 3.1 t.toHaveProperty(keyPath, value)

> * 使用 `.toHaveProperty()` 可以判断对象中是否存在 `keyPath` 这个属性
> * 如果传入第二个参数，可以判断对象中的 `keyPath` 这个属性的值是否等于`value`。
> * `.toHaveProperty()` 匹配器主要使用 **深度相等**，像 `toEqual()`，并且会递归检测所有字段的相等性。

```js
const houseForSale = {
  bath: true,
  bedroom: 4,
  kitchen: {
    ameniies: [`oven`, `stove`, `washer`],
    area: 20,
    wallColor: `white`
  }
}

test(`this house has my desired features`, () => {
  // 简单引用
  expect(houseForSale).toHaveProperty(`bath`);
  expect(houseForSale).toHaveProperty(`bedroom`, 4);
  
  expect(houseForSale).not.toHaveProperty(`pool`);
  
  // 深度引用，通过点操作符
  expect(houseForSale).toHaveProperty(`kitchen.area`, 20);
  expect(houseForSale).toHaveProperty(`kitchen.amenities`, [
    `oven`,
    `stove`,
    `washer`
  ]);
  
  expect(houseForSale).not.toHaveProperty(`kitchen.open`);
})
```

### 3.2 .toContain(item) - 数组和字符串

> * 当你想检测一个`item` 在不在数组里，可以使用 `.toContain(item)`。【严格遵守`===`全等】
> * 也可以检测字符串是否存在于另外一个字符串里。

```js
test(`the flavor list contains lime`, () => {
  expect(getAllFlavors()).toContain(`lime`);
})
```

### 3.3 .toMatch(regexpOrString)

> * 字符串匹配正则可以使用`.toMatch()`。
> * 该方法接受的参数：正则表达式或者字符串

```js
describe(`an essay on the best flavor`, () => {
  test(`mentions grapefruite`, () => {
    expect(essayOnTheBestFlavor()).toMatch(/grapefruit/);
    expect(essayOnTheBestFlavor()).toMatch(new RegExp(`grapefruit`));
    
    expect(`grapefruits`).toMatch(`fruit`);
  })
})
```

## 四、与逻辑相关的匹配器

### 4.1 .toBeTruthy() - 真

> * 当你不介意值是什么，但你只想保证值是正确的时，就可以使用`.toBeTruthy()`。

> * 例子：

```js
drinkSomeLaCroix ();
if (thirstInfo()) {
  drinkMoreLaCroix();
}
```

> * 你并不介意 `thirstInfo` 返回值是什么，特别的是，它返回的是`true` 或者一个复杂的对象，促使你的代码能继续运行。

```js
test(`drinking La Croix leads to having thirst info`, () => {
  drinkSomeLaCroix();
  expect(thirstInfo()).toBeTruthy();
})
```

> * 在 `javascript` 中，有6个假值： `false`、`0`、`null`、`' '`、`undefined` 、`NaN`。其他的值都是真的。

### 4.2 .toBeFalsy() - 假

> * 当你不介意值是什么，但你只想保证值是假（错误）的时，就可以使用`.toBeFalsy()`。

```js
drinkSomeLaCroix ();
if (!getErrors()) {
  drinkMoreLaCroix();
}
```

> * 你并不介意 `getErrors` 返回值是什么，特别的是，它返回的是`false`、`0`、`null`、`' '`、`undefined` 、`NaN`，促使你的代码能继续运行。

```js
test(`drinking La Croix does not lead to errors`, () => {
  drinkSomeLaCroix();
  expect(getErrors()).toBeFalsy();
})
```

### 4.3 .toBeGreaterThan(number) - 大于

> * 等价于 `>` - 大于。
> * 这个方法可以比较浮点数。

```js
test(`ounces per can is more than 10`, () => {
  expect(ouncesPerCan()).toBeGreaterThan(10);
})
```

### 4.4 .toBeGreaterThanOrEqual(number) - 大于或等于

> * 这个方法可以比较浮点数。

```js
test('ounces per can is at least 12', () => {
  expect(ouncesPerCan()).toBeGreaterThanOrEqual(12);
});
```

### 4.5 .toBeLessThan(number) - 小于

> * 这个方法可以比较浮点数。

```js
test('ounces per can is less than 20', () => {
  expect(ouncesPerCan()).toBeLessThan(20);
});
```

### 4.6 .toBeLessThanOrEqual(number)  - 小于或等于

> * 这个方法可以比较浮点数。

```js
test('ounces per can is at most 12', () => {
  expect(ouncesPerCan()).toBeLessThanOrEqual(12);
});
```

## 五、.not

> * `.not`取反。即：原来是`true`的变为`false`，原来是`false`的变为`true`。

```js
test(`the best flavor is not coconut`, () => {
  expect(bestLaCroixFlavor()).not.toBe(`coconut`);
})
```
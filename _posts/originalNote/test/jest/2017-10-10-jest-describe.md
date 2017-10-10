---
layout: post
title: "jest - describe"
data: 2017-10-10 14:27:00 +0800
categories: 原创
tag: jest
---
* content
{:toc}

<!-- more -->

## 一、describe(name, fn)

* `describe(name, fn)`：创建一个区块，将一些“测试套件”（`test suite`）中的相关测试组合在一起。

* 例子：

```js
const myBeverage = {
  delicious: true,
  sour: false
};

describe('my beverage', () => {
  // is delicious
  test('is delicious', () => {
    expect(myBeverage.delicious).toBeTruthy();
  })
  
  // is not sour
  test('is not sour', () => {
    expect(myBeverage.sour).toBeFalsy();
  })
})
```

* `describe(name, fn)` 不是必须的，你可以将测试区块（`test block`），即：测试案例抽出来写，但是如果你使用了`describe(name, fn)`，能让你的测试案例分好组，比较清晰。

* 你也可以嵌套`describe`块，如果你希望有层次结构的测试。

```js
const binaryStringToNumber = binString => {
  if (!/^[01]+$/.test(binString)) {
    throw new CustomError('Not a binary number');
  }
  
  return parseInt(binString, 2);
}

describe('binaryStringToNumber', () => {
  // 无效的二进制字符串
  describe('given an invalid binary string', () => {
    // 字符串中不存在数字
    test('composed of non-numbers throws CustomError', () => {
      expect(() => binaryStringToNumber('abc')).toThrowError(CustomError);
    });
    
    // 存在空白符
    test('with extra whitespace throws CustomError', () => {
      expect(() => binaryStringToNumber(` 
      100`)).toThrowError(CustomError);
    })
  })
  
  // 有效的二进制字符串
  describe('given a valid binary string', () => {
    test(`return the correct number`, () => {
      expect(binaryStringToNumber(`100`)).toBe(4);
    })
  })
})
```





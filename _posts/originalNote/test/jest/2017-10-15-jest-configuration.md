---
layout: post
title: "jest - config"
data: 2017-10-15 10:27:00 +0800
categories: 原创
tag: jest
---
* content
{:toc}


* 尽管 `jest` 不需要配置就能使用，但是，`jest` 也是可以配置的。
* `jest`有三种配置方式：
    * 1.在`package.json`文件里配置。
    * 2.在 `jest.config.js` 文件里配置。（需在根目录下）
    * 3.命令行里配置。
    
<!-- more -->

## 一、在 `jest.config.js` 文件里配置

```js
// jest.config.js
module.exports = {
  verbose: true
}
```

### 1.1 testMatch `[array<string>]`

> * `testMatch` 的默认值： `['**/__tests__/**/*.js?(x)', '**/?(*.)(spec|test).js?(x)']`


> * 这个配置项是为了检测测试文件。
> * 在 `__tests__` 文件夹里的 `.js` 和 `.jsx`文件都是测试文件。
> * 带有后缀名 `.test` 或 `spec` 的 文件也是测试文件。  
>    * 例子： `component.test.js` 文件或 `component.spec.js` 文件

```js
module.exports = {
  testMatch: ['**/__test__/**/*.js?(x)', '**/?(*.)(spec|test).js?(x)']
}
```

### 1.2 testRegex `[string]`

> * `testRgex` 默认值：`(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$`

> * 这个配置项用来检测测试文件的。其作用与 `testMatch` 一样。 【**`testMatch` 和 `testRegx` 二者只能存在一个**】
> * 在 `__tests__` 文件夹里的 `.js` 和 `.jsx`文件都是测试文件。
> * 带有后缀名 `.test` 或 `spec` 的 文件也是测试文件。  
>    * 例子： `component.test.js` 文件或 `component.spec.js` 文件

![relationship-map]({{ '/styles/images/jest/jest-01.png' | prepend: site.baseurl }})

### 1.3 testEnvironment `[string]`

> * `testEnvironment` 默认值：`jsdom`。

> * 测试环境是用来测试的。
> * 在 `jest`中，默认的环境是通过 `jsdom` 类似浏览器的环境。
> * 如果你想构建 `node` 服务，你可以使用 `node`选项去使用类似 `node` 的环境。

> * 如果一些测试需要其他环境，你可以添加 `@jest-environment` 文档块。

```js
/**
 * @jest-environment jsdom
 */

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});
```

### 1.4 rootDir `[string]`

> * `rootDir` 默认值：包含 `package.json`文件的根目录 或者 `pwd`文件的根目录（在 `package.json`文件找不到的情况下是）

> * `Jest`可以在根目录里扫描里面的测试案例（`tests`）以及模块（`modules`）。
> * 如果你将你的 `jest` 配置放在了 `package.json`文件里 并且希望根目录是你的`repo`的根目录，那么这个配置参数的值将默认为 `package.json` 的目录。

> * 通常情况下，你想设置根目录是 `src` 或者 `lib`，与你的存储代码的库相对应。
> *  记得：在其他基于路径的配置里，使用作为字符标识的 `<rootDir>` 会返回此值。
> * 例如：你想你的 `setupFiles` 的配置入口点在你的项目的根目录下的 `env-setup.js` 文件，你可以设置 `[<rootDir>/env-setup.js]`。

### 1.5 moduleFileExtenstions `[array<string>]`

> * `moduleFileExtensions` 的默认值：`['js', 'json', 'jsx', 'node']`
> * 模块中使用的一系列文件扩展名。
> * 如果你想模块不需要指定文件扩展名，那么这个数组里的文件扩展名就是 `jest` 想要查找的。
> * 如果你想使用 `TypeSript`，数组为：`["js", "jsx", "json", "ts", "tsx"]`，检测 `ts-test`的文件。 

## 二、 在`package.json`文件里配置

> * 只需要在 `package.json` 文件里添加 `jest` 的属性值，并添加相关的配置就可以了，如下：

```json
{
  "name": "my-project",
  "jest": { // 添加 jest
    "verbose": true
  }
}
```

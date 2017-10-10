---
layout: post
title: "javascript - 测试 - 几个比较流行的框架"
data: 2017-10-08 14:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

* 相关文章
    + [javascript - 执行上下文](http://www.jmazm.com/2017/10/08/js-EC/)
    + [javascript - 作用域与作用域链](http://www.jmazm.com/2017/10/08/js-Scope/)
    + [javascript - 闭包](http://www.jmazm.com/2017/09/30/js-closure/)

<!-- more -->

* qunitjs - jquery御用框架，只为浏览器服务，不能运行在 nodejs上

* mochajs - 既为浏览器服务也支持在node上运行，并且有`expressjs`与其配合，是一个比较中庸的库，没有什么明显的短板

* jasmine - 由 JsUnit 演化而来，既为浏览器服务也支持在node上运行，有 vue.js 与它配合

* karma-runner - 严格上讲，它不是一个库，它是一个 test-runner，它具有包容性，可以结合许多库一起使用，主动捕捉你系统里有的浏览器，自动在这些浏览器中运行

* jest - 与 react、koa 配合使用，它零配置，内置代码覆盖率，强大的Mocks



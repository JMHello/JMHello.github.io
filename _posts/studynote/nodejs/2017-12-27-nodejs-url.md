---
layout: post
title: "nodejs - url模块"
date: 2017-12-27 15:00:00 +0800 
categories: 学习笔记
tag: node.js
---
* content
{:toc}

<!-- more -->

## 一、url模块

### 1.1 url

> * 以下是 `url` 对象

```js
{ Url: [Function: Url],
  parse: [Function: urlParse],
  resolve: [Function: urlResolve],
  resolveObject: [Function: urlResolveObject],
  format: [Function: urlFormat],
  URL: [Function: URL],
  URLSearchParams: [Function: URLSearchParams],
  domainToASCII: [Function: domainToASCII],
  domainToUnicode: [Function: domainToUnicode]
}
```

### 1.2 url.parse(urlStr, [parseQueryString], [slashesDenoteHost])

> * `urlStr` ：url字符串
> * `parseQueryString` ：为 `true` 时将使用查询模块分析查询字符串，默认为`false`
> * `slashesDenoteHost` ：          
>   * 默认为`false`【`//foo/bar` 形式的字符串将被解释成 `{ pathname: ‘//foo/bar' }`】
>   * 如果设置成 `true`【`//foo/bar` 形式的字符串将被解释成  `{ host: ‘foo', pathname: ‘/bar' }`】

> * 例1：

```js
const url = 'http://localhost:8080/static/css/index.css'

console.log(path.parse(url))
/*
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'localhost:8080',
  port: '8080',
  hostname: 'localhost',
  hash: null,
  search: null,
  query: null,
  pathname: '/static/css/index.css',
  path: '/static/css/index.css',
  href: 'http://localhost:8080/static/css/index.css' }
*/
```
---

> * 例2：

```js
const url_2 = 'http://example.com:8080/one?a=index&t=article&m=default'

console.log(path.parse(url_2))
/*
Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'example.com:8080',
  port: '8080',
  hostname: 'example.com',
  hash: null,
  search: '?a=index&t=article&m=default',
  query: 'a=index&t=article&m=default',
  pathname: '/one',
  path: '/one?a=index&t=article&m=default',
  href: 'http://example.com:8080/one?a=index&t=article&m=default'
}
*/
```







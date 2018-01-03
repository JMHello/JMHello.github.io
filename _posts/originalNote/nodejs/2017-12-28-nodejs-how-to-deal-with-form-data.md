---
layout: post
title: "nodejs - 如何处理表单数据"
date: 2017-12-28 15:00:00 +0800 
categories: 原创
tag: node.js
---
* content
{:toc}

<!-- more -->



## 一、表单数据的常用类型

### 1.1 form-data

```
------WebKitFormBoundary7A3ic8cRgGi1LkSv
Content-Disposition: form-data; name="name"


admin
------WebKitFormBoundary7A3ic8cRgGi1LkSv
Content-Disposition: form-data; name="password"


e10adc3949ba59abbe56e057f20f883e
------WebKitFormBoundary7A3ic8cRgGi1LkSv--
```

### 1.2 x-www-form-urlencoded

```
name=admin&password=e10adc3949ba59abbe56e057f20f883e
```

### 1.3 json

```json
{
    "name": "admin",
    "password": "e10adc3949ba59abbe56e057f20f883e"
}
```

### 1.4 二进制

## 二、处理表单数据







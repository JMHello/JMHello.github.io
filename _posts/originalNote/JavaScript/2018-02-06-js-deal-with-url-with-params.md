---
layout: post
title: "javascript - 处理带有参数的URL"
data: 2018-02-06 14:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

<!-- more -->

## 一、 处理带有参数的URL

> * [demo](/effects/demo/js/matchUrl/v1.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>处理有参数的URL</title>
</head>
<body>
<h2>带有参数的url</h2>
<p>/v1/api/:id/books?username=:name&password=:pwd</p>

<h2>真实的url</h2>
<p>/v1/api/123/books?username=garven&password=9898p</p>

<script>
    let realUrl = '/v1/api/123/books?username=garven&password='
    let apiUrl = '/v1/api/:id/books?username=:name&password=:pwd'
    dealWithUrlWithParams(realUrl, apiUrl)


    /**
     * 处理带有参数的url
     * @param {String} realUrl 真实路由
     * @param {String} apiUrl 匹配路由
     * @return {Object}
     * @example {
     *      id: "123",
     *      name: "garven"
     * }
     */

    function dealWithUrlWithParams (realUrl,apiUrl) {
      let apiReg = apiUrl
      let result = []
      let params = {}


      /*
        第一：路径中的“/”需要转义
        第二：路径中的 “?”需要转义
        第三：将参数转换成 [\w\u4e00-\u9fa5] （\u4e00-\u9fa5代表任意汉字）
            参数的表示状态有三种：
                第一种：:id/
                第二种：:id?
                第三种：:id&
            $1：指示的是 \/ 或者 \? 或者 & 或者 $ （$1表示第一个捕获组的字符串）
       */
      
      apiReg = apiUrl.replace(/\//g, '\\\/')
        .replace(/\?/g, '\\\?')

      // 获取参数名，存储在数组里
      let paramsResult = apiReg.match(/:\w+(?=\\\/|\\\?|&|$)/g)

      // 将参数转换成 [\w\u4e00-\u9fa5]
      apiReg = apiReg.replace(/:\w+(\\\/|\\\?|&|$)/g, '([\\w\u4e00-\u9fa5]*?)$1')

      // 将字符串转化成正则表达式
      apiReg = new RegExp(`^${apiReg}$`)

      // 获取参数值
      let apiRegResult = realUrl.match(apiReg)
      if (apiRegResult && apiRegResult.length) {
        result = apiRegResult.splice(1)
      }

      // 将参数名和参数值一一对应
      for (let i = 0, len = paramsResult.length; i < len; i++) {
        const name = paramsResult[i].slice(1)
        const value = result[i]
        params[name] = value
      }

      return params
    }
</script>
</body>
</html>
```
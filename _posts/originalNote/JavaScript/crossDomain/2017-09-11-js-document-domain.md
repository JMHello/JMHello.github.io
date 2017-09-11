---
layout: post
title: "javasript -跨域 - document.domain和iframe"
data: 2017-09-11 22:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

* 其他连接：
    + [javasript - 同源策略]({{ '/2017/09/07/js-Same-Origin-Policy' | prepend: site.baseurl }})
    + [javasript - 跨域 - CORS]({{ '/2017/09/07/js-CORS' | prepend: site.baseurl }})
    + [javasript - 跨域 - JSONP]({{ '/2017/09/07/js-JSONP' | prepend: site.baseurl }})
    + [javasript - 跨域 - Iframe和window.name]({{ '/2017/09/09/js-Iframe' | prepend: site.baseurl }})
    + [javasript - 跨域 - 动态创建script标签]({{ '/2017/09/11/js-script' | prepend: site.baseurl }})

<!-- more -->

## 一、什么是document.domain

### 1.1 简介

* `domain`是`document`的一个属性，表示页面的域名。
* `document.domain`可写可读。

### 1.2 注意事项

* 由于安全限定，并不是可以为 `document.domain`设置任何值，即：只能是**一级域名**
    * 例：
    ```js
    //假设页面来自 p2p.wrox.com 域
    document.domain = "wrox.com"; // 成功
    document.domain = "nczonline.net"; // 出错！
    
    //假设页面来自 p1p.wrox.com 域
    document.domain = "wrox.com"; // 成功
    ```

> 补充一级域名：  
> `www.iisp.com`这种形式的域名并不是一级域名，他只是一个二级域名，也就是说`www`只是一个主机名。
         真正的一级域名是由一个**合法字符串＋域名后缀**组成。所以，`iisp.com`这种形式的域名才是一级域名。`iisp`是域名主体，`.com`是域名后缀。

## 二、document.domain和iframe实现跨域

* 要求：只能是“同一 **一级域名**”下的页面才能通过`document.domain`以及`iframe`实现跨域，否则不可行。
* 实战：
    * `p2p.wrox.com`下的`test.html`先通过`iframe`引入`http://wrox.com/a.html`，同时 `document.domain` 设置成 `wrox.com`，当 `iframe` 加载完毕后就可以获取 `huhu.com` 域下的全局对象，
    * `wrox.com`下的`a.html`需要也将`document.domain` 设置成 `wrox.com`
    * 最终获取`p2p.wrox.com`下的`test.html`成功获取`wrox.com`下的`test.json`的数据

* **`p2p.wrox.com/test.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>html</title>
</head>
<body>
    <div>test.html</div>
    <iframe style = "display : none" name = "iframe1" id = "iframe" src="http://wrox.com/a.html" frameborder="0"></iframe>
    <script type="text/javascript">
        (function() {
            try{
              document.domain = "wrox.com"
          }catch(e){}
          
          var xhr = new XMLHttpRequest();
          
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                //...
            } else {
              console.log(xhr.status, xhr.statusText);
            }
           }
      
          xhr.open('get', 'http://wrox.com/test.json');
          xhr.send(null);
        })();
      
    </script>
</body>
</html>
```

* **`wrox.com/a.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>html</title>
    <script type="text/javascript">
        (function() {
           try{
               document.domain = "huhu.com"
            }catch(e){}
        }()
    </script>
</head>
<body>
    <div id = "div1">a页面</div>
</body>
</html>
```
---
layout: post
title: "javasript - 数据存储"
data: 2017-09-04 20:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

其他链接：

+ [javasript - 数据存储--cookie]({{ '/2017/08/29/js-Storage-Cookie' | prepend: site.baseurl }})
+ [javasript - 数据存储--Web存储机制]({{ '/2017/08/29/js-Storage-Web' | prepend: site.baseurl }})

<!-- more -->

## 一、`cookie`、`localStorage`、`sessionStorage`和`globalStorage`的总结
1. **数据的生命期不同**
    * `cookie`：可设置失效时间，默认是关闭浏览器后失效。
    
    * `localStorage`：存储的数据是永久性的，除非被手动清除。
        * `localStorage`受浏览器供应商限制，如果使用`chrome`访问一个网站，下次用`firefox`再次访问是获取不到上次存储的数据的。
        
    * `sessionStorage`：有效期仅存在于浏览器的标签页，关闭页面或浏览器后被清除【存储在 `sessionStorage` 中的数据可以跨越页面刷新或恢复而存在】
    
    * `globalStorage`：存储的数据是永久性的，除非被手动清除。
2. **存储的数据大小不同**
    * `cookie`：4K左右
    
    * `localStorage`：一般为5MB
        
    * `sessionStorage`：一般为5MB
    
    * `globalStorage`：
3. **作用域不同**
    * `cookie`： 作用域限定在文档源级别
    
    * `localStorage`：作用域限定在文档源级别（只要URL的协议、端口、主机名三者中有一个不同，就属于不同的文档源）。
    
    * `sessionStorage`：作用域不仅被限制在文档源，还被限定在窗口中，也就是同一标签页中。
        * 注意，这里说的窗口是指**顶级窗口**，若果同一标签页中包含多个`<iframe>`元素，这两者之间也是可以共享`sessionStorage`的。
    
    * `globalStorage`：
4. **与服务器端通信不同**
    * `cookie`：每次都会携带在`HTTP`头中，如果使用cookie保存过多数据会带来性能问题
    
    * `localStorage`：仅在客户端（即浏览器）中保存，不参与和服务器的通信
        
    * `sessionStorage`：仅在客户端（即浏览器）中保存，不参与和服务器的通信
    
    * `globalStorage`：
5. **是否是Storage的实例**
    * `cookie`：否
    
    * `localStorage`：是
        
    * `sessionStorage`：是
    
    * `globalStorage`：`globalStorage` 对象不是 `Storage` 的实例，而具体的 `globalStorage["wrox.com"]`才是。
7. **删除数据的方法**
    * `cookie`：手动设置失效时间
    
    * `localStorage`：使用 `removeItem()`删除
        
    * `sessionStorage`：使用 `delete` 操作符删除对象属性 或者 调用`removeItem()`方法
    
    * `globalStorage`：使用 `removeItem()` 或者 `delete` 删除，或者用户清除浏览器缓存
8. **是否能跨域存储数据**
    * `cookie`：不能
    
    * `localStorage`：能
        
    * `sessionStorage`：不能
    
    * `globalStorage`：能
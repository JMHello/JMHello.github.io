---
layout: post
title: "javascript - 本地存储 -- cookie - 上篇"
data: 2017-10-25 17:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

* 其他链接：
    + [javasript - 数据存储--Web存储机制]({{ '/2017/09/04/js-Storage-Web' | prepend: site.baseurl }})
    + [javascript - 本地存储 -- cookie - 中篇]({{ '/2017/10/25/js-Storage-Cookie2' | prepend: site.baseurl }})
    + [javascript - 本地存储 -- cookie - 下篇]({{ '/2017/10/26/js-Storage-Cookie3' | prepend: site.baseurl }})

> * 以下内容部分源于：
>   * 《JavaScript高级程序设计（第3版）》
>   * [Cookie的Domain值的起始是否包含点的问题 + cookie的Domain和Host的关系 + Cookie的Domain的作用域/有效范围](https://www.crifan.com/cookie_domain_value_start_contain_dot_or_not_cookie_domain_effect_scope/)
  

<!-- more -->

## 一、cookie 是什么

> * `HTTP Cookie`：最本质的行为就是 **本地存储**， 让用户的一些数据被记录到本地，以便用户下次访问的时候，可以拿到对应的数据。

## 二、cookie的构成

### 2.1 name && value

> * 基本构成：`name = value`

> * **名称（`name`）**：
>   * 一个唯一确定 `cookie` 的名称。
>   * `cookie` 名称是 **不区分大小写**的：所以 `myCookie` 和 `MyCookie`被认为是同一个 `cookie`。【实践中最好最好将 `cookie` 名称看作是区分大小写】
>   * `cookie` 的名称必须是经过 `URL` 编码的。====》 `decodeURIComponent(name)`

> * **值（`value`）**：
>    * 储存在 `cookie` 中的字符串值。
>    * 值必须被 `URL` 编码。====》 `decodeURIComponent(value)`
    
### 2.2 domain

> * **域（`domain`）**：
>    * 说明 `cookie` 对于哪个域是有效的。
>    * 所有向该域发送的请求中都会包含这个 `cookie` 信息。
>    * 如果没有明确设定，那么这个域会被认作来自设置 `cookie` 的那个域。

---

> * 实例：这是在 `ke.qq.com` 上实践的。

> * 1.操作过程

![relationship-map]({{ '/effects/images/javascript/cookie/cookie-03.gif' | prepend: site.baseurl }})

> * 2.代码

![relationship-map]({{ '/styles/images/javascript/cookie/cookie-06.png' | prepend: site.baseurl }})

> * 补充，上述代码还缺少了以下这种情况

![relationship-map]({{ '/styles/images/javascript/cookie/cookie-08.png' | prepend: site.baseurl }})

> * 3.`cookie`展示

![relationship-map]({{ '/styles/images/javascript/cookie/cookie-07.png' | prepend: site.baseurl }})

---

> * 分析：
>   1. 在没有设置 `domain` 的情况下，`name1` 的 `domain` 默认为 `ke.qq.com`。
>   2. `name2` 的 `domain` 设置了 `ke.qq.com` ，但是，其 `cookie` 中 `domain` 的值却是 `.ke.qq.com`，即最前面多了一个点号。
>   3. `name3` 的 `domain` 设置了 `.qq.com`（**有点**），`name4` 的 `domain` 设置了 `qq.com`（**没点**），但是它们 `cookie` 中 `domain` 的值却都是 **`.qq.com`**。
>   4. `name5` 只是单纯的根域名，无效。
>   5. `name6` ，由于 `cookie` 无法跨域的限制，也是无效的。
>   6. `name7` ，由于 `domain` 值超过了当前域的层级，无效。

---

> * 总结
>   1. 如果没有明确指定哪个域，默认情况下，这个域会被认作来自设置 `cookie` 的那个域，就像 `name1` 。
>   2. 在当前域的层级范围内，然后至少是二级域名相同的情况下，才可以设置其`domain`值。
>       * 例如：`ke.qq.com` 有三层，设置 `ke.qq.com` 或者 `qq.com` 都可以。 就像 `name2`、`name3`、`name4`。
>   3. `.qq.com` 和 `qq.com` 的效果是一样的，不过`HTTP`规定，`.qq.com`是标准的格式！


### 2.3 path

> * **路径（`path`）**：
>    * 对于指定域中的那个路径，应该向服务器发送 `cookie`。
>        * 例如，你可以指定 `cookie` 只有从`http://www.wrox.com/books/ `中才能访问，那么 `http://www.wrox.com` 的页面就不会发送 `cookie` 信息，即使请求都是来自同一个域的。
> * `path` 一般为 `/` - 表示根目录

---

> * 先看下述代码，这个是 `eg2.html` 【点击打开[demo](/effects/demo/demo-cookie/eg2.html)】

```js
// 没有设置 path 属性
document.cookie = `${decodeURIComponent('name1')}=${decodeURIComponent('jm1')};`;

// 设置了 path 属性
document.cookie = `${decodeURIComponent('name2')}=${decodeURIComponent('jm2')}; path=/`;
document.cookie = `${decodeURIComponent('name3')}=${decodeURIComponent('jm3')}; path=/Hello`;
document.cookie = `${decodeURIComponent('name4')}=${decodeURIComponent('jm4')}; path=/JMHello.github.io`;
```

> * 结果如下图所示：

![relationship-map]({{ '/styles/images/javascript/cookie/cookie-02.png' | prepend: site.baseurl }})

> * 从上图可以发现：
>   * 没有设置 `path` 属性的 `name1`，其 `path` 值为：`/JMHello.github.io/effects/demo/demo-cookie`，其实这个就是 `eg2.html`文件所在的路径；
>   * 设置了 `path` 属性的 `name2` 的值为 `/`，`name4` 的值为 `/JMHello.github.io`。而 `name3` 的 `cookie` 根本不存在。

----

![relationship-map]({{ '/styles/images/javascript/cookie/cookie-03.png' | prepend: site.baseurl }})

> * `eg3.html`(什么内容都没有) 与 `eg2.html` 在同一个文件夹内，打开 `eg3.html` 你会发现：`eg2.html`所设置的`cookie` 在 `eg3.html` 里都可以访问到！！
> * 点击打开[demo](/effects/demo/demo-cookie/eg3.html)

![relationship-map]({{ '/styles/images/javascript/cookie/cookie-04.png' | prepend: site.baseurl }})

---

> * 我再随便找了一个文件是不在 `demo-cookie` 这个文件夹里的，然后你会发现：

![relationship-map]({{ '/styles/images/javascript/cookie/cookie-05.png' | prepend: site.baseurl }})

---

> * 总结
>   1. 当不设置 `path` 属性的时候，其默认值为 **当前文件的路径**。
>   2. 当设置了 `path` 属性的时候，如果设置的值不是根目录下所拥有的路径，例如：`name3`的`/hello`，这个路径根本不存在，所以其 `cookie` 值也是不会设置成功的。相反，如果路径存在，那么设置`cookie`值就会成功。
>   3. 我们可以这样理解：`/` 比 `/JMHello.github.io` 的级别要浅，`/JMHello.github.io` 的级别又比 `/JMHello.github.io/effects/demo/demo-cookie` 浅，因此，只要在级别低的地方设置了`cookie`，
>       那么在级别高的地方也就能共享级别低所设置的 `cookie`，因此 `eg3.html` 可以共享 `name1`、`name2`、`name4` 的 `cookie`，以及 那个不知名的文件能访问 `name2`、`name4` 的 `cookie`。

### 2.4 expires && max-age

> * **失效时间**：
>    * 表示 `cookie` 何时应该被删除的时间戳（即：何时应该停止向服务器发送这个`cookie`） 
>        * `Expires=2018-09-05T12:32:07.203Z` - 过期时间 - 绝对时间。
>        * `Max-Age=36000` - 距离过期的秒数 - 相对时间 - 存在兼容性问题。
>    * `session cookie` - 临时 `cookie`：浏览器会话结束时（浏览器关闭）就会将所有 `cookie` 删除。
>    * `permanent cookie` - 持久 `cookie`：上述两个标识设置了一定的过期时间。

### 2.5 secure

> * **安全标志（`secure`）**：
>    * 指定后，`cookie` 只有在使用 `SSL` 连接的时候才发送到服务器，即：只有在 `https`下才发送。
>        * 例如，`cookie` 信息只能发送给 `https://www.wrox.com，而 http://www.wrox.com` 的请求则不能发送 `cookie`。
>    * 每一段信息都作为 `Set-Cookie` 头的一部分，使用分号加空格分隔每一段，如下例所示。

### 2.6 httpOnly

> * **`httpOnly`**：
>   * 不能通过 `js` 的 `document.cookie` 访问，这个属性只能通过后台设置。
    
### 2.7 cookie属性展示图

![relationship-map]({{ '/styles/images/javascript/cookie/cookie-01.png' | prepend: site.baseurl }})

## 三、小实例 - 腾讯课堂的首页的选项卡切换

![relationship-map]({{ '/effects/images/javascript/cookie/cookie-01.gif' | prepend: site.baseurl }})

---

> * 可以看到，一开始我先把 `index-new-key` 删除，其实它是保存你是选择“前端”还是“兴趣职场”的选项卡，当你关闭页面后，再次打开腾讯课堂首页，
> 如果`index-new-key` 为 `{"index_interest_cate_id":2004}` 则是“前端”的选项卡；如果`index-new-key` 为 `{"index_interest_cate_id":999}` 则是“兴趣职场”的选项卡。
    

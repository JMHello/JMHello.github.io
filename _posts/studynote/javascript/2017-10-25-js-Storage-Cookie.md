---
layout: post
title: "javasript - 数据存储--cookie"
data: 2017-10-25 17:27:00 +0800
categories: 学习笔记
tag: javascript
---
* content
{:toc}

其他链接：

+ [javasript - 数据存储--Web存储机制]({{ '/2017/09/04/js-Storage-Web' | prepend: site.baseurl }})

> 以下内容全部源于： 《JavaScript高级程序设计（第3版）》

<!-- more -->

## 一、cookie 是什么

> * `HTTP Cookie`：最本质的行为就是 **本地存储**， 让用户的一些数据被记录到本地，以便用户下次访问的时候，可以拿到对应的数据。

## 二、cookie的限制

1. **`cookie` 在性质上是绑定在特定的域名下的**。
    * 当设定了一个 `cookie` 后，再给创建它的域名发送请求时，都会包含这个 `cookie`。
    * 这个限制确保了储存在 `cookie` 中的信息只能让批准的接受者访问，而无法被其他域访问。
2. **每个域的 `cookie` 总数是有限的，不过浏览器之间各有不同**。
    *  `IE6` 以及更低版本限制每个域名最多 `20` 个 `cookie`。
    *  `IE7` 和之后版本每个域名最多 `50` 个。`IE7` 最初是支持每个域名最大 `20` 个 `cookie`，之后被微软的一个补丁所更新。
    *  `Firefox` 限制每个域最多 `50` 个 `cookie`。
    *  `Opera` 限制每个域最多 `30` 个 `cookie`。
    *  `Safari` 和 Chrome 对于每个域的 `cookie` 数量限制没有硬性规定。
3. **浏览器中对于 `cookie` 的尺寸也有限制**。
    * 大多数浏览器都有大约 `4096B`（加减 1）的长度限制。
    * 为了最佳的浏览器兼容性，最好将整个 `cookie` 长度限制在 `4095B`（含 `4095`）以内。
    * 尺寸限制影响到一个域下所有的 `cookie`，而并非每个 `cookie` 单独限制。
    
> 当超过单个域名限制之后还要再设置 `cookie`，浏览器就会清除以前设置的 `cookie`。  
  `IE` 和 `Opera` 会删除最近最少使用过的（`LRU，Least Recently Used`）`cookie`，腾出空间给新设置的 `cookie`。  
  `Firefox` 看上去好像是随机决定要清除哪个 `cookie`，所以考虑 `cookie` 限制非常重要，以免出现不可预期的后果。  
  如果你尝试创建超过最大尺寸限制的 `cookie`，那么该 `cookie` 会被悄无声息地丢掉。注意，虽然一个字符通常占用一字节，但是多字节情况则有不同。 

## 三、cookie的构成

### 3.1 cookie的构成

> * 基本构成：`name = value`

> * **名称（`name`）**：
>   * 一个唯一确定 `cookie` 的名称。
>   * `cookie` 名称是 **不区分大小写**的：所以 `myCookie` 和 `MyCookie`被认为是同一个 `cookie`。【实践中最好最好将 `cookie` 名称看作是区分大小写】
>   * `cookie` 的名称必须是经过 `URL` 编码的。====》 `decodeURIComponent(name)`

> * **值（`value`）**：
>    * 储存在 `cookie` 中的字符串值。
>    * 值必须被 `URL` 编码。====》 `decodeURIComponent(value)`
    
> * **域（`domain`）**：
>    * 说明 `cookie` 对于哪个域是有效的。
>    * 所有向该域发送的请求中都会包含这个 `cookie` 信息。
>    * 如果没有明确设定，那么这个域会被认作来自设置 `cookie` 的那个域。
> * 提示：假设当前页面为`ke.qq.com`，那么你的 `domain`就可以设置成 `ke.qq.com` 或 `qq.com`，不能设置成其他域，如：`www.baidu.com`

> * **路径（`path`）**：
>    * 对于指定域中的那个路径，应该向服务器发送 `cookie`。
>        * 例如，你可以指定 `cookie` 只有从`http://www.wrox.com/books/ `中才能访问，那么 `http://www.wrox.com` 的页面就不会发送 `cookie` 信息，即使请求都是来自同一个域的。
> * `path` 一般为 `/` - 表示根目录

> * **失效时间**：
>    * 表示 `cookie` 何时应该被删除的时间戳（即：何时应该停止向服务器发送这个`cookie`）
>        * `Expires=2018-09-05T12:32:07.203Z` - 过期时间 - 绝对时间。
>        * `Max-Age=36000` - 距离过期的秒数 - 相对时间 - 存在兼容性问题。
>    * `session cookie` - 临时 `cookie`：浏览器会话结束时（浏览器关闭）就会将所有 `cookie` 删除。
>    * `permanent cookie` - 持久 `cookie`：上述两个标识设置了一定的过期时间。


> * **安全标志（`secure`）**：
>    * 指定后，`cookie` 只有在使用 `SSL` 连接的时候才发送到服务器，即：只有在 `https`下才发送。
>        * 例如，`cookie` 信息只能发送给 `https://www.wrox.com，而 http://www.wrox.com` 的请求则不能发送 `cookie`。
>    * 每一段信息都作为 `Set-Cookie` 头的一部分，使用分号加空格分隔每一段，如下例所示。

> * **`httpOnly`**：
>   * 不能通过 `js` 的 `document.cookie` 访问，这个属性只能通过后台设置。
    

![relationship-map]({{ '/styles/images/javascript/cookie/cookie-01.png' | prepend: site.baseurl }})

### 3.2 小实例 - 腾讯课堂的首页的选项卡切换

![relationship-map]({{ '/effects/images/javascript/cookie/cookie-01.gif' | prepend: site.baseurl }})

> * 可以看到，一开始我先把 `index-new-key` 删除，其实它是保存你是选择“前端”还是“兴趣职场”的选项卡，当你关闭页面后，再次打开腾讯课堂首页，
> 如果`index-new-key` 为 `{"index_interest_cate_id":2004}` 则是“前端”的选项卡；如果`index-new-key` 为 `{"index_interest_cate_id":999}` 则是“兴趣职场”的选项卡。
    


## 四、操作 cookie

###  4.1 BOM的document. cookie属性

> * 这个属性的独特之处在于它会因为使用它的方式不同而表现出不同的行为。
>   * 当用来获取属性值时，`document.cookie` 返回当前页面可用的（根据 `cookie` 的域、路径、失效时间和安全设置）所有 `cookie`的字符串，一系列由分号隔开的名值对儿。

```js
name1=value1;name2=value2;name3=value3 
```


### 4.2 cookie值设置的介绍

> * 所有名字和值都是经过 **`URL`** 编码的，即使用 **`encodeURIComponent()`** 编码，使用 **`decodeURIComponent()`** 来解码。

> * 当用于设置值的时候，`document.cookie` 属性可以设置为一个新的 `cookie` 字符串。
>    * 这个 `cookie` 字符串会被解释并添加到现有的 `cookie` 集合中。
>    * 设置 `document.cookie` 并不会覆盖 `cookie`，除非设置的 `cookie` 的名称已经存在。
>    * 设置 `cookie` 的格式如下，和 `Set-Cookie` 头中使用的格式一样。【以下参数中只有 `cookie` 的名字和值是必需的】

```js
name=value; expires=expiration_time; path=domain_path; domain=domain_name; secure 

document.cookie = encodeURIComponent("name") + "=" +encodeURIComponent("Nicholas"); 

// 给被创建的 cookie 指定额外的信息，只要将参数追加到该字符串
document.cookie = encodeURIComponent("name") + "=" +encodeURIComponent("Nicholas") + "; domain=.wrox.com; path=/"; 
````

### 4.3 完整的cookie读取、写入和删除

```js
 const Cookies = {
  // 设置cookie
  setCookie: function (name, value, opts) {
    let str = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (Object.prototype.toString.call(opts) === '[object Object]') {
      const options = Object.entries(opts);

      for (let [key, value] of options) {
        str += (key !== 'secure' ? `; ${key}=${value}`: str += `; ${key}`);
      }
    }

    // console.log(str);
    document.cookie = str;
  },
  // 获取 cookie
  getCookie: function (name) {
    if (name && typeof name === 'string') {
      const reg = new RegExp(name + '=(.+?(?=\;|$))')
      const result = document.cookie.match(reg);
      return (result? result[1]: null);
    } else {
      return document.cookie;
    }
  },
  // 删除cookie
  removeCookie: function (name) {
      this.setCookie(name, '', {
        expires: new Date(0).toGMTString()
      })
  }
}
```

> * 实例 【点击打开[demo](/effects/demo/demo-cookie/eg1.html)】

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>cookie添加、读取、删除</title>
</head>
<body>
<button type="button" id="set"> 设置 cookie</button>
<button type="button" id="get"> 获取 cookie</button>
<button type="button" id="del"> 删除 cookie</button>
<script>
    // 设置cookie
    document.getElementById('set').onclick = function () {
      Cookies.setCookie('name', 'jm', {
        expires: new Date('2017-12-20').toGMTString()
      });
      Cookies.setCookie('age', 18, {
        path: '/'
      });
    }

    // 获取cookie
    document.getElementById('get').onclick = function () {
      console.log('name：' + Cookies.getCookie('name'));
      console.log('age:' + Cookies.getCookie('age'));
      console.log('sex：' + Cookies.getCookie('sex'));
      console.log('document.cookie=' + Cookies.getCookie());
    }

    // 删除cookie 
    document.getElementById('del').onclick = function () {
      Cookies.removeCookie('name');
      console.log('document.cookie=' + Cookies.getCookie() + '. 没有了name');
    }
</script>
</body>
</html>
```

> * 效果

![relationship-map]({{ '/effects/images/javascript/cookie/cookie-02.gif' | prepend: site.baseurl }})
      
## 五、子cookie    

### 5.1  什么是子cookie

* 为了绕开浏览器的单域名下的 `cookie` 数限制，一些开发人员使用了一种称为子 `cookie`（`subcookie`）的概念。
* **子 `cookie` 是存放在单个 `cookie` 中的更小段的数据**。也就是使用 `cookie` 值来存储多个名称值对儿。
* 子 `cookie` 最常见的的格式如下所示。

    ```
    name=name1=value1&name2=value2&name3=value3&name4=value4&name5=value5 
    ```

* **子 `cookie` 一般也以查询字符串的格式进行格式化**。
    * 然后这些值可以使用单个 `cookie` 进行存储和访问，而非对每个名称`-`值对儿使用不同的 `cookie` 存储。
    * 最后网站或者 `Web` 应用程序可以无需达到单域名`cookie` 上限也可以存储更加结构化的数据。

### 5.2 操作子cookie
  
* 子 `cookie` 的解析和序列化会因子 `cookie` 的期望用途而略有不同并更加复杂些。
    * 例如，要获得一个子 `cookie`，首先要遵循与获得 `cookie` 一样的基本步骤，但是在解码 `cookie` 值之前，需要按如下方法找出子 `cookie` 的信息。

```js
var SubCookieUtil = {
    // 获取单个子 cookie 的值
    // get()方法接收两个参数：cookie 的名字和子 cookie 的名字
    // 其实就是调用 getAll()获取所有的子 cookie，然后只返回所需的那一个（如果 cookie 不存在则返回 null）。
    get: function (name, subName){
        var subCookies = this.getAll(name);
        
        if (subCookies){
            return subCookies[subName];
        } else {
            return null;
        }
    },
    // 获取所有子 cookie 并将它们放入一个对象中返回，对象的属性为子 cookie 的名称，对应值为子 cookie对应的值
    getAll: function(name){
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null,
            cookieEnd,
            subCookies,
            i,
            parts,
            result = {};
            
        if (cookieStart > -1){
            cookieEnd = document.cookie.indexOf(";", cookieStart);
            
            if (cookieEnd == -1){
                cookieEnd = document.cookie.length;
            }
            
            cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);
            
            if (cookieValue.length > 0){
                subCookies = cookieValue.split("&");
                
                for (i=0, len=subCookies.length; i < len; i++){
                    parts = subCookies[i].split("=");
                    result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                }
                
                return result;
            }
        }
        
        return null;
    },
   set: function (name, subName, value, expires, path, domain, secure) {
        var subcookies = this.getAll(name) || {}; subcookies[subName] = value;
        this.setAll(name, subcookies, expires, path, domain, secure);
   },
   setAll: function(name, subcookies, expires, path, domain, secure){
        var cookieText = encodeURIComponent(name) + "=",
            subcookieParts = new Array(),
            subName;
            
        for (subName in subcookies){
            if (subName.length > 0 && subcookies.hasOwnProperty(subName)){
            subcookieParts.push(encodeURIComponent(subName) + "=" + encodeURIComponent(subcookies[subName]));
            }
        }
        
        if (cookieParts.length > 0){
            cookieText += subcookieParts.join("&");
            
            if (expires instanceof Date) {
                cookieText += "; expires=" + expires.toGMTString();
            }
            
            if (path) {
                cookieText += "; path=" + path;
            }
            
            if (domain) {
                cookieText += "; domain=" + domain;
            }
            
            if (secure) {
                cookieText += "; secure";
            }
        } else {
            cookieText += "; expires=" + (new Date(0)).toGMTString();
        }
        
        document.cookie = cookieText;
   },
   // 删除某个 cookie 中的单个子 cookie而不影响其他的
   unset: function (name, subName, path, domain, secure){
        var subcookies = this.getAll(name);
        
        if (subcookies){
            delete subcookies[subName];
            this.setAll(name, subcookies, null, path, domain, secure);
        }
   },
   // 用于删除整个 cookie
    unsetAll: function(name, path, domain, secure){
        this.setAll(name, null, new Date(0), path, domain, secure);
   }
}; 

//假设 document.cookie=data=name=Nicholas&book=Professional%20JavaScript
//设置两个 cookie
SubCookieUtil.set("data", "name", "Nicholas");
SubCookieUtil.set("data", "book", "Professional JavaScript");
//设置全部子 cookie 和失效日期
SubCookieUtil.setAll("data", { name: "Nicholas", book: "Professional JavaScript" },
 new Date("January 1, 2010"));
//修改名字的值，并修改 cookie 的失效日期
SubCookieUtil.set("data", "name", "Michael", new Date("February 1, 2010"));
 
 //仅删除名为 name 的子 cookie
 SubCookieUtil.unset("data", "name");
 //删除整个 cookie
 SubCookieUtil.unsetAll("data"); 
```

* `getAll()`方法：
    * `SubCookieUtil.getAll()`方法和 `CookieUtil.get()`在解析 `cookie` 值的方式上非常相似。
        * 区别在于 `cookie` 的值并非立即解码，而是先根据`&`字符将子 `cookie` 分割出来放在一个数组中，每一个子 `cookie`
          再根据等于号分割，这样在 parts 数组中的前一部分便是子 `cookie` 名，后一部分则是子 `cookie` 的值。
        * 这两个项目都要使用 `decodeURIComponent()`来解码，然后放入 `result` 对象中，最后作为方法的返回值。
        * 如果 `cookie` 不存在，则返回 `null`。
  
* `set()`方法：
    * 接收 7 个参数：
         * `cookie` 名称
         * 子 `cookie` 名称
         * 子 `cookie` 值
         * （可选）`cookie` 失效日期或时间的 Date 对象
         * （可选） `cookie` 路径
         * （可选）`cookie` 域和
         * （可选）布尔 `secure` 标志
  * 所有的可选参数都是作用于`cookie`本身而非子`cookie`。
  * 为了在同一个`cookie`中存储多个子`cookie`，路径、域和`secure`标志必须一致；针对整个 `cookie` 的失效日期则可以在任何一个单独的子 cookie 写入的时候同时设置。
  * 在这个方法中，第一步是获取指定 `cookie` 名称对应的所有子 `cookie`。逻辑或操作符“`||`”用于当 `getAll()`

* `setAll()`方法：
    * 接收 6 个参数：
        * cookie 名称
        * 包含所有子 cookie 的对象
        * （可选）`cookie` 失效日期或时间的 Date 对象
        * （可选） `cookie` 路径
        * （可选）`cookie` 域和
        * （可选）布尔 `secure` 标志
    * 这个方法使用 `for-in` 循环遍历第二个参数中的属性。
    * 为了确保确实是要保存的数据，使用了 `hasOwnProperty()`方法，来确保只有实例属性被序列化到子 `cookie` 中。
    * 由于可能会存在属性名为空字符串的情况，所以在把属性名加入结果对象之前还要检查一下属性名的长度。
    * 将每个子 `cookie`的名值对儿都存入 `subcookieParts` 数组中，以便稍后可以使用 `join()`方法以`&`号组合起来。
    * 剩下的方法则和 `CookieUtil.set()`一样。
    
* 普通 `cookie` 可以通过将失效时间设置为过去的时间的方法来删除，但是子 `cookie` 不能这样做。  
  为了删除一个子 `cookie`，首先必须获取包含在某个 `cookie`中的所有子 `cookie`，然后仅删除需要删除的那个子 `cookie`，然后再将余下的子 `cookie` 的值保存为 `cookie`的值。

## 六、 关于 cookie 的思考 

* 还有一类 `cookie` 被称为“`HTTP 专有 cookie`”。`HTTP` 专有 `cookie` 可以从浏览器或者服务器设置，但
是只能从服务器端读取，因为 JavaScript 无法获取 `HTTP` 专有 `cookie` 的值。

* 由于所有的 `cookie` 都会由浏览器作为请求头发送，所以在 `cookie` 中存储大量信息会影响到特定域的请求性能。
    * `cookie` 信息越大，完成对服务器请求的时间也就越长。
    * 尽管浏览器对 `cookie` 进行了大小限制，不过最好还是尽可能在 `cookie` 中少存储信息，以避免影响性能。

* `cookie` 的性质和它的局限使得其并不能作为存储大量信息的理想手段，所以又出现了其他方法。

* 一定不要在 `cookie` 中存储重要和敏感的数据。
    * `cookie` 数据并非存储在一个安全环境中，其中包含的任何数据都可以被他人访问。
    * 所以不要在 `cookie` 中存储诸如信用卡号或者个人地址之类的数据。
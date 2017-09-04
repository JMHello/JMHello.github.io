---
layout: post
title: "javasript - 数据存储--cookie"
data: 2017-08-29 17:27:00 +0800
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

`HTTP Cookie`，通常直接叫做 `cookie`，最初是在客户端用于存储会话信息的。该标准要求服务器对任意 `HTTP` 请求发送 `Set-Cookie HTTP` 头作为响应的一部分，其中包含会话信息。

*  例如，这种服务器响应的头可能如下：

```
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value
Other-header: other-header-value  
```

这个 `HTTP` 响应设置以 `name` 为名称、以 `value` 为值的一个 `cookie`，名称和值在传送时都必须是`URL` 编码的。

* 浏览器会存储这样的会话信息，并在这之后，通过为每个请求添加 `Cookie HTTP` 头将信息发送回服务器，如下所示：

```
GET /index.html HTTP/1.1
Cookie: name=value
Other-header: other-header-value 
```


* 发送回服务器的额外信息可以用于唯一验证客户来自于发送的哪个请求。

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

1. 名称：

    * 一个唯一确定 `cookie` 的名称。
    * `cookie` 名称是不区分大小写的，所以 `myCookie` 和 `MyCookie`被认为是同一个 `cookie`。
        * 实践中最好将 `cookie` 名称看作是区分大小写的，因为某些服务器会这样处理 `cookie`。
    * `cookie` 的名称必须是经过 `URL` 编码的。

2. 值：

    * 储存在 `cookie` 中的字符串值。
    * 值必须被 `URL` 编码。
    
3. 域：

    * `cookie` 对于哪个域是有效的。
    * 所有向该域发送的请求中都会包含这个 `cookie` 信息。
    * 这个值可以包含子域（`subdomain`，如`www.wrox.com`），也可以不包含它（如.`wrox.com`，则对于`wrox.com`的所有子域都有效）。
    * 如果没有明确设定，那么这个域会被认作来自设置 cookie 的那个域。

4. 路径：

    * 对于指定域中的那个路径，应该向服务器发送 `cookie`。
        * 例如，你可以指定 `cookie` 只有从`http://www.wrox.com/books/ `中才能访问，那么 `http://www.wrox.com` 的页面就不会发送 `cookie` 信息，即使请求都是来自同一个域的。

5. 失效时间：

    * 表示 `cookie` 何时应该被删除的时间戳（也就是，何时应该停止向服务器发送这个`cookie`）。
    * 默认情况下，浏览器会话结束时即将所有 `cookie` 删除；不过也可以自己设置删除时间。
    * 这个值是个 `GMT` 格式的日期（`Wdy, DD-Mon-YYYY HH:MM:SS GMT`），用于指定应该删除`cookie` 的准确时间。
        * 因此，`cookie` 可在浏览器关闭后依然保存在用户的机器上。
        * 如果你设置的失效日期是个以前的时间，则 `cookie` 会被立刻删除。

6. 安全标志：

    * 指定后，`cookie` 只有在使用 `SSL` 连接的时候才发送到服务器。
        * 例如，`cookie` 信息只能发送给 `https://www.wrox.com，而 http://www.wrox.com` 的请求则不能发送 `cookie`。
    * 每一段信息都作为 `Set-Cookie` 头的一部分，使用分号加空格分隔每一段，如下例所示。
    
    ```
    HTTP/1.1 200 OK
    Content-type: text/html
    Set-Cookie: name=value; expires=Mon, 22-Jan-07 07:10:24 GMT; domain=.wrox.com
    Other-header: other-header-value 
    ```

> 该头信息指定了一个叫做 `name` 的 `cookie`，它会在格林威治时间 `2007 年 1 月 22 日 7:10:24` 失效，同
  时对于 `www.wrox.com` 和 `wrox.com` 的任何子域（如 `p2p.wrox.com`）都有效。
  
* `secure` 标志是 `cookie` 中唯一一个非名值对儿的部分，直接包含一个 `secure` 单词。如下： 
  
```
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value; domain=.wrox.com; path=/; secure
Other-header: other-header-value 
```

创建了一个对于所有 `wrox.com` 的子域和域名下（由 `path` 参数指定的）所有页面都有效的
`cookie`。因为设置了 `secure` 标志，这个 `cookie` 只能通过 `SSL` 连接才能传输。

> 注意：域、路径、失效时间和 `ecure` 标志都是服务器给浏览器的指示，以指定何时应该发
  送 `cookie`。**这些参数并不会作为发送到服务器的 `cookie` 信息的一部分，只有名值对儿才会被发送**。 
  
  
## 四、JavaScript 中的 cookie 

###  4.1 BOM的document. cookie属性

* 这个属性的独特之处在于它会因为使用它的方式不同而表现出不同的行为。
    * 当用来获取属性值时，`document.cookie` 返回当前页面可用的
    （根据 `cookie` 的域、路径、失效时间和安全设置）所有 `cookie`的字符串，一系列由分号隔开的名值对儿

    ```js
    name1=value1;name2=value2;name3=value3 
    ````


### 4.2 设置cookie值

* 所有名字和值都是经过 `URL` 编码的，即使用`encodeURIComponent()`编码，使用 `decodeURIComponent()`来解码。

* 当用于设置值的时候，`document.cookie` 属性可以设置为一个新的 `cookie` 字符串。
    * 这个 `cookie` 字符串会被解释并添加到现有的 `cookie` 集合中。
    * 设置 `document.cookie` 并不会覆盖 `cookie`，除非设置的cookie 的名称已经存在。
    * 设置 cookie 的格式如下，和 Set-Cookie 头中使用的格式一样。【以下参数中只有cookie 的名字和值是必需的】

```js
name=value; expires=expiration_time; path=domain_path; domain=domain_name; secure 

document.cookie = encodeURIComponent("name") + "=" +encodeURIComponent("Nicholas"); 

// 给被创建的 cookie 指定额外的信息，只要将参数追加到该字符串
document.cookie = encodeURIComponent("name") + "=" +encodeURIComponent("Nicholas") + "; domain=.wrox.com; path=/"; 
````

### 4.3 完整的cookie读取、写入和删除

```js
var CookieUtil = {
    // 读取cookie
    get: function (name){
         var cookieName = encodeURIComponent(name) + "=",
             cookieStart = document.cookie.indexOf(cookieName),
             cookieValue = null;
            
         if (cookieStart > -1){
             var cookieEnd = document.cookie.indexOf(";", cookieStart);
             
             if (cookieEnd == -1){
             cookieEnd = document.cookie.length;
             }
             
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart+ cookieName.length, cookieEnd));
        }
        
        return cookieValue;
    },
    // 写入cookie
    set: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" +encodeURIComponent(value);
        
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
        
        document.cookie = cookieText;
    },
    // 删除cookie
    unset: function (name, path, domain, secure){
        this.set(name, "", new Date(0), path, domain, secure);
    }
}; 

//设置 cookie
CookieUtil.set("name", "Nicholas");
CookieUtil.set("book", "Professional JavaScript");

//读取 cookie 的值
alert(CookieUtil.get("name")); //"Nicholas"
alert(CookieUtil.get("book")); //"Professional JavaScript"

//删除 cookie
CookieUtil.unset("name");
CookieUtil.unset("book"); 

//设置 cookie，包括它的路径、域、失效日期
CookieUtil.set("name", "Nicholas", "/books/projs/", "www.wrox.com",
 new Date("January 1, 2010"));
 
//删除刚刚设置的 cookie
CookieUtil.unset("name", "/books/projs/", "www.wrox.com");

//设置安全的 cookie
CookieUtil.set("name", "Nicholas", null, null, null, true);
```

* `CookieUtil.get()`方法根据 `cookie` 的名字获取相应的值。
  * 它会在 `document.cookie` 字符串中查找 `cookie` 名加上等于号的位置。
  * 如果找到了，那么使用 `indexOf()`查找该位置之后的第一个分号（表示了该 `cookie` 的结束位置）。
  * 如果没有找到分号，则表示该 `cookie` 是字符串中的最后一个，则余下的字符串都是 `cookie` 的值。
  * 该值使用 `decodeURIComponent()`进行解码并最后返回。
  * 如果没有发现 `cookie`，则返回 `null`。
  
* `CookieUtil.set()`方法在页面上设置一个 `cookie`。
    * 接收如下几个参数【参数是按照它们的使用频率排列的，只有头两个是必需的】：
        * `cookie` 的名称
        * `cookie` 的值
        * （可选）用于指定 `cookie` 何时应被删除的 Date 对象
        * （可选）`cookie` 的 `URL` 路径
        * （可选）域
        * （可选）表示是否要添加 `secure` 标志的布尔值。
  * 这个方法中，名称和值都使用`encodeURIComponent()`进行了`URL`编码，并检查其他选项。
  * 如果`expires`参数是 `Date` 对象，那么会使用 `Date` 对象的 `toGMTString()`方法正确格式化 `Date` 对象，并添加到`expires` 选项上。
  * 方法的其他部分就是构造 `cookie` 字符串并将其设置到 `document.cookie` 中。
  
* 没有删除已有 `cookie` 的直接方法。
    * 所以，需要使用相同的路径、域和安全选项再次设置 `cookie`，并将失效时间设置为过去的时间。
    * `CookieUtil.unset()`方法可以处理这种事情。
        * 它接收 4 个参数：要删除的 cookie 的名称、可选的路径参数、可选的域参数和可选的安全参数。
    * 这些参数加上空字符串并设置失效时间为 `1970 年 1 月 1 日`（初始化为 `0ms` 的 `Date` 对象的值），传
      给 `CookieUtil.set()`。这样就能确保删除 `cookie`。
      
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
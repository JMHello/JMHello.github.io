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

+ [ES6 - String扩展]({{ '/2017/08/26/ES6-String' | prepend: site.baseurl }})

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
   }
}; 
```


* `SubCookieUtil.getAll()`方法和 `CookieUtil.get()`在解析 `cookie` 值的方式上非常相似。
    * 区别在于 `cookie` 的值并非立即解码，而是先根据`&`字符将子 `cookie` 分割出来放在一个数组中，每一个子 `cookie`
      再根据等于号分割，这样在 parts 数组中的前一部分便是子 `cookie` 名，后一部分则是子 `cookie` 的值。
    * 这两个项目都要使用 `decodeURIComponent()`来解码，然后放入 `result` 对象中，最后作为方法的返
      回值。如果 `cookie` 不存在，则返回 `null`。
  
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

### 2.2  字符方法

#### 2.2.1 charAt()

接收一个参数，即基于 0 的字符位置。以单字符字符串的形式返回给定位置的那个字符。

```js
var stringValue = "hello world";
alert(stringValue.charAt(1)); //"e" 
```

#### 2.2.2 charCodeAt()

接收一个参数，即基于 0 的字符位置。返回给定位置的那个字符的字符编码。

```js
var stringValue = "hello world";
alert(stringValue.charCodeAt(1)); //输出"101" 
```

#### 2.2.3 方括号法

使用方括号加数字索引来访问字符串中的特定字符。

> IE8 及 Firefox、Safari、Chrome 和 Opera 所有版本的支持。如果是在 IE7 及更早版本中使用这种语法，会返回 undefined 值（尽管根本不是特殊的undefined 值）。

```js
var stringValue = "hello world";
alert(stringValue[1]); //"e" 
```

### 2.3 字符串操作方法

* 以下讲的字符串操作方法不会修改字符串本身的值——它们只是返回一个基本类型的字符串值，对原始字符串没有任何影响。

#### 2.3.1 concat()

concat()用于将一或多个字符串拼接起来，返回拼接得到的新字符串，且可以接受任意多个参数，即：可以通过它拼接任意多个字符串。

```js
var stringValue = "hello ";
var result = stringValue.concat("world", "!");
alert(result); //"hello world!"
alert(stringValue); //"hello" 
```

> 虽然 `concat()` 是专门用来拼接字符串的方法，但实践中使用更多的还是加号操作符`（+）`。而且，使用加号操作符在大多数情况下都比使用 `concat()` 方法要简便易行（特别是在拼接多个字符串的情况下）。

#### 2.3.2 slice(start,end)

* start： 指定子字串的开始位置

* end：（可选）表示子字符串到哪里结束。【指：子字符串最后一个字符后面的位置】

* 如果没有给这些方法传递第二个参数，则将字符串的长度作为结束位置。

```js
var stringValue = "hello world";

alert(stringValue.slice(3)); //"lo world" 

alert(stringValue.slice(3, 7)); //"lo w"
```

* 在传递的参数是负值的情况下，slice()方法会将传入的负值与字符串的长度相加。

```js
var stringValue = "hello world";
alert(stringValue.slice(-3)); //"rld"
alert(stringValue.slice(3, -4)); //"lo w" 
```

#### 2.3.3 substr(start,end)

* start： 指定子字串的开始位置

* end：（可选）表示子字符串到哪里结束。【指：返回的字符个数】

* 如果没有给这些方法传递第二个参数，则将字符串的长度作为结束位置。

```js
var stringValue = "hello world";
alert(stringValue.substr(3)); //"lo world"
alert(stringValue.substr(3, 7)); //"lo worl" 
```

* 在传递的参数是负值的情况下，substr()方法将负的第一个参数加上字符串的长度，而将负的第二个参数转换为 0。

```js
var stringValue = "hello world";
alert(stringValue.substr(-3)); //"rld"
alert(stringValue.substr(3, -4)); //""（空字符串）
```

#### 2.3.4 substring(start,end)

* start： 指定子字串的开始位置

* end：（可选）表示子字符串到哪里结束。【指：子字符串最后一个字符后面的位置】

* 如果没有给这些方法传递第二个参数，则将字符串的长度作为结束位置。

```js
var stringValue = "hello world";
alert(stringValue.substring(3)); //"lo world"
alert(stringValue.substring(3,7)); //"lo w"
```

* 在传递的参数是负值的情况下，substring()方法会把所有负值参数都转换为 0。

```js
var stringValue = "hello world";
alert(stringValue.substring(-3)); //"hello world"
alert(stringValue.substring(3, -4)); //"hel"
```

### 2.4  字符串位置方法

#### 2.4.1 indexOf(str,index)

* 从字符串的开头向后搜索子字符串，然后返子字符串的位置（如果没有找到该子字符串，则返回-1）。

* str：代表要搜索的字符串

* index：（可选）表示从字符串中的哪个位置开始搜索。

```js
var stringValue = "hello world";
alert(stringValue.indexOf("o")); //4 
alert(stringValue.indexOf("o", 6)); //7 
```

#### 2.4.2 lastndexOf(str,index)

* 从字符串的末尾向前搜索子字符串，然后返子字符串的位置（如果没有找到该子字符串，则返回-1）。

* str：代表要搜索的字符串

* index：（可选）表示从字符串中的哪个位置开始搜索。

```js
var stringValue = "hello world";
alert(stringValue.lastIndexOf("o")); //7 
alert(stringValue.lastIndexOf("o", 6)); //4 
```

#### 2.4.3 实例：找到所有匹配的子字符串

```js
var stringValue = "Lorem ipsum dolor sit amet, consectetur adipisicing elit";
var positions = new Array();
var pos = stringValue.indexOf("e");
while(pos > -1){
 positions.push(pos);
 pos = stringValue.indexOf("e", pos + 1);
}

alert(positions); //"3,24,32,35,52"
```

> 这个例子通过不断增加 indexOf()方法开始查找的位置，遍历了一个长字符串。在循环之外，首
  先找到了"e"在字符串中的初始位置；而进入循环后，则每次都给 indexOf()传递上一次的位置加 1。
  这样，就确保了每次新搜索都从上一次找到的子字符串的后面开始。每次搜索返回的位置依次被保存在
  数组 positions 中，以便将来使用。

### 2.5 trim()

trim()方法创建一个字符串的副本【所以原始字符串中的前置及后缀空格会保持不变】，删除前置及后缀的所有空格，然后返回结果。

```js
var stringValue = " hello world ";
var trimmedStringValue = stringValue.trim();
alert(stringValue); //" hello world "
alert(trimmedStringValue); //"hello world" 
```

> 支持有 IE9+、Firefox 3.5+、Safari 5+、Opera 10.5+和 Chrome。此外，Firefox 3.5+、Safari 5+
  和 Chrome 8+还支持非标准的 trimLeft()和 trimRight()方法，分别用于删除字符串开头和末尾的
  空格。

### 2.6 字符串大小写转换方法
* 借鉴自 java.lang.String 中的同名方法  
toLowerCase()  
toUpperCase()

* 针对特定地区的实现  
toLocaleLowerCase()  
toLocaleUpperCase()  

>对有些地区来说，针对地区的方法与其通用方法得到的结果相同，但少数语言（如土耳其语）会为 Unicode 大小写转换应用特殊的规则，这时候就必须使用针对地区的方法来保证实现正确的转换。  
>一般来说，在不知道自己的代码将在哪种语言环境中运行的情况下，还是使用针对地区的方法更稳妥一些。
  
```js
var stringValue = "hello world";
alert(stringValue.toLocaleUpperCase()); //"HELLO WORLD"
alert(stringValue.toUpperCase()); //"HELLO WORLD"
alert(stringValue.toLocaleLowerCase()); //"hello world"
alert(stringValue.toLowerCase()); //"hello world" 
```

### 2.7 字符串的模式匹配方法

#### 2.7.1 match()

`match()` 方法只接受一个参数，要么是一个正则表达式，要么是一个 `RegExp` 对象。会返回一个数组。

```js
var text = "cat, bat, sat, fat";
var pattern = /.at/;

//与 pattern.exec(text)相同
var matches = text.match(pattern);
alert(matches.index); //0
alert(matches[0]); //"cat"
alert(pattern.lastIndex); //0 
```

> 如果是调用 `RegExp` 对象的 `exec()` 方法并传递本例中的字符串作为参数，那么也会得到与此相同的数组：数组的第一项是与整个模式匹配的字符串，之后的每一项（如果有）保存着与正则表达式中的捕获组匹配的字符串。

#### 2.7.2 search()

* `search()` 方法只接受一个参数，要么是一个正则表达式，要么是一个 `RegExp` 对象。
* 返回字符串中第一个匹配项的索引；如果没有找到匹配项，则返回-1。
* search()方法始终是从字符串开头向后查找模式。

```js
var text = "cat, bat, sat, fat";
var pos = text.search(/at/);
alert(pos); //1 
```

#### 2.7.2 replace()

* `replace()` 方法用来替换子字符串。
* 第一个参数可以是一个 RegExp 对象或者一个字符串（这个字符串不会被转换成正则表达式），第二个参数可以是一个字符串或者一个函数。
* 如果第一个参数是字符串，那么只会替换第一个子字符串。要想替换所有子字符串，唯一的办法就是提供一个正则表达式，而且要指定全局（g）标志
```js
var text = "cat, bat, sat, fat";
var result = text.replace("at", "ond");
alert(result); //"cond, bat, sat, fat"

result = text.replace(/at/g, "ond");
alert(result); //"cond, bond, sond, fond" 
```

* 如果第二个参数是字符串，那么还可以使用一些特殊的字符序列，将正则表达式操作得到的值插入到结果字符串中。

![relationship-map]({{ '/styles/images/javascript/string/string-02.png' | prepend: site.baseurl }})

* 通过这些特殊的字符序列，可以使用最近一次匹配结果中的内容。每个以"at"结尾的单词都被替换了，替换结果是"word"后跟一对圆括号，而圆括号中是被字符序列$1 所替换的单词。

```js
var text = "cat, bat, sat, fat";
result = text.replace(/(.at)/g, "word ($1)");
alert(result); //word (cat), word (bat), word (sat), word (fat) 
```

* 第二个参数也可以是一个函数。

在只有一个匹配项（即与模式匹配的字符串）的情况下，会向这个函数传递 3 个参数：模式的匹配项、模式匹配项在字符串中的位置和原始字符串。在
正则表达式中定义了多个捕获组的情况下，传递给函数的参数依次是模式的匹配项、第一个捕获组的匹配项、第二个捕获组的匹配项……，但最后两个参数仍然分别是模式的匹配项在字符串中的位置和原始
字符串。这个函数应该返回一个字符串，表示应该被替换的匹配项使用函数作为 replace()方法的第二个参数可以实现更加精细的替换操作

* 为插入 HTML 代码定义了函数 htmlEscape()，这个函数能够转义 4 个字符：小于号、大于号、和号以及双引号。实现这种转义的最简单方式，就是使用正则表达式查找这几个字符，然后定义一个能够针对每个匹配的字符返回特定 HTML 实体的函数。
  
```js
function htmlEscape(text){
 return text.replace(/[<>"&]/g, function(match, pos, originalText){
 switch(match){
 case "<":
 return "&lt;";
 case ">":
 return "&gt;";
 case "&":
 return "&amp;";
 case "\"":
 return "&quot;";
 }
 });
}
alert(htmlEscape("<p class=\"greeting\">Hello world!</p>"));
//&lt;p class=&quot;greeting&quot;&gt;Hello world!&lt;/p&gt; 

```

#### 2.7.3 split()

* split()方法基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放在一个数组中。
* 分隔符可以是字符串，也可以是一个 RegExp 对象（这个方法不会将字符串看成正则表达式）。
* split()方法可以接受可选的第二个参数，用于指定数组的大小，以便确保返回的数组不会超过既定大小。

```js
var colorText = "red,blue,green,yellow";
var colors1 = colorText.split(","); //["red", "blue", "green", "yellow"]
var colors2 = colorText.split(",", 2); //["red", "blue"]
var colors3 = colorText.split(/[^\,]+/); //["", ",", ",", ",", ""] 
```

>对 split()中正则表达式的支持因浏览器而异。尽管对于简单的模式没有什么差别，但对于未发现
 匹配项以及带有捕获组的模式，匹配的行为就不大相同了。以下是几种常见的差别。  
  IE8 及之前版本会忽略捕获组。ECMA-262 规定应该把捕获组拼接到结果数组中。IE9 能正确地
 在结果中包含捕获组。  
  Firefox 3.6 及之前版本在捕获组未找到匹配项时，会在结果数组中包含空字符串；ECMA-262 规
 定没有匹配项的捕获组在结果数组中应该用 undefined 表示。
 在正则表达式中使用捕获组时还有其他微妙的差别。在使用这种正则表达式时，一定要在各种浏览
 器下多做一些测试。

### 2.8 localeCompare()
* localeCompare()方法比较两个字符串，并返回下列值中的一个。
*  如果字符串在字母表中应该排在字符串参数之前，则返回一个负数（大多数情况下是-1，具体的值要视实现而定）；
*  如果字符串等于字符串参数，则返回 0；
*  如果字符串在字母表中应该排在字符串参数之后，则返回一个正数（大多数情况下是 1，具体的值同样要视实现而定）。

```js
var stringValue = "yellow";
alert(stringValue.localeCompare("brick")); //1
alert(stringValue.localeCompare("yellow")); //0
alert(stringValue.localeCompare("zoo")); //-1
```

>这个例子比较了字符串"yellow"和另外几个值："brick"、"yellow"和"zoo"。因为"brick"在
 字母表中排在"yellow"之前，所以 localeCompare()返回了 1；而"yellow"等于"yellow"，所以
 localeCompare()返回了 0；最后，"zoo"在字母表中排在"yellow"后面，所以 localeCompare()
 返回了-1。
 
* localeCompare()返回的数值取决于实现。

``` js
function determineOrder(value) {
 var result = stringValue.localeCompare(value);
 if (result < 0){
 alert("The string 'yellow' comes before the string '" + value + "'.");
 } else if (result > 0) {
 alert("The string 'yellow' comes after the string '" + value + "'.");
 } else { 
}
determineOrder("brick");
determineOrder("yellow");
determineOrder("zoo"); 

```

> localeCompare()方法比较与众不同的地方，就是实现所支持的地区（国家和语言）决定了这个
  方法的行为。比如，美国以英语作为 ECMAScript 实现的标准语言，因此 localeCompare()就是区分
  大小写的，于是大写字母在字母表中排在小写字母前头就成为了一项决定性的比较规则。不过，在其他
  地区恐怕就不是这种情况了。
  
### 2.9  fromCharCode()

这个方法的任务是接收一或多个字符编码，然后将它们转换成一个字符串。从本质上来看，这个方法与实例方法 charCodeAt()执行的是相反的操作。

```js
alert(String.fromCharCode(104, 101, 108, 108, 111)); //"hello"
```
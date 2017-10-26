---
layout: post
title: "javascript - 本地存储 -- cookie - 下篇"
data: 2017-10-25 17:27:00 +0800
categories: 原创
tag: javascript
---
* content
{:toc}

* 其他链接：
    + [javasript - 数据存储--Web存储机制]({{ '/2017/09/04/js-Storage-Web' | prepend: site.baseurl }})
    + [javascript - 本地存储 -- cookie - 上篇]({{ '/2017/10/25/js-Storage-Cookie1' | prepend: site.baseurl }})

> * 以下内容部分源于：
>   * 《JavaScript高级程序设计（第3版）》
  

<!-- more -->


## 一、操作 cookie

###  1.1 BOM的document. cookie属性

> * 这个属性的独特之处在于它会因为使用它的方式不同而表现出不同的行为。
>   * 当用来获取属性值时，`document.cookie` 返回当前页面可用的（根据 `cookie` 的域、路径、失效时间和安全设置）所有 `cookie`的字符串，一系列由分号隔开的名值对儿。

```js
name1=value1; name2=value2; name3=value3 
```


### 1.2 cookie值设置的介绍

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

### 1.3 完整的cookie读取、写入和删除

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
        path: '/',
        expires: new Date('2017-10-30').toGMTString()
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

## 二、cookie的限制

> 1. **`cookie` 在性质上是绑定在特定的域名下的**。
>    * 当设定了一个 `cookie` 后，再给创建它的域名发送请求时，都会包含这个 `cookie`。
>    * 这个限制确保了储存在 `cookie` 中的信息只能让批准的接受者访问，而无法被其他域访问。
> 2. **每个域的 `cookie` 总数是有限的，不过浏览器之间各有不同**。
>    *  `IE6` 以及更低版本限制每个域名最多 `20` 个 `cookie`。
>    *  `IE7` 和之后版本每个域名最多 `50` 个。`IE7` 最初是支持每个域名最大 `20` 个 `cookie`，之后被微软的一个补丁所更新。
>   *  `Firefox` 限制每个域最多 `50` 个 `cookie`。
>    *  `Opera` 限制每个域最多 `30` 个 `cookie`。
>    *  `Safari` 和 Chrome 对于每个域的 `cookie` 数量限制没有硬性规定。
> 3. **浏览器中对于 `cookie` 的尺寸也有限制**。
>    * 大多数浏览器都有大约 `4096B`（加减 1）的长度限制。
>    * 为了最佳的浏览器兼容性，最好将整个 `cookie` 长度限制在 `4095B`（含 `4095`）以内。
>    * 尺寸限制影响到一个域下所有的 `cookie`，而并非每个 `cookie` 单独限制。
    
> * 当超过单个域名限制之后还要再设置 `cookie`，浏览器就会清除以前设置的 `cookie`。  
> * `IE` 和 `Opera` 会删除最近最少使用过的（`LRU，Least Recently Used`）`cookie`，腾出空间给新设置的 `cookie`。  
> * `Firefox` 看上去好像是随机决定要清除哪个 `cookie`，所以考虑 `cookie` 限制非常重要，以免出现不可预期的后果。  
> * 如果你尝试创建超过最大尺寸限制的 `cookie`，那么该 `cookie` 会被悄无声息地丢掉。注意，虽然一个字符通常占用一字节，但是多字节情况则有不同。

      
## 三、子cookie    

### 3.1  什么是子cookie

> * 子 `cookie`（`subcookie`）：为了绕开浏览器的单域名下的 `cookie` 数限制。
> * **子 `cookie` 是存放在单个 `cookie` 中的更小段的数据**。即：使用 `cookie` 值来存储多个名称值对儿。

### 3.2 子cookie的格式

> * **子 `cookie` 一般也以查询字符串的格式进行格式化**。
>    * 然后这些值可以使用单个 `cookie` 进行存储和访问，而非对每个名称`-`值对儿使用不同的 `cookie` 存储。
>    * 最后网站或者 `Web` 应用程序可以无需达到单域名`cookie` 上限也可以存储更加结构化的数据。

> * 子 `cookie` 最常见的的格式如下所示。

![relationship-map]({{ '/styles/images/javascript/cookie/cookie-09.png' | prepend: site.baseurl }})

### 3.3 操作子cookie
  
> * 子 `cookie` 的解析和序列化会因子 `cookie` 的期望用途而略有不同并更加复杂些。
>    * 例如，要获得一个子 `cookie`，首先要遵循与获得 `cookie` 一样的基本步骤，但是在解码 `cookie` 值之前，需要按如下方法找出子 `cookie` 的信息。

```js
const SubCookieUtil = {
  /**
   * 设置一个子cookie
   * @param {String} name ookie的名字
   * @param {String} subName 子cookie的名字
   * @param {String} value 子cookie的值
   * @param {Object} opts 配置（path、domain、secure、expires）
   */
  set: function (name, subName, value, opts) {
    let subcookies = this.getAll(name) || {};

    subcookies[subName] = value;

    this.setAll(name, subcookies, opts || {});
  },
  /**
   * 设置整个子cookie
   * @param {String} name cookie的名子
   * @param {Object} subCookies 子cookie对象
   * @param {Object} opts 配置（path、domain、secure、expires）
   */
  setAll: function(name, subCookies, opts){
    let cookieText = `${encodeURIComponent(name)}=`,
      subcookieParts = [];

    for (let [key,value] of Object.entries(subCookies)){
      subcookieParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }

    cookieText += subcookieParts.join("&");

    if (opts && Object.prototype.toString.call(opts) === '[object Object]') {
      for (let [key,value] of Object.entries(opts)){
        cookieText += (key !== 'secure'? `; ${key}=${value}`: `; ${key}`)
      }
    }

    document.cookie = cookieText;
  },
  /**
   * 获取单个子cookie
   * @param {String} name cookie的名字
   * @param {String} subName 子cookie的名字
   * @returns {Object|Null}
   */
  get: function (name, subName) {
    const subCookies = this.getAll(name);

    if (subCookies) {
      return subCookies[subName];
    }

    return null;
  },
  /**
   * 获取所有子cookie
   * @param {String} name cookie的名字
   * @returns {Object|Null}
   */
  getAll: function (name) {
    const chosenCookie = document.cookie.match(new RegExp('(?:^' + encodeURIComponent(name) +'=|\\s+'+ encodeURIComponent(name) +'=)(.+?(?=;|$))'));
    let arr = [];
    let info = {};

    if(chosenCookie) {
      arr = chosenCookie[1].split('&');

      for (let i in arr) {
        let parts = arr[i].split('=');
        info[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
      }

      return info;
    }

    return null;
  },
  /**
   * 移除一个子cookie
   * @param {String} name cookie的名字
   * @param {String} subName 子cookie的名字
   * @param {Object} opts 配置（path、domain、secure、expires）
   */
  remove: function (name, subName, opts) {
    const subCookies = this.getAll(name);

    if (subCookies) {
      delete subCookies[subName];
      this.setAll(name, subCookies, opts);
    }
  },
  /**
   * 移除整个cookie
   * @param {String} name cookie的名字
   * @param {Object} opts cookie配置
   */
  removeAll: function (name, opts) {
    this.setAll(name, this.getAll(name), opts);
  }
};
```

> * 点击打开[demo](/effects/demo/demo-cookie/eg4.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>子cookie</title>
</head>
<body>
<button type="button" id="set">设置一个子cookie</button>
<button type="button" id="setAll">设置整个子cookie</button>
<button type="button" id="get">获取一个子cookie</button>
<button type="button" id="getAll">获取整个子cookie</button>
<button type="button" id="remove">移除一个子cookie</button>
<button type="button" id="removeAll">移除整个子cookie</button>
<script>
 
  // 设置一个子cookie
  document.getElementById('set').onclick = function () {
    console.log('设置一个子cookie：data');
    SubCookieUtil.set("data", "name", "jm");
    console.log('-----------------------------');
  };

  // 设置整个子cookie
  document.getElementById('setAll').onclick = function () {
    console.log('设置整个子cookie：data1、data2');
    SubCookieUtil.setAll("data1", { name: "cc", book: "tt" },{
      path: '/',
      expires: new Date('2017-12-20').toGMTString()
    });
    SubCookieUtil.setAll("data2", { name: "aa", book: "bb" });
    console.log('-----------------------------');
  };

  // 获取一个子cookie
  document.getElementById('get').onclick = function () {
    console.log('获取一个子cookie的值：data');
    console.log('data==>name：' + SubCookieUtil.get("data", "name"));
    console.log('data==>book：' + SubCookieUtil.get("data", "book"));
    console.log('-----------------------------');
  };

  // 获取整个子cookie
  document.getElementById('getAll').onclick = function () {
    console.log('获取整个子cookie：data、name、data2');
    console.log('data：' + SubCookieUtil.getAll('data'));
    console.log('name：'+ SubCookieUtil.getAll('name'));
    console.log('data2：' + SubCookieUtil.getAll('data2'));
    console.log('-----------------------------');
  };

  // 删除一个子cookie
  document.getElementById('remove').onclick = function () {
    console.log('删除一个子cookie：data2的name值，data2之前的值为：name=aa&book=bb');
    SubCookieUtil.remove('data2', 'name');
    console.log('-----------------------------');
  };

  // 删除整个子cookie
  document.getElementById('removeAll').onclick = function () {
    console.log('删除整个子cookie：data1');
    SubCookieUtil.removeAll('data1', {
      expires: new Date(0).toGMTString(),
      path: '/'
    });
  };
</script>
</body>
</html>
```

> * 过程展示

![relationship-map]({{ '/effects/images/javascript/cookie/cookie-04.gif' | prepend: site.baseurl }})

## 四、 关于 cookie 的思考 

> * “`HTTP 专有 cookie`”：`HTTP` 专有 `cookie` 可以从浏览器或者服务器设置，但是只能从服务器端读取，因为 `JavaScript` 无法获取 `HTTP` 专有 `cookie` 的值。

> * 由于所有的 `cookie` 都会由浏览器作为请求头发送，所以在 `cookie` 中存储大量信息会影响到特定域的请求性能。
>    * `cookie` 信息越大，完成对服务器请求的时间也就越长。
>    * 尽管浏览器对 `cookie` 进行了大小限制，不过最好还是尽可能在 `cookie` 中少存储信息，以避免影响性能。

> * `cookie` 的性质和它的局限使得其并不能作为存储大量信息的理想手段，所以又出现了其他方法。

> * 一定不要在 `cookie` 中存储重要和敏感的数据。
>    * `cookie` 数据并非存储在一个安全环境中，其中包含的任何数据都可以被他人访问。
>    * 所以不要在 `cookie` 中存储诸如信用卡号或者个人地址之类的数据。
    

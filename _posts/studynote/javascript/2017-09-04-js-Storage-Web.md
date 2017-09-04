---
layout: post
title: "javasript - 数据存储--Web存储机制"
data: 2017-09-04 17:27:00 +0800
categories: 学习笔记
tag: javascript
---
* content
{:toc}

其他链接：

+ [javasript - 数据存储--cookie]({{ '/2017/08/29/js-Storage-Cookie' | prepend: site.baseurl }})

> 以下内容全部源于： 《JavaScript高级程序设计（第3版）》


* `Web Storage` 最早是在 `Web` 超文本应用技术工作组（`WHAT-WG`）的 `Web` 应用 1.0 规范中描述的。
* 这个规范的最初的工作最终成为了 `HTML5` 的一部分。
* `Web Storage` 的目的是克服由 `cookie` 带来的一些限制，当数据需要被严格控制在客户端上时，无须持续地将数据发回服务器。
* `Web Storage` 的两个主要目标是：
    * 提供一种在 `cookie` 之外存储会话数据的途径；
    * 提供一种存储大量可以跨会话存在的数据的机制。
* 最初的 `Web Storage` 规范包含了两种对象的定义：`sessionStorage` 和 `globalStorage`。
* 这两个对象在支持的浏览器中都是以 `windows` 对象属性的形式存在的，支持这两个属性的浏览器包括 `IE8+`、`Firefox 3.5+`、`Chrome 4+`和 `Opera 10.5+`。

<!-- more -->

## 一、Storage 类型

`Storage` 类型提供最大的存储空间（因浏览器而异）来存储名值对儿。

### 1.1 Storage 的实例方法

* `clear()`： 删除所有值；`Firefox` 中没有实现 。
* `getItem(name)`：根据指定的名字 `name` 获取对应的值。
* `key(index)`：获得 `index` 位置处的值的名字。
* `removeItem(name)`：删除由 `name` 指定的名值对儿。
* `setItem(name, value)`：为指定的 `name` 设置一个对应的值。

* `getItem()`、`removeItem()`和 `setItem()`方法可以直接调用，也可通过 `Storage` 对象间接调用。
    * 因为每个项目都是作为属性存储在该对象上的，所以可以通过点语法或者方括号语法访问属性来读取值，设置也一样，或者通过 `delete` 操作符进行删除。
    * 不过，我们还建议读者使用方法而不是属性来访问数据，以免某个键会意外重写该对象上已经存在的成员。
* 还可以使用 `length` 属性来判断有多少名值对儿存放在 `Storage` 对象中。
* 但无法判断对象中所有数据的大小，不过 `IE8` 提供了一个 `remainingSpace` 属性，用于获取还可以使用的存储空间的字节数。

> Storage 类型只能存储字符串。非字符串的数据在存储之前会被转换成字符串。

## 二、 sessionStorage 对象 

* `sessionStorage` 对象存储特定于某个会话的数据，也就是该数据只保持到浏览器关闭。
    * 这个对象就像会话 `cookie`，也会在浏览器关闭后消失。
    * 存储在 `sessionStorage` 中的数据可以跨越页面刷新而存在，同时如果浏览器支持，浏览器崩溃并重启之后依然可用（`Firefox` 和 `WebKit` 都支持，`IE` 则不行）。

* 因为 `seesionStorage` 对象绑定于某个服务器会话，所以当文件在本地运行的时候是不可用的。
* 存储在 `sessionStorage` 中的数据只能由最初给对象存储数据的页面访问到，所以对多页面应用有限制。
* 由于 `sessionStorage` 对象其实是 `Storage` 的一个实例，所以可以使用 `setItem()`或者直接设置新的属性来存储数据。

```js
//使用方法存储数据
sessionStorage.setItem("name", "Nicholas");
//使用属性存储数据
sessionStorage.book = "Professional JavaScript"; 
```

* 不同浏览器写入数据方面略有不同。
    * Firefox 和 WebKit 实现了同步写入，所以添加到存储空间中的数据是立刻被提交的。
    * IE 的实现则是异步写入数据，所以在设置数据和将数据实际写入磁盘之间可能有一些延迟。
* 对于少量数据而言，这个差异是可以忽略的。
* 对于大量数据，你会发现 IE 要比其他浏览器更快地恢复执行，因为它会跳过实际的磁盘写入过程。


* 在 IE8 中可以强制把数据写入磁盘：在设置新数据之前使用 begin()方法，并且在所有设置完成之后调用 commit()方法。看以下例子。
```js
//只适用于 IE8
sessionStorage.begin();
sessionStorage.name = "Nicholas";
sessionStorage.book = "Professional JavaScript";
sessionStorage.commit(); 
```

>这段代码确保了 `name` 和 `book` 的值在调用 `commit()`之后立刻被写入磁盘。  
调用 `begin()`是为了确保在这段代码执行的时候不会发生其他磁盘写入操作。  
对于少量数据而言，这个过程不是必需的；不过，对于大量数据（如文档之类的）可能就要考虑这种事务形式的方法了。

* `sessionStorage` 中有数据时，可以使用 `getItem()`或者通过直接访问属性名来获取数据。两种方法的例子如下。

```js
//使用方法读取数据
var name = sessionStorage.getItem("name");
//使用属性读取数据
var book = sessionStorage.book; 
```

* 还可以通过结合 `length` 属性和 `key()`方法来迭代 `sessionStorage` 中的值，如下所示。

```js
for (var i=0, len = sessionStorage.length; i < len; i++){
     var key = sessionStorage.key(i);
     var value = sessionStorage.getItem(key);
     alert(key + "=" + value);
} 
```

> 它是这样遍历 `sessionStorage` 中的名值对儿的：首先通过 `key()`方法获取指定位置上的名字，然后再通过`getItem()`找出对应该名字的值。

* 还可以使用 `for-in` 循环来迭代 `sessionStorage` 中的值：

```js
for (var key in sessionStorage){
 var value = sessionStorage.getItem(key);
 alert(key + "=" + value);
} 
```

> 每次经过循环的时候，`key` 被设置为 `sessionStorage` 中下一个名字，此时不会返回任何内置方法或 `length` 属性。

* 要从 `sessionStorage` 中删除数据，可以使用 `delete` 操作符删除对象属性，也可调用`removeItem()方法`。以下是这些方法的例子。
  
```js
//使用 delete 删除一个值——在 WebKit 中无效
delete sessionStorage.name;
//使用方法删除一个值
sessionStorage.removeItem("book"); 
```

> * 在撰写本书时，`delete` 操作符在 `WebKit` 中无法删除数据，`removeItem()`则可以在各种支持的浏览器中正确运行。
> * `sessionStorage` 对象应该主要用于仅针对会话的小段数据的存储。如果需要跨越会话存储数据，那么 `globalStorage` 或者 `localStorage` 更为合适。

## 三、globalStorage 对象

* `Firefox 2` 中实现了 `globalStorage` 对象。
* 作为最初的 `Web Storage` 规范的一部分，这个对象的目的是**跨越会话存储数据**，但有特定的访问限制。
* 要使用 `globalStorage`，首先要**指定哪些域可以访问该数据**。
* 可以通过**方括号标记**使用属性来实现，如以下例子所示。

```js
//保存数据
globalStorage["wrox.com"].name = "Nicholas";
//获取数据
var name = globalStorage["wrox.com"].name; 
```

* 在这里，访问的是针对域名 `wrox.com` 的存储空间。

* `globalStorage` 对象不是 `Storage` 的实例，而具体的 `globalStorage["wrox.com"]`才是。
* 这个存储空间对于 `wrox.com` 及其所有子域都是可以访问的。
* 可以像下面这样指定子域名。

```js
//保存数据
globalStorage["www.wrox.com"].name = "Nicholas";
//获取数据
var name = globalStorage["www.wrox.com"].name; 
```

> 这里所指定的存储空间只能由来自 `www.wrox.com` 的页面访问，其他子域名都不行。

* 某些浏览器允许更加宽泛的访问限制，比如只根据顶级域名进行限制或者允许全局访问，如下面例子所示。

```js
//存储数据，任何人都可以访问——不要这样做！
globalStorage[""].name = "Nicholas";
//存储数据，可以让任何以.net 结尾的域名访问——不要这样做！
globalStorage["net"].name = "Nicholas"; 
```

* 虽然这些也支持，但是还是要避免使用这种可宽泛访问的数据存储，以防止出现潜在的安全问题。
* 考虑到安全问题，这些功能在未来可能会被删除或者是被更严格地限制，所以不应依赖于这类功能。
* 当使用 `globalStorage` 的时候一定要指定一个域名。

* 对 `globalStorage` 空间的访问，是依据发起请求的页面的域名、协议和端口来限制的。
    * 例如，如果使用 `HTTPS` 协议在 `wrox.com` 中存储了数据，那么通过 `HTTP` 访问的 `wrox.com` 的页面就不能访问该数据。
    * 同样，通过 `80` 端口访问的页面则无法与同一个域同样协议但通过 `8080` 端口访问的页面共享数据。
    * 这类似于 `Ajax` 请求的同源策略。
* `globalStorage` 的每个属性都是 `Storage` 的实例。

* 因此，可以像如下代码中这样使用。

```js
globalStorage["www.wrox.com"].name = "Nicholas";
globalStorage["www.wrox.com"].book = "Professional JavaScript";
globalStorage["www.wrox.com"].removeItem("name");
var book = globalStorage["www.wrox.com"].getItem("book"); 
```

* 如果你事先不能确定域名，那么使用 `location.host` 作为属性名比较安全。例如：

```js
globalStorage[location.host].name = "Nicholas";
var book = globalStorage[location.host].getItem("book"); 
```

> 如果不使用 `removeItem()` 或 者 `delete` 删除，或者用户未清除浏览器缓存，存储在`globalStorage` 属性中的数据会一直保留在磁盘上。

> 这让 `globalStorage` 非常适合在客户端存储文档或者长期保存用户偏好设置。

## 四、 localStorage 对象 

* `localStorage` 对象在修订过的 `HTML 5` 规范中作为持久保存客户端数据的方案取代了`globalStorage`。
* 与 `globalStorage` 不同，不能给 `localStorage` 指定任何访问规则；规则事先就设定好了。
    * 要访问同一个 `localStorage` 对象，页面必须来自同一个域名（子域名无效），使用同一种协议，在同一个端口上。
    * 这相当于 `globalStorage[location.host]`。
* 由于 `localStorage` 是 `Storage` 的实例，所以可以像使用 `sessionStorage` 一样来使用它。

下面是一些例子。

```js
//使用方法存储数据
localStorage.setItem("name", "Nicholas");
//使用属性存储数据
localStorage.book = "Professional JavaScript";
//使用方法读取数据
var name = localStorage.getItem("name");
//使用属性读取数据
var book = localStorage.book; 
```

* 存储在 `localStorage` 中的数据和存储在 `globalStorage` 中的数据一样，都遵循相同的规则：
    * 数据保留到通过 `JavaScript` 删除或者是用户清除浏览器缓存。
    * 为了兼容只支持 `globalStorage` 的浏览器，可以使用以下函数。

```js
function getLocalStorage(){
 if (typeof localStorage == "object"){
 return localStorage;
 } else if (typeof globalStorage == "object"){
 return globalStorage[location.host];
 } else {
 throw new Error("Local storage not available.");
 }
} 

var storage = getLocalStorage(); 
```

> 在确定了使用哪个 `Storage` 对象之后，就能在所有支持 `Web Storage` 的浏览器中使用相同的存取规则操作数据了。

## 五、 storage 事件 

* 对 `Storage` 对象进行任何修改，都会在文档上触发 `storage` 事件。
    * 当通过属性或 `setItem()`方法保存数据
    * 使用 `delete` 操作符或 `removeItem()`删除数据
    * 调用 `clear()`方法
* 这个事件的 `event` 对象有以下属性。
    * `domain`：发生变化的存储空间的域名。
    * `key`：设置或者删除的键名。
    * `newValue`：如果是设置值，则是新值；如果是删除键，则是 null。
    * `oldValue`：键被更改之前的值。

* 在这四个属性中，`IE8` 和 `Firefox` 只实现了 `domain` 属性。在撰写本书的时候，`WebKit` 尚不支持`storage` 事件。

以下代码展示了如何侦听 `storage` 事件：

```js
EventUtil.addHandler(document, "storage", function(event){
 alert("Storage changed for " + event.domain);
}); 
```

> 无论对 `sessionStorage`、`globalStorage` 还是 `localStorage` 进行操作，都会触发 `storage`事件，但不作区分。

## 六、限制

* 与其他客户端数据存储方案类似，`Web Storage` 同样也有限制。这些限制因浏览器而异。
    * 一般来说，对存储空间大小的限制都是以每个来源（协议、域和端口）为单位的。
        * 换句话说，每个来源都有固定大小的空间用于保存自己的数据。
    * 考虑到这个限制，就要注意分析和控制每个来源中有多少页面需要保存数据。
    
* 对于 `localStorage` 而言，大多数桌面浏览器会设置每个来源 `5MB` 的限制。
    * `Chrome` 和 `Safari` 对每个来源的限制是 `2.5MB`。
    * 而 `iOS` 版 `Safari` 和 `Android` 版 `WebKit` 的限制也是 `2.5MB`。
* 对 `sessionStorage` 的限制也是因浏览器而异。
    * 有的浏览器对 `sessionStorage` 的大小没有限制，
    * 但 `Chrome`、`Safari`、`iOS` 版 `Safari` 和 `Android` 版 `WebKit` 都有限制，也都是 `2.5MB`。
    * `IE8+`和 `Opera` 对`sessionStorage` 的限制是 `5MB`。
